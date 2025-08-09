// @ts-nocheck
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Link from 'next/link';

async function getPeople() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/people`, {
    cache: 'no-store'
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function ExplorePage() {
  const people = await getPeople();

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <h1 className="h2">Explore people in NYC</h1>
      <p className="muted" style={{ marginBottom: 12 }}>
        Click a person to view their matches as if you were them.
      </p>

      {people.length === 0 && (
        <div className="card">
          <p>No people yet. Seed the demo data first:</p>
          <code style={{ display: 'block', marginTop: 8 }}>/api/seed</code>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {people.map((p: any) => (
          <div key={p.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <b>{p.name}</b>
              <span className="muted">{p.borough || 'NYC'}</span>
            </div>
            <div style={{ marginTop: 8 }}>
              <b>Offers:</b> {p.offers.join(', ') || '—'}
            </div>
            <div style={{ marginTop: 4 }}>
              <b>Wants:</b> {p.wants.join(', ') || '—'}
            </div>
            <div style={{ marginTop: 8 }}>
              <Link className="btn" href={`/match/${p.id}`}>
                See Matches
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
