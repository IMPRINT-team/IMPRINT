-- AlterTable
ALTER TABLE "Scanner" ADD COLUMN IF NOT EXISTS     "accessLevel" TEXT NOT NULL DEFAULT 'basic';

-- CreateTable
CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "rfidUid" TEXT NOT NULL,
    "email" TEXT,
    "passwordHash" TEXT,
    "accessLevel" TEXT NOT NULL DEFAULT 'basic',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_rfidUid_key" ON "User"("rfidUid");

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
