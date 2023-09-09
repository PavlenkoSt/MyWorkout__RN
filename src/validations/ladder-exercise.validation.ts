import * as yup from 'yup';

export const ladderExerciseValidation = yup.object().shape({
  exercise: yup.string().required('Required'),
  from: yup
    .number()
    .required('Required a number')
    .typeError('Required a number')
    .positive('Must be positive')
    .integer('Must be number'),
  to: yup
    .number()
    .required('Required a number')
    .typeError('Required a number')
    .positive('Must be positive')
    .integer('Must be number'),
  step: yup
    .number()
    .required('Required a number')
    .typeError('Required a number')
    .positive('Must be positive')
    .integer('Must be number'),
  rest: yup
    .number()
    .required('Required a number')
    .typeError('Required a number')
    .positive('Must be positive')
    .integer('Must be number'),
});
