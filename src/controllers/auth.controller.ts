import { ResponseToolkit } from '@hapi/hapi';
import { badImplementation, forbidden, conflict } from '@hapi/boom';
import * as jwt from 'jsonwebtoken';
import User from '@models/user.model';
import { SignInInterface } from 'interfaces/auth.interface';
import { UserInterface, CreateUserInterface } from 'interfaces/user.interface';
import * as moment from 'moment';
import { ENV } from '@env/des';

export const signIn = async (request: SignInInterface, h: ResponseToolkit) => {
  try {
    const user: UserInterface = await User.findOne({
      email: request.payload.email,
    });

    if (!(await user?.comparePassword(request.payload.password))) {
      return forbidden();
    }

    const payload = {
      id: user._id,
      exp: moment().add(ENV.AUTH_DURATION, 'hours').unix(),
    };

    const token = jwt.sign(payload, ENV.AUTH_KEY);

    return h.response(token);
  } catch (err) {
    console.error(err);
    return badImplementation();
  }
};

export const signUp = async (
  request: CreateUserInterface,
  h: ResponseToolkit
) => {
  try {
    const emailExists: UserInterface = await User.findOne({
      email: request.payload.email,
    });

    if (emailExists) {
      return conflict();
    }

    const newUser = new User(request.payload);
    const userSaved = await newUser.save();

    return h.response(userSaved);
  } catch (err) {
    console.error(err);
    return badImplementation();
  }
};
