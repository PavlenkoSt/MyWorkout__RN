import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';

import NoTrainingYet from './NoTrainingYet';
import TrainingBody from './TrainingBody';

interface IProps {
  date: string;
}

const DayTraining: FC<IProps> = ({date}) => {
  const trainingDay = useSelector(trainingDateSelector);

  const [isCreation, setIsCreation] = useState(false);

  return (
    <View style={styles.container}>
      {!trainingDay && !isCreation ? (
        <NoTrainingYet onStartPlanning={() => setIsCreation(true)} />
      ) : (
        <TrainingBody isCreation={isCreation} />
      )}
    </View>
  );
};

export default DayTraining;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
});
