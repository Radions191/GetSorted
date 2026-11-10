-- CreateTable
CREATE TABLE "DriftsMelding" (
    "id" SERIAL NOT NULL,
    "tittel" TEXT NOT NULL,
    "melding" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DriftsMelding_pkey" PRIMARY KEY ("id")
);
