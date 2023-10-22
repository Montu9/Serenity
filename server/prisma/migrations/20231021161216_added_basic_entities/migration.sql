/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Shelter` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kennelId` to the `Dog` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `uuid` on the `Dog` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `uuid` to the `Shelter` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `uuid` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Dog" ADD COLUMN     "kennelId" INTEGER NOT NULL,
DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL,
ALTER COLUMN "microchip" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shelter" ADD COLUMN     "uuid" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Kennel" (
    "id" SERIAL NOT NULL,
    "no" INTEGER NOT NULL,
    "desc" TEXT,
    "uuid" UUID NOT NULL,
    "shelterId" INTEGER NOT NULL,

    CONSTRAINT "Kennel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feeding" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "userId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,

    CONSTRAINT "Feeding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cleaning" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "userId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,

    CONSTRAINT "Cleaning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medicate" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "userId" INTEGER NOT NULL,
    "dogId" INTEGER NOT NULL,

    CONSTRAINT "Medicate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DogToImage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DogToImage_AB_unique" ON "_DogToImage"("A", "B");

-- CreateIndex
CREATE INDEX "_DogToImage_B_index" ON "_DogToImage"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Dog_uuid_key" ON "Dog"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Shelter_uuid_key" ON "Shelter"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- AddForeignKey
ALTER TABLE "Kennel" ADD CONSTRAINT "Kennel_shelterId_fkey" FOREIGN KEY ("shelterId") REFERENCES "Shelter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dog" ADD CONSTRAINT "Dog_kennelId_fkey" FOREIGN KEY ("kennelId") REFERENCES "Kennel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeding" ADD CONSTRAINT "Feeding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feeding" ADD CONSTRAINT "Feeding_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cleaning" ADD CONSTRAINT "Cleaning_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicate" ADD CONSTRAINT "Medicate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicate" ADD CONSTRAINT "Medicate_dogId_fkey" FOREIGN KEY ("dogId") REFERENCES "Dog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DogToImage" ADD CONSTRAINT "_DogToImage_A_fkey" FOREIGN KEY ("A") REFERENCES "Dog"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DogToImage" ADD CONSTRAINT "_DogToImage_B_fkey" FOREIGN KEY ("B") REFERENCES "Image"("id") ON DELETE CASCADE ON UPDATE CASCADE;
