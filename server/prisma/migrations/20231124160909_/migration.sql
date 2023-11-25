/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Breed` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `DogCondition` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `DogStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `IntakeType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_key" ON "Breed"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DogCondition_name_key" ON "DogCondition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DogStatus_name_key" ON "DogStatus"("name");

-- CreateIndex
CREATE UNIQUE INDEX "IntakeType_name_key" ON "IntakeType"("name");
