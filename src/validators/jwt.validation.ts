import { userExists } from '@controllers/user.controller';
import * as moment from 'moment';

export const jwtValidation = async (decoded) => {
  const isExpired = moment.unix(decoded.exp).isBefore(moment());

  if (isExpired) {
    return { isValid: false };
  }

  return { isValid: !!(await userExists(decoded.id)) };
};
