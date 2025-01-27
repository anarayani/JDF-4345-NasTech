-- CreateTable
CREATE TABLE "RSVPResponse" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RSVPResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RSVPResponse" ADD CONSTRAINT "RSVPResponse_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
