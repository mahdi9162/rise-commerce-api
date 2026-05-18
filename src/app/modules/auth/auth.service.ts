import type { TRegister, TVerify } from './auth.validation';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { prisma } from '../../../lib/prisma';
import { sendEmail } from '../../../utils/sendEmail';

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

  const verifyLink = `http://localhost:5000/api/v1/auth/verify?token=${verificationToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Verify your Rise Commerce account',
    html: `
    <h2>Welcome to Rise Commerce</h2>
    <p>Please verify your account by clicking the link below:</p>
    <a href="${verifyLink}">Verify Account</a>
    `,
  });

  return user;
};

// verify token
const verify = async (payload: TVerify) => {
  const tokenData = await prisma.verificationToken.findFirst({
    where: {
      verificationToken: payload.token,
    },
  });

  if (!tokenData) {
    throw new Error('Invalid verification token');
  }

  const verifiedUser = await prisma.user.update({
    where: {
      id: tokenData.userId,
    },
    data: {
      isVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      isVerified: true,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: tokenData.id,
    },
  });

  return verifiedUser;
};

export const AuthService = {
  register,
  verify,
};
