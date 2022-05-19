# 서비스 - 필리미 (pill + 알리미)


## 🗨️ 프로젝트 소개

<strong>어르신들을 위한 복약 알리미 : 필리미!</strong> <br>
어르신들은 복용하는 약이 늘어나면서 부작용이나 과다 복용에 노출될 가능성이 커집니다. 까먹고 안드시는 경우도 있고, 건강이 염려되어 같은 병으로 여러 병원에서 약을 타오시는 경우도 있습니다. <br>
필리미는 약 복용 습관을 조절하는 것만으로도 건강을 챙길 수 있다는 생각에서 시작했습니다. 어르신들에게 알람으로 복용 시간을 알려주고, 약을 먹기 전에는 사진을 찍도록 합니다. 이 사진은 텐서플로우를 통해 인식됩니다. 
보호자는 전송된 사진을 한 번 더 확인합니다. 약 관리 또한 보호자가 할 수 있도록 하였습니다. <br>이를 통해 어르신의 건강한 복약 습관 형성에 도움을 줄 수 있습니다.


![슬라이드1](/uploads/72beaee38981b9bd88e9c7ef6e057cc3/슬라이드1.PNG)

![슬라이드2](/uploads/a63b786b3d8a2160dc6b137de0114d54/슬라이드2.PNG)

![슬라이드3](/uploads/b5a4e83e1365d052864b903a35bf6372/슬라이드3.PNG)

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

## Infra

- AWS EC2 Ubuntu 20.04
- Jenkins - [ jenkins/jenkins:lts ] - `v2.332.1`
- Nginx - `nginx/1.18.0 (Ubuntu)`
- Certbot - `certbot 1.25.0`
- Docker - `v20.10.13`
- FireBase
- S3

<br>

## 🔨 파일구조

[프로젝트 구조](https://broadleaf-crabapple-56b.notion.site/dfae4f46a3ee40eba813d49425fa9f8e)

<br>

## ✨ 산출물

### 화면 설계

- 공통 화면

- 보호자 화면

- 피보호자 화면

### ERD



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
