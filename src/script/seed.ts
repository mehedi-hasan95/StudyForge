const { PrismaClient } = require("@prisma/client");
const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [{ title: "Web Development" }, { title: "Graphics Development" }],
    });
    console.log("Seed Created");
  } catch (error) {
    console.log("Seed error", error);
  } finally {
    await database.$disconnect();
  }
}
main();
