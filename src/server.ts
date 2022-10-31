import Fastify from 'fastify';
import { userSchemas } from './modules/user/user.schema';
import autoload from '@fastify/autoload';
import path from 'path';
import cors from '@fastify/cors';

async function buildServer() {
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          // translateTime: 'HH:MM:ss Z',
          // ignore: 'pid,hostname',
          colorize: true,
        },
      },
    },
  });

  await server.register(cors, {
    // put your options here
  });

  for (const schema of [...userSchemas]) {
    server.addSchema(schema);
  }

  await server.register(autoload, {
    dir: path.join(__dirname, 'plugins'),
  });

  await server.register(autoload, {
    dir: path.join(__dirname, 'modules'),
    // indexPattern: /.*route.ts/,
    options: { prefix: '/api' },
  });

  // await server.register(userRoutes, { prefix: 'api/users' });

  server.get('/ping', async (_request, _reply) => {
    return 'pong\n';
  });
  return server;
}

export default buildServer;
