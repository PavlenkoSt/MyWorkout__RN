import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';

import NoTrainingYet from './NoTrainingYet';
import TrainingBody from './TrainingBody';

const DayTraining: FC = () => {
  const trainingDay = useSelector(trainingDateSelector);

  const [isCreation, setIsCreation] = useState(false);

  const onStartPlanning = () => {
    setIsCreation(true);
  };

  return (
    <View style={styles.container}>
      {!trainingDay && !isCreation ? (
        <NoTrainingYet onStartPlanning={onStartPlanning} />
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
