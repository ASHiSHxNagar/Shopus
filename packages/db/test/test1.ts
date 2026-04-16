import { prisma } from "../client";

async function main() {
  // create user
  const user = await prisma.user.create({
    data: {
      email: "test1@example.com",
      role: "buyer",
    },
  });

  console.log("Created:", user);

  // fetch users
  const users = await prisma.user.findMany();
  console.log("All users:", users);
}

main()
  .catch(console.error)
  .finally(() => process.exit(0));