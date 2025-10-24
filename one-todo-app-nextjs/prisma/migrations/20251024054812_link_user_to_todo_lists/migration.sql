/*
  Warnings:

  - Added the required column `userId` to the `todo_lists` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "todo_lists" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "todo_lists" ADD CONSTRAINT "todo_lists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
