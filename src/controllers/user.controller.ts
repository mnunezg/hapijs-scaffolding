import { ResponseToolkit } from '@hapi/hapi';
import {
  CreateUserInterface,
  UpdateUserInterface,
  UserInterface,
  DeleteUserInterface,
  GetUserInterface,
} from 'interfaces/user.interface';
import User from '@models/user.model';
import { badImplementation, notFound, conflict } from '@hapi/boom';

export const getUsers = async (request, h: ResponseToolkit) => {
  try {
    return h.response(await User.find().lean());
  } catch (err) {
    console.error(err);
    return badImplementation();
  }
};

export const getUser = async (
  request: GetUserInterface,
  h: ResponseToolkit
) => {
  try {
    const user: UserInterface = await User.findById(request.params.id).lean();

    if (!user) {
      return notFound();
    }

    return h.response(user);
  } catch (err) {
    console.error(err);
    return badImplementation();
  }
};

export const updateUser = async (
  request: UpdateUserInterface,
  h: ResponseToolkit
) => {
  try {
    const user: UserInterface = await User.findById(request.params.id);

    if (!user) {
      return notFound();
    }

    for (const key in request.payload) {
      user[key] = request.payload[key];
    }

    const userSaved = await user.save();

    return h.response(userSaved);
  } catch (err) {
    console.error(err);
    return badImplementation();
  }
};

export const deleteUser = async (
  request: DeleteUserInterface,
  h: ResponseToolkit
) => {
  try {
    const userDeleted: UserInterface = await User.findByIdAndDelete(
      request.params.id
    ).lean();

    if (!userDeleted) {
      return notFound();
    }

    return h.response(userDeleted);
  } catch (err) {}
};

export const userExists = async (id: string) => {
  return await User.findById(id);
};
