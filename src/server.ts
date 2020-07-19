require('module-alias/register');
require('source-map-support').install();

import { Server } from '@hapi/hapi';
import * as Inert from '@hapi/inert';
import * as Vision from '@hapi/vision';
import * as HapiSwagger from 'hapi-swagger';
import * as mongoose from 'mongoose';
import { ENV } from '@env/des';
import { Routes } from '@routes/routes';
import { jwtValidation } from '@validators/jwt.validation';
import * as HapiJWT from 'hapi-auth-jwt2';

const init = async () => {
  const server: Server = new Server({
    port: ENV.PORT,
    host: ENV.HOST,
  });

  await server.register(HapiJWT);
  server.auth.strategy('jwt', 'jwt', {
    key: ENV.AUTH_KEY,
    validate: jwtValidation,
  });
  server.auth.default('jwt');

  const swaggerOptions: HapiSwagger.RegisterOptions = {
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
    security: [{ jwt: [] }],
    info: {
      title: 'Test API Documentation',
      version: ENV.VERSION,
    },
  };

  await server.register([
    { plugin: Inert },
    { plugin: Vision },
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  server.route(Routes);

  server.route({
    method: '*',
    path: '/{any*}',
    handler: function () {
      return '404 Error! Page Not Found!';
    },
  });

  await mongoose.connect(ENV.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await server.start();
  console.log(`Server running on port: http://${ENV.HOST}:${ENV.PORT}`);
};

// Handle server errors
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
