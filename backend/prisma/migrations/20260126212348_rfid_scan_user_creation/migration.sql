-- AlterTable
ALTER TABLE "Scanner" ADD COLUMN     "accessLevel" TEXT NOT NULL DEFAULT 'basic';

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "rfidUid" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT,
    "accessLevel" TEXT NOT NULL DEFAULT 'basic',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_rfidUid_key" ON "User"("rfidUid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
