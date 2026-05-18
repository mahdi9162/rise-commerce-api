import type { TRegister } from './auth.validation';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '../../../lib/prisma';

const register = async (payload: TRegister) => {
  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const verificationToken = crypto.randomBytes(32).toString('hex');

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
    },
  });

  await prisma.verificationToken.create({
    data: {
      verificationToken,
      userId: user.id,
    },
  });

  return user;
};

export const AuthService = {
  register,
};
