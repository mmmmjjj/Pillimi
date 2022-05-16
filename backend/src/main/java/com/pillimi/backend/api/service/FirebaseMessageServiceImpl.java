package com.pillimi.backend.api.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.pillimi.backend.common.model.FcmMessage;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class FirebaseMessageServiceImpl implements FirebaseMessageService {

    private final String API_URL = "https://fcm.googleapis.com/v1/projects/pillimi/messages:send";
    private final ObjectMapper objectMapper;

    // 피보호자 Fcm 전송
    @Override
    public void sendMessageWithoutImage(String targetToken, String title, String body, String URL) throws IOException {
        String message = makeMessage(targetToken, title, body, URL);

        sendToFirebase(message);

    }

    // 보호자 Fcm 전송
    @Override
    public void sendMessageToProtector(String targetToken, String title, String body, String image, String URL) throws IOException {
        String message = makeImgMessage(targetToken, title, body, image, URL);

        sendToFirebase(message);

    }

    private void sendToFirebase(String message) throws IOException {
        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message,
                MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        Response response = client.newCall(request).execute();
    }

    // fcm 메시지 생성
    private String makeMessage(String targetToken, String title, String body,String URL) throws JsonProcessingException {
        FcmMessage fcmMessage = FcmMessage.builder()
                .message(FcmMessage.Message.builder()
                        .token(targetToken)
                        .notification(FcmMessage.Notification.builder()
                                .title(title)
                                .body(body)
                                .image(null)
                                .build())
                        .data(FcmMessage.Data.builder()
                                .url(URL)
                                .build())
                        .build()).validateOnly(false).build();

        return objectMapper.writeValueAsString(fcmMessage);
    }

    // 이미지, url 포함 fcm 메시지 생성
    private String makeImgMessage(String targetToken, String title, String body, String image, String URL) throws JsonProcessingException {
        FcmMessage fcmMessage = FcmMessage.builder()
                .message(FcmMessage.Message.builder()
                        .token(targetToken)
                        .notification(FcmMessage.Notification.builder()
                                .title(title)
                                .body(body)
                                .image(image)
                                .build())
                        .data(FcmMessage.Data.builder()
                                .url(URL)
                                .build())
                        .build()).validateOnly(false).build();

        return objectMapper.writeValueAsString(fcmMessage);
    }

    // 토큰 생성
    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "firebase_service_key.json";

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped("https://www.googleapis.com/auth/cloud-platform");

        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }
}