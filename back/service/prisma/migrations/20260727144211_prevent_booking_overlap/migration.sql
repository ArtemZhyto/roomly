CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "Booking"
ADD CONSTRAINT "Booking_roomId_time_exclusion"
EXCLUDE USING GIST (
  "roomId" WITH =,
  tstzrange("startTime", "endTime", '[)') WITH &&
);