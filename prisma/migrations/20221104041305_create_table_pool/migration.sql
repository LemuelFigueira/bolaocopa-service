-- CreateTable
CREATE TABLE "Pool" (
    "cdPool" TEXT NOT NULL PRIMARY KEY,
    "nmPool" TEXT NOT NULL,
    "hsPool" TEXT NOT NULL,
    "dtCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Pool_hsPool_key" ON "Pool"("hsPool");
