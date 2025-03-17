/*
  Warnings:

  - Added the required column `userPrompt` to the `Code` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Code" ADD COLUMN     "userPrompt" TEXT NOT NULL;
