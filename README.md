# Trada — Full‑Stack MVP (Next.js + Prisma + SQLite)
**Run locally**
```bash
npm i
npm run prisma:generate
npm run prisma:migrate
npm run dev
```
Open http://localhost:3000

**Deploy to Vercel**
- Push this folder to GitHub → import in Vercel → Deploy (no env vars needed).

**Features**
- Create profile (/profile) with offers & wants
- Explore people (/explore)
- Match page (/match/[id]) with strict/open‑ended logic
- Thread messages (/thread/[pair]) as a simple chat placeholder
