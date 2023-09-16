import * as yup from 'yup';

export const recordValidation = yup.object().shape({
  name: yup.string().required('Required'),
  count: yup
    .number()
    .required('Required a number')
    .typeError('Required a number')
    .positive('Must be positive'),
});
