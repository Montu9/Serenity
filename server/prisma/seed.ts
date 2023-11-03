import { PrismaClient } from '@prisma/client';
import {
  breed,
  dogCondition,
  dogStatus,
  gender,
  intakeType,
  role,
} from './data/index';

const prisma = new PrismaClient();

async function main() {
  for (const x of breed) {
    await prisma.breed.create({
      data: x,
    });
  }
  for (const x of dogCondition) {
    await prisma.dogCondition.create({
      data: x,
    });
  }
  for (const x of dogStatus) {
    await prisma.dogStatus.create({
      data: x,
    });
  }
  for (const x of gender) {
    await prisma.gender.create({
      data: x,
    });
  }
  for (const x of intakeType) {
    await prisma.intakeType.create({
      data: x,
    });
  }
  for (const x of role) {
    await prisma.role.create({
      data: x,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
