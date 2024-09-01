import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";
import { randomUUID } from "node:crypto";

const prisma = new PrismaClient();

function generateUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide the DATABASE_URL env variable')
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schemaId);
  return url.toString();
}

const schemaId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(schemaId)

  process.env.DATABASE_URL = databaseURL
  await prisma.$connect()
  execSync('npx prisma migrate deploy')
  execSync('npx prisma db push')
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect()
})
