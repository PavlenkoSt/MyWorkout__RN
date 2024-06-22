import {ExerciseTypeEnum, IExercise} from '@app/types/IExercise';
import LottieView from 'lottie-react-native';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  exercise: IExercise;
}

export const ExerciseDetail: FC<IProps> = ({exercise}) => {
  const setsLeft = exercise.sets - exercise.setsDone;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.col}>
          <Text style={styles.colText}>Sets:</Text>
          <Text style={styles.colText}>
            {exercise.setsDone}/{exercise.sets}
          </Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.colText}>Rest:</Text>
          <Text style={styles.colText}>{exercise.rest} sec.</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.colText}>
            {exercise.type === ExerciseTypeEnum.DYNAMIC ? 'Reps: ' : 'Hold: '}
          </Text>
          <Text style={styles.colText}>
            {exercise.reps}
            {exercise.type === ExerciseTypeEnum.STATIC ? ' sec.' : ''}
          </Text>
        </View>
      </View>
      {setsLeft > 0 ? (
        <Text style={styles.setsStatusText}>{setsLeft} sets left</Text>
      ) : (
        <View style={styles.setsStatusContainer}>
          <Text style={styles.setsStatusText}>Done</Text>
          <LottieView
            source={require('@app/assets/animations/Check.json')}
            autoPlay
            loop={false}
            style={{width: 35, height: 35}}
          />
        </View>
      )}
    </>
  );
};

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 10,
    backgroundColor: '#000',
  },
  col: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colText: {},
  setsStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  setsStatusText: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#fff',
    fontSize: 18,
  },
});
