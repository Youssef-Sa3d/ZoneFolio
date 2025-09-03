/*
  Warnings:

  - You are about to drop the column `previewUrl` on the `Template` table. All the data in the column will be lost.
  - Made the column `demoUrl` on table `Template` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."Template" DROP COLUMN "previewUrl",
ALTER COLUMN "demoUrl" SET NOT NULL;
