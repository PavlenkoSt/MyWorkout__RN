import React, {FC} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import CompletedCircleIcon from '@app/components/Icons/CompletedCircleIcon';

interface IProps {
  canDecrease: boolean;
  isCompleted: boolean;
  increment: () => void;
  decrement: () => void;
  doneCount: number;
  doneGoalCount: number;
}

const ExCounter: FC<IProps> = ({
  canDecrease,
  isCompleted,
  decrement,
  increment,
  doneCount,
  doneGoalCount,
}) => {
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
        {isCompleted && (
          <View style={styles.completed}>
            <CompletedCircleIcon width={20} height={20} />
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
};

export default ExCounter;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#112b40',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: '$primaryColor',
    paddingVertical: 5,
    paddingHorizontal: 20,
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
  },
  score: {
    paddingHorizontal: 15,
  },
  scoreText: {
    fontWeight: '700',
    color: '$white',
  },
});
