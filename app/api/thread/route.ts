export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { threadId, authorId, text } = body ?? {};

    if (!threadId || !authorId || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const msg = await prisma.message.create({
      data: { threadId, authorId, text: text.trim() },
    });

    return NextResponse.json(msg);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }
}
