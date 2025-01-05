import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: {email: "user@example.com"},
    update: {},
    create: {
      email: "user@example.com",
      name: "Jason",
    }
  })
  return user;
}

main()
  .then((user) => {
    console.log(user);
  })
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })