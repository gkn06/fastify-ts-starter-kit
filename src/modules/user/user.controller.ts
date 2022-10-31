import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserInput, LoginInput } from './user.schema';
import { createUser, findUserByEmail, findUsers } from './user.service';

export async function registerUserHandler(
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (e) {
    console.log(e);
    await reply.code(500).send(e);
  }
}

export async function loginHandler(
  request: FastifyRequest<{
    Body: LoginInput;
  }>,
  reply: FastifyReply,
) {
  const body = request.body;

  // find a user by email
  const user = await findUserByEmail(body.email);
  return reply.code(201).send(user);
}

export async function getUsersHandler() {
  const users = await findUsers();
  return users;
}
