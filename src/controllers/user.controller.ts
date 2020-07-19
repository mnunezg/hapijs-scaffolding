import { ResponseToolkit } from "@hapi/hapi"
import { CreateUserInterface, UpdateUserInterface, UserInterface, DeleteUserInterface, GetUserInterface } from "interfaces/user.interface"
import User from '@models/user.model'
import * as Boom from '@hapi/boom'

export const getUsers = async (request, h: ResponseToolkit) => {
  try {
    return h.response(await User.find())
  } catch (err) {
    console.error(err)
    return Boom.badImplementation()
  }
}

export const getUser = async (request: GetUserInterface, h: ResponseToolkit) => {
  try {
    const user: UserInterface = await User.findById(request.params.id)

    if(!user) {
      return Boom.notFound()
    }

    return h.response(user)
  } catch (err) {
    console.error(err)
    return Boom.badImplementation()
  }
}

export const createUser = async (request: CreateUserInterface, h: ResponseToolkit) => {
  try {
    const emailExists: UserInterface = await User.findOne({ email: request.payload.email })
    if(emailExists) {
      return Boom.conflict()
    }

    const newUser = new User(request.payload)
    const userSaved = await newUser.save()
    
    return h.response(userSaved)
  } catch(err) {
    console.error(err)
    return Boom.badImplementation()
  }
}

export const updateUser = async (request: UpdateUserInterface, h: ResponseToolkit) => {
  try {
    const user: UserInterface = await User.findById(request.params.id)

    if(!user) {
      return Boom.notFound()
    }

    for (const key in request.payload) {
      user[key] = request.payload[key]
    }

    const userSaved= await user.save()

    return h.response(userSaved)
  } catch (err) {
    console.error(err)
    return Boom.badImplementation()
  }
}

export const deleteUser = async (request: DeleteUserInterface, h: ResponseToolkit) => {
  try {
    const userDeleted: UserInterface = await User.findByIdAndDelete(request.params.id)
    console.log(userDeleted)

    return h.response(userDeleted)
  } catch (err) {
    
  }
}
