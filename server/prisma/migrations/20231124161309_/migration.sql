/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Kennel` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Kennel_uuid_key" ON "Kennel"("uuid");
