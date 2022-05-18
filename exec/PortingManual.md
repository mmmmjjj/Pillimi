# 🛠 Porting Manual

### 🖥 시스템 환경

- AWS EC2 : 배포 서버 `Ubuntu 20.04 LTS (GNU/Linux 5.4.0-1018-aws x86_64)`
- AWS S3 : 파일 서버
- Jenkins : CICD 툴 `2.233.2`

- Docker `20.10.16`
- Nginx `1.18.0`

### ⚙️ 개발 환경 및 IDE

- Java : `openjdk v1.8.0_192`
- MySQL : `v8.0.27`
- Node.js : `v14.15.1`
- Visual Studio Code
- IntelliJ IDEA : `2021.3`
- Android Studio `2021.1.1`
- Gitlab, Mattermost, Notion, Figma

### 빌드 및 배포

- Docker 설치

- Docker에 Jenkins, Mysql 컨테이너 빌드

- SSL 인증서 발급 및 적용

  - snapd 최신 버전으로 설치

    ```bash
    sudo snap install core; sudo snap refresh core
    ```

  - cerbot 설치

    ```bash
    sudo snap install --classic certbot
    ```

  - cerbot command 실행 확인

    ```bash
    sudo ln -s /snap/bin/certbot /usr/bin/certbot
    ```

  - nginx 자동 설정

    ```bash
    sudo certbot --nginx
    ```

- Jenkins 자동 빌드 설정

  ```bash
  cd backend
  ./gradlew clean build -x test
  cd ../frontend
  rm -rf build
  npm install
  npm run build
  ```

- Jenkins SSH 접속 빌드 후 조치 설정으로 백엔드, 프론트엔드 자동 배포

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
  - Nginx는 Reverse Proxy Server의 역할로 client와 server의 요청에 매핑되는 내부 서버로 요청을 넘겨줍니다. / 경로로 넘어온 요청은 nginx 서버로 보내고, /api 로 넘어온 요청은 spring boot에 내장된 tomcat 서버로 보냅니다. http의 80번 포트로 접근한 요청은 https의 443포트로 redirect 응답을 보내줍니다.

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

## 외부 서비스

보안상의 이유로 외부서비스 Property는 별도의 파일로 분리해 Gitlab의 소스 코드와 별개로 관리하였습니다. (application-aws.properties, firebase_key.json)

### S3

- 아마존 웹 서비스에서 제공하는 온라인 스토리지 웹 서비스로 서비스 내의 이미지들을 저장하고 관리하는 용도로 사용하였습니다.

### Firebase

- 사용자 디바이스로 알림을 전송하기 위해 Firebase Cloud Messaging 서비스를 사용하였습니다.

### 카카오 로그인

- 자체 서비스 기능에 집중하기 위해 카카오와 네이버 플랫폼의 로그인 서비스를 활용하여 간편한 회원가입 및 로그인 기능을 구현하였습니다.
