import React, {FC, useMemo} from 'react';
import {Dimensions, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import Btn from '@app/components/UI-kit/Btn';
import Popover from '@app/components/UI-kit/Popover';
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
}

const ExercisesFooter: FC<IProps> = ({onAddExercisePress}) => {
  const trainingDay = useSelector(trainingDateSelector);

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
    <View style={styles.footerContainer}>
      <View style={styles.footer}>
        <View style={styles.popoverBtn}>
          {!!statistic.length && (
            <Popover
              Trigger={() => (
                <View style={styles.trigger}>
                  <Text style={styles.triggerText}>Show statistic</Text>
                </View>
              )}
              Content={() => (
                <View style={styles.popoverContainer}>
                  <View style={styles.statisticContainer}>
                    {statistic.map((statItem, i) => (
                      <StatisticItem
                        key={statItem.exercise}
                        statItem={statItem}
                        isLast={statistic.length - 1 === i}
                      />
                    ))}
                  </View>
                </View>
              )}
            />
          )}
        </View>
        <View style={styles.btnContainer}>
          <Btn onPress={onAddExercisePress}>+ Add exercise</Btn>
        </View>
      </View>
    </View>
  );
};

export default ExercisesFooter;

const {width} = Dimensions.get('window');

const styles = EStyleSheet.create({
  footerContainer: {
    paddingBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  btnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 5,
  },
  trigger: {
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  triggerText: {
    color: '$white',
  },
  popoverContainer: {
    padding: 10,
    width: width - 100,
  },
  statisticContainer: {
    flex: 1,
  },
  popoverBtn: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
