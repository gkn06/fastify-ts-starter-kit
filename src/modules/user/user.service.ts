import { CreateUserInput } from './user.schema';

export async function createUser(input: CreateUserInput) {
  const { password, ...rest } = input;

  const user = { password, rest };

  return user;
}

export async function findUserByEmail(email: string) {
  return { id: 1, user: 'john' };
}

export async function findUsers() {
  return [
    { id: 1, user: 'john' },
    { id: 2, user: 'jane' },
  ];
}
