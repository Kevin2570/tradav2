import { prisma } from '../../../lib/prisma';
const Body=z.object({threadId:z.string(),authorId:z.string(),text:z.string().min(1)});
export async function POST(req:Request){try{const data=Body.parse(await req.json());const msg=await prisma.message.create({data:{threadId:data.threadId,authorId:data.authorId,text:data.text}});return NextResponse.json(msg);}catch(e:any){return NextResponse.json({error:e.message},{status:400});}}
