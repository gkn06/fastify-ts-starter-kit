import { FastifyInstance } from 'fastify';
import { loginHandler, registerUserHandler, getUsersHandler } from './user.controller';
import { $ref } from './user.schema';

async function userRoutes(server: FastifyInstance) {
  server.post(
    '/',
    {
      schema: {
        body: $ref('createUserSchema'),
        description: 'Test',
        response: {
          201: { ...$ref('createUserResponseSchema'), description: 'Create New User' },
        },
        tags: ['User'],
      },
    },
    registerUserHandler,
  );

  server.post(
    '/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          200: { ...$ref('loginResponseSchema'), description: 'Login' },
        },
        tags: ['User'],
      },
    },
    loginHandler,
  );

  server.get('/', { schema: { tags: ['User'] } }, getUsersHandler);
}

export default userRoutes;
