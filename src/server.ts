require('module-alias/register');
require('source-map-support').install();

import { Server } from "@hapi/hapi";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import * as HapiSwagger from "hapi-swagger";
import * as mongoose from 'mongoose';
import { ENV } from "@env/des";
import { Routes } from "@routes/routes";

const init = async () => {
  const server: Server = new Server({
    port: ENV.PORT,
    host: ENV.HOST
  })
  const swaggerOptions = {
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
        options: swaggerOptions
    }
  ])

  server.route(Routes)

  server.route({
    method: '*',
    path: '/{any*}',
    handler: function () {
        return '404 Error! Page Not Found!';
    }
});

  await mongoose.connect(
    ENV.DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true 
    }
  )

  await server.start()
  console.log(`Server running on port: http://${ENV.HOST}:${ENV.PORT}`)
}

// Handle server errors
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
