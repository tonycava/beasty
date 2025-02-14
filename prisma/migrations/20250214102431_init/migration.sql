/*
  Warnings:

  - Added the required column `updatedAt` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Animal" ("bio", "birthday", "breed", "firstName", "id", "sex", "species", "userId") SELECT "bio", "birthday", "breed", "firstName", "id", "sex", "species", "userId" FROM "Animal";
DROP TABLE "Animal";
ALTER TABLE "new_Animal" RENAME TO "Animal";
CREATE TABLE "new_Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "animalId" TEXT NOT NULL,
    CONSTRAINT "Image_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Image" ("animalId", "id", "url") SELECT "animalId", "id", "url" FROM "Image";
DROP TABLE "Image";
ALTER TABLE "new_Image" RENAME TO "Image";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
