# 서비스 - 필리미 (pill + 알리미)

<img src="/uploads/175bee78d23df5d28deaa152d86617da/A307-최종-발표-첫장.png" width="800">

## 🗨️ 프로젝트 소개

<strong>어르신들을 위한 복약 알리미 : 필리미!</strong> <br><br>
어르신들은 복용하는 약이 늘어나면서 부작용이나 과다 복용에 노출될 가능성이 커집니다. <br>까먹고 안드시는 경우도 있고, 건강이 염려되어 같은 병으로 여러 병원에서 약을 타오시는 경우도 있습니다. <br><br>
<strong>필리미는 약 복용 습관을 조절하는 것만으로도 건강을 챙길 수 있다는 생각에서 시작했습니다.</strong>
<br><br>
어르신들에게 알람으로 복용 시간을 알려주고, 약을 먹기 전에는 사진을 찍도록 합니다. 이 사진은 텐서플로우를 통해 인식됩니다. 
보호자는 전송된 사진을 한 번 더 확인합니다. 약 관리 또한 보호자가 할 수 있도록 하였습니다. <br>이를 통해 어르신의 건강한 복약 습관 형성에 도움을 줄 수 있습니다. <br>

관련 영상 : [노인 약물 과다 주의보](https://www.youtube.com/watch?v=SHPlA04yYiU)

<img src="/uploads/43baea5d7d98b5e2933e51083b98bbfe/기획의도.png" width="800"/>
<img src="/uploads/4272e1edd60f32cbb8f198c5f87f8ac6/복약순응도.png" width="800"/>




<br>

## 🗓️ 진행 기간

2022.04.11~2022.05.20(총 6주)

<br>

## 🖊️ 팀원 소개

Backend : 김경현, 김중우, 이명주

Frontend : 고주희, 노태현, 최혜린

AI : 김경현

Server : 김중우

<br>

## 🔨 기술스택

### Front-End

- Node.js - `v14.15.1`
- npm - `v8.1.2`
- HTML 5, CSS3, JavaScript (ES6)
- React `17.0.2`

## Back-End

- Java - `openjdk v1.8.0_192`
- Spring Boot - `v2.5.7`
- Django
- JPA, QueryDSL
- MySQL - `v8.0.27`
- Swagger - `v3`

## App

- React-Native

## Infra

- AWS EC2 Ubuntu 20.04
- Jenkins - [ jenkins/jenkins:lts ] - `v2.332.1`
- Nginx - `nginx/1.18.0 (Ubuntu)`
- Certbot - `certbot 1.25.0`
- Docker - `v20.10.13`
- FireBase
- S3
- tensorflow

<br>

## 🔨 파일구조

[프로젝트 구조](https://www.notion.so/98aae7c9ed624a2ba80aafd57174ef38)

<br>

## ✨ 산출물

### 화면 설계


<img src="/uploads/dfb3b86f3a09b77c6a6d9be266a84c42/Group_21__2_.png" width="400"/>

<img src="/uploads/fdb6a1a609ae761d7150654828169fbf/Group_22.png" width="400"/>

<img src="/uploads/0ea287d3874a6ca3b1e69c5704e630d9/Group_23.png" width="400"/>
<br>

### ERD
<img src="/uploads/d8e047c66963074b5fb0f0502b4027bc/자율_A307__2_.png" width="800">

### API

[API 설계서](https://www.notion.so/API-ca82784fcb0f49bb8bacf9b4ba38f75d)

<br>


## 🏗️ 빌드 방법

원격의 git 저장소를 로컬에 복제

```shell
git clone
```

npm을 이용하여 필요한 패키지 설치

```shell
npm install
```

웹팩 개발 서버 구동
```shell
npm run serve
```


## 백엔드 자료 

* #### 사물인식 - 텐서플로우 자료

https://meisteruser.net/devflow/2615 -파이썬 사용

https://www.tensorflow.org/install/lang_java?hl=ko - 텐서플로우 자바 설치 방법

http://www.nextobe.com/2020/05/14/java-응용프로그램에서-tensorflow-사용하기 - 설치 방법

http://fxapps.blogspot.com/2017/04/using-tensorflow-from-java-application.html?m=1

https://github.com/tensorflow/tensorflow/blob/e2177df4fc3000fcab237bebaf6900693904ad26/tensorflow/docs_src/install/install_java.md

https://www.wenyanet.com/opensource/ko/607d76df71804057ca4c7dcf.html -스프링부트&텐서플로우 페이지

https://github.com/tzolov/spring-boot-tensorflow-demo -스프링부트&텐서플로우 깃헙 코드

https://docs.opencv.org/2.4/doc/tutorials/introduction/desktop_java/java_dev_intro.html - openCV

https://wikidocs.net/130105 - 텐서플로우 자바
