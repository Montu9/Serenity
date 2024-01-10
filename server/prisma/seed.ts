import { DogGender, PrismaClient } from '@prisma/client';
import {
  breed,
  caretaker,
  dogCondition,
  dogStatus,
  gender,
  intakeType,
  role,
} from './data/index';
import { user } from './data/user';
import { nanoid } from 'nanoid';
import * as argon from 'argon2';
import { shelter } from './data/shelter';
import { kennel } from './data/kennel';
import { dog } from './data/dog';

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

  let uuidUser = [];
  for (const x of user) {
    const hash = await argon.hash(x.password);
    const uuid = nanoid();

    const user = await prisma.user.create({
      data: {
        email: x.email,
        passwdHash: hash,
        firstName: x.firstName,
        lastName: x.lastName,
        genderId: x.genderId,
        uuid: uuid,
        isActive: true,
      },
    });
    uuidUser.push(user.uuid);
  }

  let uuidShelter = [];
  for (const x of shelter) {
    const uuid = nanoid();

    const shelter = await prisma.shelter.create({
      data: {
        name: x.name,
        description: x.description,
        uuid: uuid,
      },
    });
    uuidShelter.push(shelter.uuid);
  }

  let uuidKennel = [];
  for (const x of kennel) {
    const uuid = nanoid();
    const kennel = await prisma.kennel.create({
      data: {
        no: x.no,
        desc: x.description,
        uuid: uuid,
        shelter: {
          connect: {
            uuid: uuidShelter[Math.floor(Math.random() * uuidShelter.length)],
          },
        },
      },
    });

    uuidKennel.push(kennel.uuid);
  }

  for (const x of dog) {
    const gender = x.gender === 'MALE' ? DogGender.MALE : DogGender.FEMALE;
    const uuid = nanoid();
    await prisma.dog.create({
      data: {
        uuid: uuid,
        name: x.name,
        dateOfBirth: new Date(x.dateOfBirth),
        gender: gender,
        microchip: x.microchip,
        intakeDate: new Date(x.intakeDate),
        dogCondition: {
          connect: {
            name: x.dogCondition,
          },
        },
        breed: {
          connect: {
            name: x.breed,
          },
        },
        kennel: {
          connect: {
            uuid: uuidKennel[Math.floor(Math.random() * uuidKennel.length)],
          },
        },
        dogStatus: {
          connect: {
            name: x.dogStatus,
          },
        },
        intake: {
          connect: {
            name: x.intakeType,
          },
        },
      },
    });
  }

  for (const x of caretaker) {
    await prisma.usersShelters.create({
      data: {
        userId: x.userId,
        shelterId: x.shelterId,
        roleId: x.roleId,
      },
    });
  }

  const shelters = await prisma.shelter.findMany();
  for (const shelter of shelters) {
    const caretakers = await prisma.usersShelters.findMany({
      where: {
        Shelter: {
          uuid: shelter.uuid,
        },
      },
      select: {
        role: true,
        User: {
          include: {
            gender: true,
          },
        },
      },
    });

    const dogs = await prisma.dog.findMany({
      where: {
        kennel: {
          shelter: {
            uuid: shelter.uuid,
          },
        },
      },
      include: {
        intake: true,
        dogStatus: true,
        kennel: {
          include: {
            shelter: true,
          },
        },
        breed: true,
        dogCondition: true,
      },
    });

    for (const dog of dogs) {
      let actionDate = subtractNDays(30);
      for (let i = 0; i < 30; i++) {
        await prisma.walk.create({
          data: {
            userId:
              caretakers[Math.floor(Math.random() * caretakers.length)].User.id,
            dogId: dog.id,
            date: actionDate,
          },
        });
        actionDate = addNDay(actionDate, 1);
      }
    }

    for (const dog of dogs) {
      let actionDate = subtractNDays(30);
      for (let i = 0; i < 30; i++) {
        await prisma.feeding.create({
          data: {
            userId:
              caretakers[Math.floor(Math.random() * caretakers.length)].User.id,
            dogId: dog.id,
            date: actionDate,
          },
        });
        actionDate = addNDay(actionDate, 1);
      }
    }

    for (const dog of dogs) {
      let actionDate = subtractNDays(30 + getRandomNumber(-5, +5));
      for (let i = 0; i < getRandomNumber(0, 30); i++) {
        await prisma.medicate.create({
          data: {
            userId:
              caretakers[Math.floor(Math.random() * caretakers.length)].User.id,
            dogId: dog.id,
            date: actionDate,
          },
        });
        actionDate = addNDay(actionDate, 1);
      }
    }

    for (const dog of dogs) {
      let actionDate = subtractNDays(30 + getRandomNumber(-5, +5));
      for (let i = 0; i < getRandomNumber(0, 4); i++) {
        await prisma.cleaning.create({
          data: {
            userId:
              caretakers[Math.floor(Math.random() * caretakers.length)].User.id,
            dogId: dog.id,
            date: actionDate,
          },
        });
        actionDate = addNDay(actionDate, 6);
      }
    }
  }
}

function getRandomDate(startDate: Date, endDate: Date): Date {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  const randomTimestamp =
    startTimestamp + Math.random() * (endTimestamp - startTimestamp);
  return new Date(randomTimestamp);
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getNumberOfDays(startDate: Date, endDate: Date): number {
  const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  const differenceInMilliseconds = Math.abs(endTimestamp - startTimestamp);
  const numberOfDays = Math.round(differenceInMilliseconds / oneDay);

  return numberOfDays;
}

function addNDay(date: Date, n: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + n);
  return newDate;
}
function subtractNDays(n: number): Date {
  const currentDate = new Date(); // Current date
  currentDate.setDate(currentDate.getDate() - n); // Subtract 30 days
  return currentDate;
}

main()
  .catch((error) => {
    console.log(error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
