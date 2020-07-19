import { Request } from '@hapi/hapi';

export interface SignInInterface extends Request {
  payload: {
    email: string;
    password: string;
  };
}
