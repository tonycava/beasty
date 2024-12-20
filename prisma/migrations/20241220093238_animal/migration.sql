-- CreateTable
CREATE TABLE "Animal" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Animal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "url" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,
    CONSTRAINT "Image_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
