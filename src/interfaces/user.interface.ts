import { Document } from "mongoose";
import { Request } from "@hapi/hapi";

export interface UserInterface extends Document {
  username: string
  password: string
  email: string
  createdAt: string
  updatedAt: string
  comparePassword: (password: string) => Promise<boolean>
}

export interface CreateUserInterface extends Request {
  payload: {
    username: string
    password: string
    email: string
  }
}

export interface GetUserInterface extends Request {
  params: {
    id: string
  }
}

export interface UpdateUserInterface extends Request {
  params: {
    id: string
  },
  payload: {
    username: string
    password: string
    email: string
  }
}

export interface DeleteUserInterface extends Request {
  params: {
    id: string
  }
}
