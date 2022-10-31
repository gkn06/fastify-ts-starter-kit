import fp from 'fastify-plugin';
import fastifySwagger, { FastifySwaggerOptions } from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
import { version } from '../../package.json';

export default fp<FastifySwaggerOptions>(async (fastify) => {
  void fastify.register(
    fastifySwagger,
    withRefResolver({
      routePrefix: '/swagger',
      exposeRoute: true,
      staticCSP: true,
      openapi: {
        info: {
          title: 'Fastify API',
          description: 'API for some products',
          version,
        },
        tags: [
          { name: 'User', description: 'User related end-points' },
          { name: 'code', description: 'Code related end-points' },
        ],
      },
    }),
  );
});
