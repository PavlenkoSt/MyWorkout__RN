import FocusAwareStatusBar from '@app/components/FocusAwareStatusBar';
import ScreenContainer from '@app/components/ScreenContainer';
import {exerciseSelector} from '@app/store/selectors/trainingDaySelectors';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';
import {useSelector} from 'react-redux';
import {ExerciseDetail} from './ExerciseDetail';

interface IProps {
  route: {
    params: {
      id: string;
      name: string;
    };
  };
}

export const Exercise: FC<IProps> = ({route}) => {
  const exerciseId = route.params.id;

  const exercise = useSelector(exerciseSelector(exerciseId));

  return (
    <ScreenContainer>
      <FocusAwareStatusBar
        backgroundColor={EStyleSheet.value('$primaryColor')}
        barStyle="light-content"
        height={0}
      />
      {!exercise ? (
        <Text style={styles.notFound}>Exercise not found</Text>
      ) : (
        <>
          <ExerciseDetail exercise={exercise} />
          <View style={styles.container}></View>
        </>
      )}
    </ScreenContainer>
  );
};

const styles = EStyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  notFound: {
    paddingHorizontal: 10,
    textAlign: 'center',
    paddingVertical: 30,
    fontSize: 16,
  },
});
