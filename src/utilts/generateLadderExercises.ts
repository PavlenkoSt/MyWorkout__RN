import {
  ExerciseTypeEnum,
  IExercise,
  ILadderExerciseForm,
} from '@app/types/IExercise';

const createExercise = (data: ILadderExerciseForm, i: number) => ({
  exercise: data.exercise.trim(),
  rest: data.rest,
  reps: i,
  sets: 1,
  type: ExerciseTypeEnum.DYNAMIC,
  setsDone: 0,
  id: Date.now().toString() + i,
});

const generateLadderExercises = (data: ILadderExerciseForm) => {
  const {from, to, step} = data;

  if (from === to) {
    return Promise.reject('"From" and "To" cannot be equal');
  }

  const exercisesToCreate: IExercise[] = [];

  const fromLessThanTo = from < to;

  if (fromLessThanTo) {
    for (let i = from; i <= to; i += step) {
      exercisesToCreate.push(createExercise(data, i));
    }
  } else {
    for (let i = from; i >= to; i -= step) {
      exercisesToCreate.push(createExercise(data, i));
    }
  }

  if (!exercisesToCreate.length || exercisesToCreate.length === 1) {
    return Promise.reject('No exercises is generated, check on your step');
  }

  return Promise.resolve(exercisesToCreate);
};

export default generateLadderExercises;
