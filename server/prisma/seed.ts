import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const goods = await prisma.goods.create({
    data: {
      name: 'test',
      description: 'test',
      price: 100,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
