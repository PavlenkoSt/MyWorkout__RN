import React, {FC} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

import {IStatistic} from '../index';
import StatisticItem from './StatisticItem';

interface IProps {
  statistic: IStatistic[];
}

const Statistic: FC<IProps> = ({statistic}) => {
  return (
    <View style={styles.container}>
      {statistic.map(statItem => (
        <StatisticItem key={statItem.exercise} statItem={statItem} />
      ))}
    </View>
  );
};

export default Statistic;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});
