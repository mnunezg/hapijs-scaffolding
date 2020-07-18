require('module-alias/register');
import { Server } from "@hapi/hapi";
// import { ENV } from './environment/des';
import { ENV } from "@env/des";

const init = async () => {
  const server: Server = new Server({
    port: ENV.PORT,
    host: ENV.HOST
  })

  await server.start()
  console.log(`Server running on port: http://${ENV.HOST}:${ENV.PORT}`)
}

// Handle server errors
process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
