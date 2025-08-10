import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Only insert if table is empty
  const count = await prisma.people.count()
  if (count === 0) {
    await prisma.people.createMany({
      data: [
        { name: 'Alice', email: 'alice@example.com' },
        { name: 'Bob', email: 'bob@example.com' },
        { name: 'Charlie', email: 'charlie@example.com' },
      ],
    })
    console.log('✅ Seed data inserted')
  } else {
    console.log('⚠️ Seed skipped — data already exists')
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
