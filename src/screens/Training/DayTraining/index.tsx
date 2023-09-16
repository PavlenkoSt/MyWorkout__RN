import React, {FC, useState} from 'react';
import {View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import Loader from '@app/components/Loader';
import useMounted from '@app/hooks/useMounted';
import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';

import NoTrainingYet from './NoTrainingYet';
import TrainingBody from './TrainingBody';

const DayTraining: FC = () => {
  const trainingDay = useSelector(trainingDateSelector);

  const [isCreation, setIsCreation] = useState(false);

  const {mounted} = useMounted();

  return (
    <View style={styles.container}>
      {!mounted ? (
        <Loader />
      ) : !trainingDay && !isCreation ? (
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
