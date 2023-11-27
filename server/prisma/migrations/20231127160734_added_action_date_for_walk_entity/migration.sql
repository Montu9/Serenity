/*
  Warnings:

  - Added the required column `date` to the `Walk` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Walk" ADD COLUMN     "date" DATE NOT NULL;
