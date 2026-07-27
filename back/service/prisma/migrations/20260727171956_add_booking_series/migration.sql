-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "seriesId" INTEGER;

-- CreateTable
CREATE TABLE "BookingSeries" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "totalOccurrences" INTEGER NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "BookingSeries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BookingSeries_userId_idx" ON "BookingSeries"("userId");

-- CreateIndex
CREATE INDEX "Booking_seriesId_idx" ON "Booking"("seriesId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "BookingSeries"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingSeries" ADD CONSTRAINT "BookingSeries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
