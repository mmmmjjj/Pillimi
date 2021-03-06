# ๐  Porting Manual

### ๐ฅ ์์คํ ํ๊ฒฝ

- AWS EC2 : ๋ฐฐํฌ ์๋ฒ `Ubuntu 20.04 LTS (GNU/Linux 5.4.0-1018-aws x86_64)`
- AWS S3 : ํ์ผ ์๋ฒ
- Jenkins : CICD ํด `2.233.2`

- Docker `20.10.16`
- Nginx `1.18.0`

### โ๏ธ ๊ฐ๋ฐ ํ๊ฒฝ ๋ฐ IDE

- Java : `openjdk v1.8.0_192`
- MySQL : `v8.0.27`
- Node.js : `v14.15.1`
- Visual Studio Code
- IntelliJ IDEA : `2021.3`
- Android Studio `2021.1.1`
- Gitlab, Mattermost, Notion, Figma

### ๋น๋ ๋ฐ ๋ฐฐํฌ

- Docker ์ค์น

- Docker์ Jenkins, Mysql ์ปจํ์ด๋ ๋น๋

- SSL ์ธ์ฆ์ ๋ฐ๊ธ ๋ฐ ์ ์ฉ

  - snapd ์ต์  ๋ฒ์ ์ผ๋ก ์ค์น

    ```bash
    sudo snap install core; sudo snap refresh core
    ```

  - cerbot ์ค์น

    ```bash
    sudo snap install --classic certbot
    ```

  - cerbot command ์คํ ํ์ธ

    ```bash
    sudo ln -s /snap/bin/certbot /usr/bin/certbot
    ```

  - nginx ์๋ ์ค์ 

    ```bash
    sudo certbot --nginx
    ```

- Jenkins ์๋ ๋น๋ ์ค์ 

  ```bash
  cd backend
  ./gradlew clean build -x test
  cd ../frontend
  rm -rf build
  npm install
  npm run build
  ```

- Jenkins SSH ์ ์ ๋น๋ ํ ์กฐ์น ์ค์ ์ผ๋ก ๋ฐฑ์๋, ํ๋ก ํธ์๋ ์๋ ๋ฐฐํฌ

  ```bash
  docker stop spring-compose
  docker rm spring-compose
  cd /home/ubuntu/jenkins/workspace/pillimi/backend
  docker build -t pillimi/backend .
  docker run -d -e TZ=Asia/Seoul -p 8081:8081 --name spring-compose pillimi/backend
  docker stop nginx
  docker rm nginx
  docker run --name nginx -d -p 3000:80 -e TZ=Asia/Seoul -v /home/ubuntu/jenkins/workspace/pillimi/frontend/build:/usr/share/nginx/html nginx
  docker rmi $(sudo docker images -f "dangling=true" -q)
  ```

- Nginx
  - Nginx๋ Reverse Proxy Server์ ์ญํ ๋ก client์ server์ ์์ฒญ์ ๋งคํ๋๋ ๋ด๋ถ ์๋ฒ๋ก ์์ฒญ์ ๋๊ฒจ์ค๋๋ค. / ๊ฒฝ๋ก๋ก ๋์ด์จ ์์ฒญ์ nginx ์๋ฒ๋ก ๋ณด๋ด๊ณ , /api ๋ก ๋์ด์จ ์์ฒญ์ spring boot์ ๋ด์ฅ๋ tomcat ์๋ฒ๋ก ๋ณด๋๋๋ค. http์ 80๋ฒ ํฌํธ๋ก ์ ๊ทผํ ์์ฒญ์ https์ 443ํฌํธ๋ก redirect ์๋ต์ ๋ณด๋ด์ค๋๋ค.

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                proxy_pass http://localhost:3000;
                try_files $uri $uri/ /index.html;
        }

        location ~* \.(?:css|js|html|ico|jpg|jpeg|png|gif|svg|eot|otf|ttf|woff|woff2)$ {
                proxy_pass http://localhost:3000;
        }

}

server {

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;
        server_name k6a307.p.ssafy.io; # managed by Certbot


        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                proxy_pass http://localhost:3000;
                try_files $uri $uri/ /index.html;
        }

        location ~* \.(?:css|js|html|ico|jpg|jpeg|png|gif|svg|eot|otf|ttf|woff|woff2)$ {
                proxy_pass http://localhost:3000;
        }

        location /api {
                proxy_pass http://localhost:8081/api;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header Host $host;
                proxy_set_header X-Forworded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forworded-Proto https;

                proxy_set_header SSL_PROTOCOL $ssl_protocol;
        }

        location /detect{
                proxy_pass http://localhost:8000/detect;
        }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/k6a307.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/k6a307.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}

server {
    if ($host = k6a307.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80 ;
        listen [::]:80 ;
    server_name k6a307.p.ssafy.io;
    return 404; # managed by Certbot


}

server {

        root /var/www/html;

        location / {
                proxy_pass http://localhost:3000;
                try_files $uri $uri/ /index.html;
        }

        location ~* \.(?:css|js|html|ico|jpg|jpeg|png|gif|svg|eot|otf|ttf|woff|woff2)$ {
                proxy_pass http://localhost:3000;
        }



    listen [::]:443 ssl; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/k6a307.p.ssafy.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/k6a307.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot


}
server {
    if ($host = pillimi.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    if ($host = www.pillimi.com) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80 ;
        listen [::]:80 ;
    server_name pillimi.com www.pillimi.com;
    return 404; # managed by Certbot

}
```

## ์ธ๋ถ ์๋น์ค

๋ณด์์์ ์ด์ ๋ก ์ธ๋ถ์๋น์ค Property๋ ๋ณ๋์ ํ์ผ๋ก ๋ถ๋ฆฌํด Gitlab์ ์์ค ์ฝ๋์ ๋ณ๊ฐ๋ก ๊ด๋ฆฌํ์์ต๋๋ค. (application-aws.properties, firebase_key.json)

### S3

- ์๋ง์กด ์น ์๋น์ค์์ ์ ๊ณตํ๋ ์จ๋ผ์ธ ์คํ ๋ฆฌ์ง ์น ์๋น์ค๋ก ์๋น์ค ๋ด์ ์ด๋ฏธ์ง๋ค์ ์ ์ฅํ๊ณ  ๊ด๋ฆฌํ๋ ์ฉ๋๋ก ์ฌ์ฉํ์์ต๋๋ค.

### Firebase

- ์ฌ์ฉ์ ๋๋ฐ์ด์ค๋ก ์๋ฆผ์ ์ ์กํ๊ธฐ ์ํด Firebase Cloud Messaging ์๋น์ค๋ฅผ ์ฌ์ฉํ์์ต๋๋ค.

### ์นด์นด์ค ๋ก๊ทธ์ธ

- ์์ฒด ์๋น์ค ๊ธฐ๋ฅ์ ์ง์คํ๊ธฐ ์ํด ์นด์นด์ค์ ๋ค์ด๋ฒ ํ๋ซํผ์ ๋ก๊ทธ์ธ ์๋น์ค๋ฅผ ํ์ฉํ์ฌ ๊ฐํธํ ํ์๊ฐ์ ๋ฐ ๋ก๊ทธ์ธ ๊ธฐ๋ฅ์ ๊ตฌํํ์์ต๋๋ค.
