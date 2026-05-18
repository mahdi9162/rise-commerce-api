import dotenv from 'dotenv';

dotenv.config({
  path: process.cwd() + '/.env',
});

const env = {
  port: process.env.PORT ?? 5000,
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,

  email_sender: process.env.EMAIL_SENDER,
  email_pass: process.env.EMAIL_PASS,
  server_url: process.env.SERVER_URL,
};

export default env;