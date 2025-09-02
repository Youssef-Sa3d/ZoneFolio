/*
  Warnings:

  - You are about to drop the column `templateType` on the `Portfolio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Portfolio" DROP COLUMN "templateType",
ADD COLUMN     "templateId" TEXT;

-- CreateTable
CREATE TABLE "public"."Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT,
    "previewUrl" TEXT NOT NULL,
    "demoUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Portfolio" ADD CONSTRAINT "Portfolio_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."Template"("id") ON DELETE SET NULL ON UPDATE CASCADE;
