package com.pillimi.backend.api.service;

import java.io.IOException;

public interface FirebaseMessageService {

    /*
     targetToken에 해당하는 기기에 push 알림 전송
     */
    void sendMessageTo(String targetToken, String title, String body) throws IOException;
}
