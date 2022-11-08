/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Guess` table. All the data in the column will be lost.
  - You are about to drop the column `dtCriacao` on the `Pool` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "cdUser" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleId" TEXT,
    "avatarUrl" TEXT,
    "dtCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("avatarUrl", "cdUser", "email", "googleId", "name") SELECT "avatarUrl", "cdUser", "email", "googleId", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");
CREATE TABLE "new_Guess" (
    "cdGuess" TEXT NOT NULL PRIMARY KEY,
    "firstTeamPoints" INTEGER NOT NULL,
    "secondTeamPoints" INTEGER NOT NULL,
    "dtCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cdGame" TEXT NOT NULL,
    "cdParticipant" TEXT NOT NULL,
    CONSTRAINT "Guess_cdParticipant_fkey" FOREIGN KEY ("cdParticipant") REFERENCES "Participant" ("cdParticipant") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_cdGame_fkey" FOREIGN KEY ("cdGame") REFERENCES "Game" ("cdGame") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Guess" ("cdGame", "cdGuess", "cdParticipant", "firstTeamPoints", "secondTeamPoints") SELECT "cdGame", "cdGuess", "cdParticipant", "firstTeamPoints", "secondTeamPoints" FROM "Guess";
DROP TABLE "Guess";
ALTER TABLE "new_Guess" RENAME TO "Guess";
CREATE UNIQUE INDEX "Guess_cdParticipant_cdGame_key" ON "Guess"("cdParticipant", "cdGame");
CREATE TABLE "new_Pool" (
    "cdPool" TEXT NOT NULL PRIMARY KEY,
    "nmPool" TEXT NOT NULL,
    "hsPool" TEXT NOT NULL,
    "dtCreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cdOwner" TEXT,
    CONSTRAINT "Pool_cdOwner_fkey" FOREIGN KEY ("cdOwner") REFERENCES "User" ("cdUser") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pool" ("cdOwner", "cdPool", "hsPool", "nmPool") SELECT "cdOwner", "cdPool", "hsPool", "nmPool" FROM "Pool";
DROP TABLE "Pool";
ALTER TABLE "new_Pool" RENAME TO "Pool";
CREATE UNIQUE INDEX "Pool_hsPool_key" ON "Pool"("hsPool");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
