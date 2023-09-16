import * as yup from 'yup';

import {onlySpacesRegex} from '@app/utilts/regexps';

export const recordValidation = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .test('No spaces', 'Required', value => {
      return !onlySpacesRegex.test(value);
    }),
  count: yup
    .number()
    .required('Required a number')
    .typeError('Required a number')
    .positive('Must be positive'),
});
