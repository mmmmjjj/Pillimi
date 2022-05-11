/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef} from 'react';
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

  /** webview 로딩 완료시 */
  const handleEndLoading = e => {
    console.log('handleEndLoading');
    /** rn에서 웹뷰로 정보를 보내는 메소드 */
    webviewRef.postMessage(checkToken());
  };

  const isDarkMode = useColorScheme() === 'dark';

  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    }
    return fcmToken;
  };

  // background, quit 상태 일 경우
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background', remoteMessage);
  });

  // foreground일 경우
  React.useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('a new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  });

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
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  root: {flex: 1},
});
export default App;
