/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Alert,
  BackHandler,
} from 'react-native';

import MyWebView from './component/MyWebView';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  let webviewRef = useRef();

  const handleSetRef = _ref => {
    webviewRef = _ref;
  };

  const [pushUrl, setPushUrl] = useState('https://k6a307.p.ssafy.io');

  /** webview 로딩 완료시 */
  const handleEndLoading = async () => {
    console.log('handleEndLoading');

    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }

    /** rn에서 웹뷰로 정보를 보내는 메소드 */
    webviewRef.postMessage(fcmToken);

    console.log('handleEndLoading: pushUrl' + pushUrl);
  };

  const isDarkMode = useColorScheme() === 'dark';

  // background, quit 상태 일 경우 FCM 핸들링
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background', remoteMessage);
  });

  // foreground일 경우 FCM 핸들링
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('a new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // background에서 push 알림을 클릭 했을 경우
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state',
        remoteMessage.notification,
      );

      setPushUrl(remoteMessage.data.url);
      console.log(pushUrl);
    });

    // 앱이 종료된 상태에서 push 알림을 클릭 했을 경우
    messaging()
      .getInitialNotification()
      .then(initialMessage => {
        console.log('Initial Message: ', initialMessage);

        setPushUrl(initialMessage.data.url);
        console.log(pushUrl);
      });

    return unsubscribe;
  }, [pushUrl]);

  return (
    <>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <SafeAreaView style={styles.root}>
        <MyWebView
          handleClose={() => {
            Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
              {text: '아니오', onPress: () => null},
              {text: '예', onPress: () => BackHandler.exitApp()},
            ]);
          }}
          webviewRef={webviewRef}
          handleSetRef={handleSetRef}
          handleEndLoading={handleEndLoading}
          pushUrl={pushUrl}
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  root: {flex: 1},
});
export default App;
