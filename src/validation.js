// import _ from 'lodash';
import { object, string } from 'yup';

export default async (value) => {
  const str = {
    value,
  };
  // const schema = string.url();
  const schema = object({
    value: string().url(),
  });
  return schema.isValidSync(str);
};
