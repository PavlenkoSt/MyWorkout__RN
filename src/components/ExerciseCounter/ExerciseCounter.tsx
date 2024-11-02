import {ColorVars} from '@app/utilts/theme';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import * as Progress from 'react-native-progress';

interface IProps {
  canDecrease: boolean;
  isCompleted: boolean;
  increment: () => void;
  decrement: () => void;
  doneCount: number;
  doneGoalCount: number;
}

export default function ExerciseCounter({
  canDecrease,
  isCompleted,
  decrement,
  increment,
  doneCount,
  doneGoalCount,
}: IProps) {
  const progressCalc = Math.ceil((doneCount * 100) / doneGoalCount) / 100;
  const progress = progressCalc > 1 ? 1 : progressCalc < 0 ? 0 : progressCalc;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onLongPress={e => e.stopPropagation()}
        onPress={decrement}
        style={[
          styles.btn,
          {borderBottomLeftRadius: 15, opacity: canDecrease ? 1 : 0.3},
        ]}>
        <Text style={styles.btnText}>-</Text>
      </TouchableOpacity>
      <View style={styles.score}>
        <Text style={styles.scoreText}>
          {doneCount} / {doneGoalCount}
        </Text>
        <Progress.Bar
          progress={progress}
          width={70}
          color="green"
          borderWidth={1}
          borderColor="#111"
          height={5}
          unfilledColor="#5e5e5e"
          useNativeDriver={true}
        />
        {isCompleted && (
          <View style={styles.completed}>
            <LottieView
              source={require('@app/assets/animations/Check.json')}
              autoPlay
              loop={false}
              style={{width: 25, height: 25}}
            />
          </View>
        )}
      </View>
      <TouchableOpacity
        onLongPress={e => e.stopPropagation()}
        onPress={increment}
        style={[
          styles.btn,
          {borderBottomRightRadius: 15, opacity: !isCompleted ? 1 : 0.3},
        ]}>
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#112b40',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  btn: {
    backgroundColor: '$primaryColor',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  btnText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
  },
  completed: {
    position: 'absolute',
    bottom: -15,
    right: -5,
    zIndex: 1,
    borderRadius: 50,
  },
  score: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontWeight: '700',
    color: ColorVars.$white,
  },
});
