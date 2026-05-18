import { transporter } from '../config/nodemailer';
import type { TSendEmail } from '../types';

export const sendEmail = async ({ to, subject, html }: TSendEmail) => {
  await transporter.sendMail({
    from: `"Rise Commerce" <hasanmahdi6060@gmail.com>`,
    to,
    subject,
    html,
  });
};
