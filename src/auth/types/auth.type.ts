import { User } from '@prisma/client';

export type SecuredUser = Omit<User, 'password'>;
