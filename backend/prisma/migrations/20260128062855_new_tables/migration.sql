/*
  Warnings:

  - You are about to drop the column `deviceName` on the `Event` table. All the data in the column will be lost.
  - The primary key for the `Scanner` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `accessLevel` on the `Scanner` table. All the data in the column will be lost.
  - You are about to drop the column `deviceName` on the `Scanner` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Scanner` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[roomNumber]` on the table `Scanner` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deviceId` to the `Event` table without a default value. This is not possible if the table is not empty.
  - The required column `deviceId` was added to the `Scanner` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `roomNumber` to the `Scanner` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_deviceName_fkey";

-- DropIndex
DROP INDEX "Event_deviceName_idx";

-- DropIndex
DROP INDEX "Scanner_deviceName_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "deviceName",
ADD COLUMN     "deviceId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Scanner" DROP CONSTRAINT "Scanner_pkey",
DROP COLUMN "accessLevel",
DROP COLUMN "deviceName",
DROP COLUMN "id",
ADD COLUMN     "deviceId" UUID NOT NULL,
ADD COLUMN     "roomNumber" TEXT NOT NULL,
ADD CONSTRAINT "Scanner_pkey" PRIMARY KEY ("deviceId");

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "accessLevel" SET DEFAULT 'BASIC';

-- CreateIndex
CREATE UNIQUE INDEX "Scanner_roomNumber_key" ON "Scanner"("roomNumber");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Scanner"("deviceId") ON DELETE RESTRICT ON UPDATE CASCADE;
