import { isValidObjectId, Mongoose } from 'mongoose';
export const idValidator = (value, helpers) => {
  if (!isValidObjectId(value)) {
    return helpers.error();
  }

  return value;
};
