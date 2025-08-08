import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

type UserWithLists = {
  id: string;
  name: string;
  email: string;
  borough: string | null;
  matchStyle: string;
  offers: { text: string }[];
  wants: { text: string }[];
};

export async function GET() {
  const users = await prisma.user.findMany({
    include: { offers: true, wants: true },
    orderBy: { createdAt: 'desc' },
  });

  const data = users.map((u: UserWithLists) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    borough: u.borough || 'NYC',
    matchStyle: u.matchStyle,
    offers: u.offers.map((o) => o.text),
    wants: u.wants.map((w) => w.text),
  }));

  return NextResponse.json(data);
}
