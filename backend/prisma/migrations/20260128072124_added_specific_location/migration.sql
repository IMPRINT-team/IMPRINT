/*
  Warnings:

  - You are about to drop the column `roomNumber` on the `Scanner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[specificLocation]` on the table `Scanner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `specificLocation` to the `Scanner` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Scanner_roomNumber_key";

-- AlterTable
ALTER TABLE "Scanner" DROP COLUMN "roomNumber",
ADD COLUMN     "specificLocation" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Scanner_specificLocation_key" ON "Scanner"("specificLocation");
