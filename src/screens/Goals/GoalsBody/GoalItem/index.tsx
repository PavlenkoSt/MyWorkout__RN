import React, {Dispatch, FC, SetStateAction} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useDispatch} from 'react-redux';

import ExerciseCounter from '@app/components/ExerciseCounter';
import ContextMenu from '@app/components/UI-kit/ContextMenu';
import {decrementGoal, incrementGoal} from '@app/store/slices/goalsSlice';
import {IGoal} from '@app/types/IGoal';

interface IProps {
  goal: IGoal;
  setGoalToDelete: Dispatch<SetStateAction<IGoal | null>>;
  onEditPress: (goal: IGoal) => void;
  moveToRecord: (goal: IGoal) => void;
}

const GoalItem: FC<IProps> = ({
  goal,
  moveToRecord,
  setGoalToDelete,
  onEditPress,
}) => {
  const isCompleted = goal.countArchived >= goal.count;
  const canDecrease = goal.countArchived > 0;

  const dispatch = useDispatch();

  const increment = () => {
    if (isCompleted) return;
    dispatch(incrementGoal(goal.id));
  };

  const decrement = () => {
    if (!canDecrease) return;
    dispatch(decrementGoal(goal.id));
  };

  return (
    <View style={styles.container}>
      <ContextMenu
        actions={[
          {
            action: () => moveToRecord(goal),
            text: 'Move to records',
            disabled: !isCompleted,
          },
          {
            action: () => onEditPress(goal),
            text: 'Edit',
          },
          {
            action: () => setGoalToDelete(goal),
            text: 'Delete',
            danger: true,
          },
        ]}
        style={styles.menu}
        triggerStyle={styles.menuTrigger}>
        <Text style={styles.name}>{goal.name}</Text>
        <ExerciseCounter
          canDecrease={canDecrease}
          doneCount={goal.countArchived}
          doneGoalCount={goal.count}
          decrement={decrement}
          increment={increment}
          isCompleted={isCompleted}
        />
      </ContextMenu>
    </View>
  );
};

export default GoalItem;

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#222',
    borderRadius: 15,
    borderWidth: 1,
    flex: 1,
    borderColor: '#111',
    marginBottom: 10,
    overflow: 'hidden',
  },
  menu: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  menuTrigger: {
    paddingTop: 10,
    flexGrow: 1,
  },
  name: {
    textAlign: 'center',
    color: '$white',
    marginBottom: 10,
  },
});
