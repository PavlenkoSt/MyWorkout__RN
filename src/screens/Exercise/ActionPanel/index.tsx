import React, {FC} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import Btn from '@app/components/UI-kit/Btn';

interface IProps {
  finishCurrentSet: () => void;
  canFinishCurrentSet: boolean;
  canMoveToNextExercise: boolean;
  moveToNextExercise: () => void;
}

const ActionPanel: FC<IProps> = ({
  canFinishCurrentSet,
  finishCurrentSet,
  canMoveToNextExercise,
  moveToNextExercise,
}) => {
  return (
    <View style={styles.container}>
      {canFinishCurrentSet ? (
        <Btn onPress={finishCurrentSet}>Finish current set</Btn>
      ) : canMoveToNextExercise ? (
        <Btn onPress={moveToNextExercise}>Move to next exercise</Btn>
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
  },
});
