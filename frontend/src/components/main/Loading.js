import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DotSpinner } from '@uiball/loaders'
import loading from "./css/Loading.module.css"

export default function Loading() {
  return (
    <div>
        <View style={styles.container}>
            <Text style={styles.title}>로그인 중입니다...</Text>
        </View>
        <div className={loading.body}>
        <DotSpinner 
          size={40}
          speed={0.9} 
          color="#0369a1" 
          />
        </div>
    </div>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색

    flex: 1,

    justifyContent: "center",

    alignItems: "center",
    backgroundColor: "#0369a1",
    // backgroundColor: "#fdc453",
  },

  title: {
    fontSize: 20,

    fontWeight: "700",
  },
});
