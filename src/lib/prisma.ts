import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import ENV from '../config/env';

const adapter = new PrismaPg({
  connectionString: ENV.database_url,
});

export const prisma = new PrismaClient({
  adapter,
});
