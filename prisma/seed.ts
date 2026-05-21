import 'dotenv/config';
import { env } from 'prisma/config';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { PrismaClient } from '@generated/prisma/client';

const adapter = new PrismaBetterSqlite3({ url: env('DATABASE_URL') });
const prisma = new PrismaClient({ adapter });

async function run(): Promise<void> {
  try {
    const dummyQuery = await prisma.$queryRaw`SELECT 1`;
    console.log(dummyQuery);
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

void run();
