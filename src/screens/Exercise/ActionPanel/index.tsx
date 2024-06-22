import React, {FC} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Btn from '@app/components/UI-kit/Btn';

interface IProps {
  canFinishCurrentSet: boolean;
  canMoveToNextExercise: boolean;
  canSkipSet: boolean;
  finishCurrentSet: ({
    shouldStartRestTimer,
  }: {
    shouldStartRestTimer: boolean;
  }) => void;
  moveToNextExercise: () => void;
  skipRest: () => void;
}

const ActionPanel: FC<IProps> = ({
  canFinishCurrentSet,
  canMoveToNextExercise,
  canSkipSet,
  finishCurrentSet,
  moveToNextExercise,
  skipRest,
}) => {
  return (
    <View style={styles.container}>
      {canFinishCurrentSet ? (
        <Btn
          onPress={() => {
            finishCurrentSet({shouldStartRestTimer: true});
          }}>
          Finish current set
        </Btn>
      ) : canMoveToNextExercise ? (
        <Btn onPress={moveToNextExercise}>Move to next exercise</Btn>
      ) : canSkipSet ? (
        <Btn onPress={skipRest}>Skip rest</Btn>
      ) : null}
    </View>
  );
};

export default ActionPanel;

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 30,
    gap: 10,
    minHeight: 150,
    justifyContent: 'center',
  },
});
