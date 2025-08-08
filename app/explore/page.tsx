'use client';import { useEffect, useState } from 'react';
type Person={id:string;name:string;email:string;borough?:string;matchStyle:string;offers:string[];wants:string[]};
export default function Explore(){const [people,setPeople]=useState<Person[]>([]);const [q,setQ]=useState('');
useEffect(()=>{fetch('/api/people').then(r=>r.json()).then(setPeople)},[]);
const filtered=people.filter(p=>{const query=q.toLowerCase();return [p.name,...p.offers,...p.wants].join(' ').toLowerCase().includes(query);});
return(<div className="container" style={{padding:'24px 0'}}><h1 className="h2">Explore People</h1><input placeholder="Search offers or wants..." value={q} onChange={e=>setQ(e.target.value)} style={{width:'100%',padding:10,border:'1px solid #ddd',borderRadius:8,margin:'8px 0 16px'}}/>
<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>{filtered.map(p=> (<div key={p.id} className="card"><div style={{display:'flex',justifyContent:'space-between'}}><b>{p.name}</b><span className="muted">{p.borough||'NYC'}</span></div><div style={{marginTop:8}}><b>Offers:</b> {p.offers.join(', ')||'—'}</div><div style={{marginTop:4}}><b>Wants:</b> {p.wants.join(', ')||'—'}</div><div style={{marginTop:8,display:'flex',gap:8}}><a className="btn" href={`/match/${p.id}`}>View Matches</a></div></div>))}</div></div>)}
