import React, {FC, memo} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import CompletedCircleIcon from '@app/components/Icons/CompletedCircleIcon';
import {ExerciseTypeEnum} from '@app/types/IExercise';
import {IStatistic} from '../index';

interface IProps {
  statItem: IStatistic;
}

const StatisticItem: FC<IProps> = ({statItem}) => {
  return (
    <View key={statItem.exercise} style={styles.container}>
      <View style={{flexGrow: 1}}>
        <Text style={styles.text}>{statItem.exercise}</Text>
      </View>
      <View style={{flexGrow: 1, alignItems: 'flex-end'}}>
        <Text style={styles.text}>
          {statItem.totalDone}/{statItem.totalNeed}{' '}
          {statItem.type === ExerciseTypeEnum.STATIC ? 'sec' : 'reps'}
        </Text>
      </View>
      <View style={{width: 20, height: 20, marginLeft: -10}}>
        {statItem.totalDone === statItem.totalNeed && (
          <CompletedCircleIcon width={20} height={20} />
        )}
      </View>
    </View>
  );
};

export default memo(StatisticItem);

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-between',
  },
  text: {
    color: '$white',
    flex: 1,
  },
});
