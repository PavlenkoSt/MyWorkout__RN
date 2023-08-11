import useGetTrainingDay from '@app/hooks/useGetTrainingDay';
import React, {FC} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  date: string;
}

const DayTraining: FC<IProps> = ({date}) => {
  const {trainingDay} = useGetTrainingDay({date});

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.scrollViewInner}>
          <Text style={styles.header}>
            Workout session - {new Date(date).toDateString()}
          </Text>
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
});
