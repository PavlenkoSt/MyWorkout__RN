import React, {FC, memo} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import CompletedIcon from '@app/components/Icons/CompletedIcon';
import {ExerciseTypeEnum} from '@app/types/IExercise';
import {IStatistic} from '../index';
import {exerciseConstructorService} from '@app/services/exerciseConstructor.service';

interface IProps {
  statItem: IStatistic;
  isLast?: boolean;
}

const StatisticItem: FC<IProps> = ({statItem, isLast}) => {
  const isSimpleExercise = exerciseConstructorService.isSimpleExerciseType(
    statItem.type,
  );

  return (
    <View
      key={statItem.exercise}
      style={[styles.container, !isLast && styles.borderBottom]}>
      <View style={styles.exCell}>
        <Text style={styles.text}>{statItem.exercise}</Text>
      </View>
      <View style={styles.rateCell}>
        {!isSimpleExercise && (
          <View>
            <Text style={styles.text}>
              {statItem.totalDone}/{statItem.totalNeed}{' '}
              {statItem.type === ExerciseTypeEnum.STATIC ? 'sec' : 'reps'}
            </Text>
          </View>
        )}
        <View style={styles.checkmarkContainer}>
          {statItem.totalDone === statItem.totalNeed && (
            <CompletedIcon width={12} height={12} />
          )}
        </View>
      </View>
    </View>
  );
};

export default memo(StatisticItem);

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  exCell: {
    marginRight: 15,
    flex: 1,
    flexDirection: 'row',
  },
  rateCell: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  checkmarkContainer: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#444',
    flex: 1,
  },
});
