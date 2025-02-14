/*
  Warnings:

  - You are about to drop the column `name` on the `Animal` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `breed` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `species` to the `Animal` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "animalInitiatorId" TEXT NOT NULL,
    "animalMatchedId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Match_animalInitiatorId_fkey" FOREIGN KEY ("animalInitiatorId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_animalMatchedId_fkey" FOREIGN KEY ("animalMatchedId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("id", "userId") SELECT "id", "userId" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "googleUserId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("bio", "birthday", "createdAt", "email", "firstName", "googleUserId", "id", "lastName", "profilePicture", "updatedAt") SELECT "bio", "birthday", "createdAt", "email", "firstName", "googleUserId", "id", "lastName", "profilePicture", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_googleUserId_key" ON "User"("googleUserId");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
