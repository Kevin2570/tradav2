import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET() {
  const users = await prisma.user.findMany({
    include: { offers: true, wants: true },
    orderBy: { createdAt: 'desc' },
  });

  const data = users.map((u: any) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    borough: u.borough ?? 'NYC',
    matchStyle: u.matchStyle,
    offers: (u.offers as any[]).map((o: any) => o.text),
    wants: (u.wants as any[]).map((w: any) => w.text),
  }));

  return NextResponse.json(data);
}
