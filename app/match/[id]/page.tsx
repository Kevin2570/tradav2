// @ts-nocheck
import { prisma } from '../../../lib/prisma';
import Link from 'next/link';

type Item = { text: string };
type UserWithLists = {
  id: string;
  name: string;
  borough: string | null;
  matchStyle: 'Strict' | 'Open-Ended' | string;
  offers: Item[];
  wants: Item[];
};

function overlap(a: string[], b: string[]) {
  const A = new Set(a.map((s) => s.toLowerCase()));
  const B = new Set(b.map((s) => s.toLowerCase()));
  return [...A].filter((x) => B.has(x));
}

export default async function MatchPage({
  params,
}: {
  params: { id: string };
}) {
  const me = (await prisma.user.findUnique({
    where: { id: params.id },
    include: { offers: true, wants: true },
  })) as UserWithLists | null;

  if (!me) {
    return (
      <div className="container" style={{ padding: '32px 0' }}>
        User not found.
      </div>
    );
  }

  const all = (await prisma.user.findMany({
    where: { NOT: { id: me.id } },
    include: { offers: true, wants: true },
  })) as UserWithLists[];

type Item={text:string};
const meOffers=me.offers.map((o:Item)=>o.text);const meWants=me.wants.map((w:Item)=>w.text);
const matches=all.map((other:any)=>{const theirOffers=other.offers.map((o:Item)=>o.text);const theirWants=other.wants.map((w:Item)=>w.text);let ok=false; ...

  const matches = all
    .map((other: UserWithLists) => {
      const theirOffers = (other.offers as Item[]).map((o: Item) => o.text);
      const theirWants = (other.wants as Item[]).map((w: Item) => w.text);

      let ok = false;
      if (me.matchStyle === 'Strict') {
        ok =
          meWants.every((w) =>
            theirOffers.map((x) => x.toLowerCase()).includes(w.toLowerCase())
          ) &&
          theirWants.every((w) =>
            meOffers.map((x) => x.toLowerCase()).includes(w.toLowerCase())
          );
      } else {
        ok =
          overlap(meWants, theirOffers).length > 0 ||
          overlap(theirWants, meOffers).length > 0;
      }

      return {
        other,
        ok,
        give: overlap(meOffers, theirWants),
        get: overlap(meWants, theirOffers),
      };
    })
    .filter((m) => m.ok);

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <h1 className="h2">Matches for {me.name}</h1>
      <p className="muted">Match style: {me.matchStyle}</p>
      {matches.length === 0 && (
        <p>No matches yet. Try broadening offers/wants.</p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {matches.map(({ other, give, get }) => (
          <div key={other.id} className="card">
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <b>{other.name}</b>
              <span className="muted">{other.borough || 'NYC'}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <b>You give:</b> {give.join(', ') || '—'}
            </div>
            <div style={{ marginTop: 4 }}>
              <b>You get:</b> {get.join(', ') || '—'}
            </div>
            <div style={{ marginTop: 8 }}>
              <Link className="btn" href={`/thread/${me.id}-${other.id}`}>
                Open Thread
              </Link>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16 }}>
        <Link href="/explore">← Back to Explore</Link>
      </div>
    </div>
  );
}
