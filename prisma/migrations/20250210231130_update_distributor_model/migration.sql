/*
  Warnings:

  - The primary key for the `distributors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address` on the `distributors` table. All the data in the column will be lost.
  - Made the column `city` on table `distributors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "distributors" DROP CONSTRAINT "distributors_pkey",
DROP COLUMN "address",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "city" SET NOT NULL,
ADD CONSTRAINT "distributors_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "distributors_id_seq";
