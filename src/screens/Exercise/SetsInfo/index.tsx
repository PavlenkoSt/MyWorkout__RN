import LottieView from 'lottie-react-native';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  setsLeft: number;
}

const SetsInfo: FC<IProps> = ({setsLeft}) => {
  return (
    <View style={styles.setsStatusContainer}>
      {setsLeft > 0 ? (
        <Text style={styles.setsStatusText}>{setsLeft} sets left</Text>
      ) : (
        <>
          <Text style={styles.setsStatusText}>Done</Text>
          <LottieView
            source={require('@app/assets/animations/Check.json')}
            autoPlay
            loop={false}
            style={{width: 35, height: 35}}
          />
        </>
      )}
    </View>
  );
};

export default SetsInfo;

const styles = EStyleSheet.create({
  setsStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setsStatusText: {
    textAlign: 'center',
    paddingVertical: 20,
    color: '#fff',
    fontSize: 18,
  },
});
