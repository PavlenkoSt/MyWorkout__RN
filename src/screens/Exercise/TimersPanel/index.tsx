import React, {FC} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Timer from './Timer';

interface IProps {
  canRest: boolean;
  executeCurrentSet: () => void;
  holdTime: number;
  isRestTimerRunning: boolean;
  pauseExerciseTimer: () => void;
  pauseRestTimer: () => void;
  restTime: number;
  startExerciseTimer: () => void;
  startRestTimer: () => void;
  isTrainingDone: boolean;
  canStartHoldExerciseTimer: boolean;
}

const TimersPanel: FC<IProps> = ({
  canRest,
  restTime,
  isRestTimerRunning,
  startRestTimer,
  pauseRestTimer,
  startExerciseTimer,
  pauseExerciseTimer,
  isTrainingDone,
  canStartHoldExerciseTimer,
}) => {
  return (
    <View style={styles.container}>
      <Timer
        title="Exercise"
        disabled={isTrainingDone || !canStartHoldExerciseTimer}
        time={0}
        isRunning={false}
        start={startExerciseTimer}
        pause={pauseExerciseTimer}
      />
      <Timer
        title="Rest"
        disabled={isTrainingDone || !canRest}
        time={restTime}
        isRunning={isRestTimerRunning}
        start={startRestTimer}
        pause={pauseRestTimer}
      />
    </View>
  );
};

export default TimersPanel;

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
