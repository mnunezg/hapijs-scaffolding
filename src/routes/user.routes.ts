import { ServerRoute } from "@hapi/hapi";
import { createUser, getUsers, updateUser, deleteUser, getUser } from "@controllers/user.controller";
import * as Joi from '@hapi/joi';

export const UserRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/users',
    handler: getUsers,
    options: {
      tags: ['api']
    }
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: getUser,
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'POST',
    path: '/users',
    handler: createUser,
    options: {
      tags: ['api'],
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: updateUser,
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        }),
        payload: Joi.object({
          username: Joi.string().required(),
          email: Joi.string().required()
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUser,
    options: {
      tags: ['api'],
      validate: {
        params: Joi.object({
          id: Joi.string().required()
        })
      }
    }
  }
]
