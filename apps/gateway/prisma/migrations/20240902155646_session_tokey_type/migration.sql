/*
  Warnings:

  - You are about to drop the column `tokeyType` on the `Session` table. All the data in the column will be lost.
  - Added the required column `tokenType` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session" DROP COLUMN "tokeyType",
ADD COLUMN     "tokenType" "TokenType" NOT NULL;
