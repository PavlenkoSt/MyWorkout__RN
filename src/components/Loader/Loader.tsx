import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

export default function Loader() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('@app/assets/animations/Loading.json')}
        autoPlay
        loop
        style={{width: 200, height: 200}}
      />
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
