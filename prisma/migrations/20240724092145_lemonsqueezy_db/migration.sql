-- CreateTable
CREATE TABLE "UserSubscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "stripe_customer_id" TEXT,
    "stripe_subscription_id" TEXT,
    "stripe_price_id" TEXT,
    "stripe_current_period_end" TIMESTAMP(3),

    CONSTRAINT "UserSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "lemon_squeezy_customer_id" TEXT,
    "lemon_squeezy_subscription_id" TEXT,
    "lemon_squeezy_variant_id" TEXT,
    "lemon_squeezy_current_period_end" TIMESTAMP(3),

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_userId_key" ON "UserSubscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_customer_id_key" ON "UserSubscription"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSubscription_stripe_subscription_id_key" ON "UserSubscription"("stripe_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_key" ON "Subscription"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_lemon_squeezy_customer_id_key" ON "Subscription"("lemon_squeezy_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_lemon_squeezy_subscription_id_key" ON "Subscription"("lemon_squeezy_subscription_id");
