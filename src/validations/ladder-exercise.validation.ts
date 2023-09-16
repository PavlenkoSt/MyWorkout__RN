import * as yup from 'yup';

import {onlySpacesRegex} from '@app/utilts/regexps';

export const ladderExerciseValidation = yup.object().shape({
  exercise: yup
    .string()
    .required('Required')
    .test('No spaces', 'Required', value => {
      return !onlySpacesRegex.test(value);
    }),
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
