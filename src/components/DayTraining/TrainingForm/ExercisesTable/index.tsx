import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {Row, Rows, Table} from 'react-native-table-component';

import {IExerciseWithId} from '@app/types/IExercise';
import {EStyleSheet} from 'react-native-extended-stylesheet-typescript';

interface IProps {
  exercises: IExerciseWithId[];
}

const ExercisesTable: FC<IProps> = ({exercises}) => {
  return (
    <View>
      {!!exercises.length ? (
        <Table borderStyle={styles.borderStyle}>
          <Row
            textStyle={styles.headText}
            data={['Exercise', 'Reps/Hold', 'Sets', 'Rest']}
          />
          <Rows
            data={exercises.map(exercise => [
              exercise.exercise,
              exercise.reps,
              exercise.sets,
              exercise.rest,
            ])}
            textStyle={styles.bodyText}
            style={styles.bodyRow}
          />
        </Table>
      ) : (
        <Text style={styles.noExercisesText}>No exercises yet</Text>
      )}
    </View>
  );
};

export default ExercisesTable;

const styles = EStyleSheet.create({
  borderStyle: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  headText: {
    fontWeight: '600',
  },
  bodyText: {
    color: '#fff',
    padding: 2,
  },
  bodyRow: {},
  noExercisesText: {
    textAlign: 'center',
    marginBottom: 20,
  },
});
