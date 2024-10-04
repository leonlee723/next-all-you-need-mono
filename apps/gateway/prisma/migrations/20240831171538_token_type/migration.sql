/*
  Warnings:

  - You are about to drop the column `type` on the `Session` table. All the data in the column will be lost.
  - Added the required column `tokeyType` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "type",
ADD COLUMN     "tokeyType" "TokenType" NOT NULL;

-- DropEnum
DROP TYPE "SessionType";
