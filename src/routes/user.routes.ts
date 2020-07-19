import { ServerRoute } from '@hapi/hapi';
import {
  getUsers,
  updateUser,
  deleteUser,
  getUser,
} from '@controllers/user.controller';
import * as Joi from '@hapi/joi';
import { idValidator } from '@validators/id.validator';

export const UserRoutes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/users',
    handler: getUsers,
    options: {
      tags: ['api', 'Users'],
    },
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: getUser,
    options: {
      tags: ['api', 'Users'],
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: updateUser,
    options: {
      tags: ['api', 'Users'],
      validate: {
        params: Joi.object({
          id: Joi.string().required(),
        }),
        payload: Joi.object({
          username: Joi.string().required(),
          email: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUser,
    options: {
      tags: ['api', 'Users'],
      validate: {
        params: Joi.object({
          id: Joi.custom(idValidator),
        }),
      },
    },
  },
];
