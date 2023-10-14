import React, {Dispatch, FC, SetStateAction, useMemo} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {IGoal} from '@app/types/IGoal';

import {FilterGoalsEnum} from '../constants';
import GoalItem from './GoalItem';

interface IProps {
  filter: FilterGoalsEnum;
  setGoalToDelete: Dispatch<SetStateAction<IGoal | null>>;
  onEditPress: (goal: IGoal) => void;
  onMoveToRecords: (goal: IGoal) => void;
  searchValue: string;
  divinedGoals: {
    completed: IGoal[];
    incompleted: IGoal[];
  };
}

const GoalsBody: FC<IProps> = ({
  filter,
  onMoveToRecords,
  onEditPress,
  setGoalToDelete,
  searchValue,
  divinedGoals,
}) => {
  const divinedGoalsWithQuery = useMemo(() => {
    const trimmedSearchVal = searchValue.trim();

    if (!trimmedSearchVal) return divinedGoals;

    return {
      completed: divinedGoals.completed.filter(goal =>
        goal.name.toLowerCase().includes(trimmedSearchVal.toLowerCase()),
      ),
      incompleted: divinedGoals.incompleted.filter(goal =>
        goal.name.toLowerCase().includes(trimmedSearchVal.toLowerCase()),
      ),
    };
  }, [divinedGoals, searchValue]);

  const goalItemProps = {
    moveToRecord: onMoveToRecords,
    setGoalToDelete: setGoalToDelete,
    onEditPress: onEditPress,
  };

  return (
    <>
      {filter === FilterGoalsEnum.ALL ? (
        <>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Incompleted ({divinedGoalsWithQuery.incompleted.length})
            </Text>
          </View>
          {!!divinedGoalsWithQuery.incompleted.length && (
            <View style={styles.goalsContainer}>
              {divinedGoalsWithQuery.incompleted.map(goal => (
                <GoalItem key={goal.id} goal={goal} {...goalItemProps} />
              ))}
            </View>
          )}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Completed ({divinedGoalsWithQuery.completed.length})
            </Text>
          </View>
          {!!divinedGoalsWithQuery.completed.length && (
            <View style={styles.goalsContainer}>
              {divinedGoalsWithQuery.completed.map(goal => (
                <GoalItem key={goal.id} goal={goal} {...goalItemProps} />
              ))}
            </View>
          )}
        </>
      ) : filter === FilterGoalsEnum.COMPLETED ? (
        <>
          {!divinedGoals.completed.length ? (
            <Text style={styles.notFoundText}>No completed goals yet</Text>
          ) : !divinedGoalsWithQuery.completed.length ? (
            <Text style={styles.notFoundText}>
              No completed goals were found for your request.
            </Text>
          ) : (
            <View style={styles.goalsContainer}>
              {divinedGoalsWithQuery.completed.map(goal => (
                <GoalItem key={goal.id} goal={goal} {...goalItemProps} />
              ))}
            </View>
          )}
        </>
      ) : (
        <>
          {!divinedGoals.incompleted.length ? (
            <Text style={styles.notFoundText}>No incompleted goals yet</Text>
          ) : divinedGoalsWithQuery.incompleted.length ? (
            <Text style={styles.notFoundText}>
              No incompleted goals were found for your request.
            </Text>
          ) : (
            <View style={styles.goalsContainer}>
              {divinedGoalsWithQuery.incompleted.map(goal => (
                <GoalItem key={goal.id} goal={goal} {...goalItemProps} />
              ))}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default GoalsBody;

const styles = EStyleSheet.create({
  sectionHeader: {
    backgroundColor: '#222',
    padding: 10,
  },
  sectionTitle: {
    color: '#fff',
  },
  goalsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  notFoundText: {
    color: '$white',
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
