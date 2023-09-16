import React, {FC, useMemo, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import ArrowUpIcon from '@app/components/Icons/ArrowUpIcon';
import Btn from '@app/components/UI-kit/Btn';
import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';
import {ExerciseTypeEnum} from '@app/types/IExercise';

import StatisticItem from './StatisticItem';

export interface IStatistic {
  exercise: string;
  totalNeed: number;
  totalDone: number;
  type: ExerciseTypeEnum;
}

interface IProps {
  onAddExercisePress: () => void;
  scrollListToEnd: () => void;
}

const ExercisesFooter: FC<IProps> = ({onAddExercisePress, scrollListToEnd}) => {
  const trainingDay = useSelector(trainingDateSelector);

  const [collapsed, setCollapsed] = useState(false);

  const statistic = useMemo(() => {
    const result: IStatistic[] = [];

    if (!trainingDay || !trainingDay.exercises.length) return result;

    trainingDay.exercises.forEach(exercise => {
      const candidate = result.findIndex(
        resItem =>
          resItem.exercise === exercise.exercise &&
          resItem.type === exercise.type,
      );

      const totalDone = exercise.reps * exercise.setsDone;
      const totalNeed = exercise.reps * exercise.sets;

      if (candidate !== -1) {
        result[candidate].totalDone += totalDone;
        result[candidate].totalNeed += totalNeed;
      } else {
        result.push({
          exercise: exercise.exercise,
          type: exercise.type,
          totalDone,
          totalNeed,
        });
      }
    });

    return result;
  }, [trainingDay]);

  return (
    <View>
      <View>
        {!!statistic.length && (
          <View style={styles.triggerContainer}>
            <TouchableOpacity
              style={styles.trigger}
              onPress={() => setCollapsed(prev => !prev)}>
              <Text style={styles.triggerText}>
                {collapsed ? 'Show' : 'Hide'} statistic
              </Text>
              <View style={collapsed ? {transform: [{rotate: '180deg'}]} : {}}>
                <ArrowUpIcon stroke={EStyleSheet.value('$white')} />
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.btnContainer}>
          <Btn onPress={onAddExercisePress}>+ Add exercise</Btn>
        </View>
      </View>
      <Collapsible
        collapsed={collapsed}
        onAnimationEnd={scrollListToEnd}
        style={styles.collapsible}>
        <View style={styles.collapsibleInner}>
          {statistic.map(statItem => (
            <StatisticItem key={statItem.exercise} statItem={statItem} />
          ))}
        </View>
      </Collapsible>
    </View>
  );
};

export default ExercisesFooter;

const styles = EStyleSheet.create({
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  triggerContainer: {
    position: 'absolute',
    top: 0,
    left: 5,
    bottom: 0,
    zIndex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  collapsible: {
    paddingBottom: 10,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
  },
  collapsibleInner: {
    flex: 1,
  },
  trigger: {
    flexDirection: 'row',
    gap: 5,
    paddingVertical: 20,
  },
  triggerText: {
    color: '$white',
  },
});
