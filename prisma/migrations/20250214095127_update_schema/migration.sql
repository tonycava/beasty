-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL DEFAULT '',
    "birthday" TEXT NOT NULL DEFAULT '',
    "species" TEXT NOT NULL DEFAULT '',
    "breed" TEXT NOT NULL DEFAULT '',
    "sex" TEXT NOT NULL DEFAULT '',
    "bio" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("bio", "birthday", "breed", "firstName", "id", "sex", "species", "userId") SELECT "bio", "birthday", "breed", "firstName", "id", "sex", "species", "userId" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "animalInitiatorId" TEXT NOT NULL,
    "animalMatchedId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Match_animalInitiatorId_fkey" FOREIGN KEY ("animalInitiatorId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_animalMatchedId_fkey" FOREIGN KEY ("animalMatchedId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("animalInitiatorId", "animalMatchedId", "createdAt", "id", "status", "updatedAt") SELECT "animalInitiatorId", "animalMatchedId", "createdAt", "id", "status", "updatedAt" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
CREATE TABLE "new_Message" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL DEFAULT '',
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("content", "createdAt", "id", "receiverId", "senderId", "updatedAt") SELECT "content", "createdAt", "id", "receiverId", "senderId", "updatedAt" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "googleUserId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL DEFAULT '',
    "lastName" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL DEFAULT '',
    "birthday" TEXT NOT NULL DEFAULT '',
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
