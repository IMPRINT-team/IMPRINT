-- CreateTable
CREATE TABLE "Scanner" (
    "id" UUID NOT NULL,
    "deviceName" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Scanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" UUID NOT NULL,
    "deviceName" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "eventType" TEXT NOT NULL DEFAULT 'scan',
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Scanner_deviceName_key" ON "Scanner"("deviceName");

-- CreateIndex
CREATE INDEX "Event_occurredAt_idx" ON "Event"("occurredAt");

-- CreateIndex
CREATE INDEX "Event_deviceName_idx" ON "Event"("deviceName");

-- CreateIndex
CREATE INDEX "Event_uid_idx" ON "Event"("uid");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_deviceName_fkey" FOREIGN KEY ("deviceName") REFERENCES "Scanner"("deviceName") ON DELETE RESTRICT ON UPDATE CASCADE;
