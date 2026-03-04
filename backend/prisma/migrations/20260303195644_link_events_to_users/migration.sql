/*
  Warnings:

  - You are about to drop the column `eventType` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `Event` table. All the data in the column will be lost.
  - Added the required column `userRfid` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Event_uid_idx";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventType",
DROP COLUMN "uid",
ADD COLUMN     "userRfid" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Event_userRfid_idx" ON "Event"("userRfid");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userRfid_fkey" FOREIGN KEY ("userRfid") REFERENCES "User"("rfidUid") ON DELETE RESTRICT ON UPDATE CASCADE;
