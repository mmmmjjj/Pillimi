package com.pillimi.backend.api.service;

import java.io.IOException;

public interface FirebaseMessageService {

    /*
     피보호자 targetToken에 해당하는 기기에 push 알림 전송
     */
    void sendMessageWithoutImage(String targetToken, String title, String body, String URL) throws IOException;

    /*
     보호자 targetToken에 해당하는 기기에 push 알림 전송
     */
    void sendMessageToProtector(String targetToken, String title, String body, String image, String URL) throws IOException;
}
