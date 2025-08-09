// @ts-nocheck
import { prisma } from '../../../lib/prisma';
import ThreadBox from './threadbox';

export default async function Thread({ params }: { params: { slug: string } }) {
  const [a, b] = params.slug.split('-');

  let thread =
    (await prisma.matchThread.findFirst({
      where: { OR: [{ userAId: a, userBId: b }, { userAId: b, userBId: a }] },
    })) || null;

  if (!thread) {
    thread = await prisma.matchThread.create({
      data: { userAId: a, userBId: b },
    });
  }

  const messages = await prisma.message.findMany({
    where: { threadId: thread.id },
    orderBy: { createdAt: 'asc' },
  });

  return <ThreadBox threadId={thread.id} initialMessages={messages} />;
}
