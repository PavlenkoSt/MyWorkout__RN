import React, {FC, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';

import {trainingDateSelector} from '@app/store/selectors/trainingDaySelectors';
import Btn from '../UI-kit/Btn';
import TrainingBody from './TrainingBody';

interface IProps {
  date: string;
}

const DayTraining: FC<IProps> = ({date}) => {
  const trainingDay = useSelector(trainingDateSelector);

  const [isCreation, setIsCreation] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.scrollViewInner}>
          <Text style={styles.header}>
            Workout session - {new Date(date).toDateString()}
          </Text>

          <View>
            {!trainingDay && !isCreation ? (
              <View style={styles.notFoundContainer}>
                <Text>No training for this day planned yet.</Text>
                <Btn onPress={() => setIsCreation(true)}>+ Plan</Btn>
              </View>
            ) : (
              <TrainingBody isCreation={isCreation} />
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DayTraining;

const styles = EStyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewInner: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  header: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 20,
  },
  notFoundContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
