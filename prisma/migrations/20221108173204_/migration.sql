-- CreateTable
CREATE TABLE "Pool" (
    "cdPool" TEXT NOT NULL PRIMARY KEY,
    "nmPool" TEXT NOT NULL,
    "hsPool" TEXT NOT NULL,
    "dtCriacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cdOwner" TEXT,
    CONSTRAINT "Pool_cdOwner_fkey" FOREIGN KEY ("cdOwner") REFERENCES "User" ("cdUser") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "cdUser" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "googleId" TEXT,
    "avatarUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Participant" (
    "cdParticipant" TEXT NOT NULL PRIMARY KEY,
    "cdUser" TEXT NOT NULL,
    "cdPool" TEXT NOT NULL,
    CONSTRAINT "Participant_cdUser_fkey" FOREIGN KEY ("cdUser") REFERENCES "User" ("cdUser") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participant_cdPool_fkey" FOREIGN KEY ("cdPool") REFERENCES "Pool" ("cdPool") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Game" (
    "cdGame" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "firstTeamCountryCode" TEXT NOT NULL,
    "secondTeamCountryCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Guess" (
    "cdGuess" TEXT NOT NULL PRIMARY KEY,
    "firstTeamPoints" INTEGER NOT NULL,
    "secondTeamPoints" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cdGame" TEXT NOT NULL,
    "cdParticipant" TEXT NOT NULL,
    CONSTRAINT "Guess_cdParticipant_fkey" FOREIGN KEY ("cdParticipant") REFERENCES "Participant" ("cdParticipant") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Guess_cdGame_fkey" FOREIGN KEY ("cdGame") REFERENCES "Game" ("cdGame") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pool_hsPool_key" ON "Pool"("hsPool");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_googleId_key" ON "User"("googleId");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_cdUser_cdPool_key" ON "Participant"("cdUser", "cdPool");

-- CreateIndex
CREATE UNIQUE INDEX "Guess_cdParticipant_cdGame_key" ON "Guess"("cdParticipant", "cdGame");
