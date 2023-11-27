/*
  Warnings:

  - You are about to drop the column `end` on the `Walk` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `Walk` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Walk" DROP COLUMN "end",
DROP COLUMN "start";
