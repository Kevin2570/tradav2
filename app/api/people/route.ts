import { prisma } from '../../../lib/prisma';
export async function GET(){const users=await prisma.user.findMany({include:{offers:true,wants:true},orderBy:{createdAt:'desc'}});const data=users.map(u=>({id:u.id,name:u.name,email:u.email,borough:u.borough||'NYC',matchStyle:u.matchStyle,offers:u.offers.map(o=>o.text),wants:u.wants.map(w=>w.text)}));return NextResponse.json(data);}
