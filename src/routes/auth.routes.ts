import { signIn, signUp } from '@controllers/auth.controller';
import { ServerRoute } from '@hapi/hapi';
import Joi = require('@hapi/joi');

export const AuthRoutes: ServerRoute[] = [
  {
    method: 'POST',
    path: '/auth/signin',
    handler: signIn,
    options: {
      auth: false,
      tags: ['api', 'auth'],
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/auth/signup',
    handler: signUp,
    options: {
      tags: ['api', 'Users'],
      validate: {
        payload: Joi.object({
          username: Joi.string().required(),
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  },
];
