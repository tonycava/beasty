/*
  Warnings:

  - Added the required column `birthday` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "googleUserId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "profilePicture" TEXT NOT NULL,
    "birthday" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_User" ("createdAt", "email", "firstName", "googleUserId", "id", "lastName", "profilePicture", "updatedAt") SELECT "createdAt", "email", "firstName", "googleUserId", "id", "lastName", "profilePicture", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
