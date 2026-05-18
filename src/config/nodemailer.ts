import nodemailer from 'nodemailer';
import env from './env';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.email_sender,
    pass: env.email_pass,
  },
});
