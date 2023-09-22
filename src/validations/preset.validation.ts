import * as yup from 'yup';

import {onlySpacesRegex} from '@app/utilts/regexps';

export const presetValidation = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .test('No spaces', 'Required', value => {
      return !onlySpacesRegex.test(value);
    }),
});
