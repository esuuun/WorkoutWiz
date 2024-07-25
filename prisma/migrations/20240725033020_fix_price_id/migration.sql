/*
  Warnings:

  - You are about to drop the column `lemon_squeezy_variant_id` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "lemon_squeezy_variant_id",
ADD COLUMN     "lemon_squeezy_price_id" TEXT;
