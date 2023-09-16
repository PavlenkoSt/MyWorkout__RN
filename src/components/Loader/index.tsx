import LottieView from 'lottie-react-native';
import React from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

const Loader = () => {
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
};

export default Loader;

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
