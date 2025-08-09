// lib/prisma.ts — Postgres (Neon) version
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prevent instantiating multiple clients in dev
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // If you later use PgBouncer on Neon, you can add:
    // datasources: { db: { url: process.env.DATABASE_URL } }
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
