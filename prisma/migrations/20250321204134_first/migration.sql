-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateTable
CREATE TABLE "User" (
    "slackId" TEXT NOT NULL,
    "slackName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("slackId")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "channelId" TEXT NOT NULL,
    "authorsString" TEXT NOT NULL,
    "tagsString" TEXT NOT NULL,
    "lastQueriedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnSubscriptions" (
    "id" SERIAL NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "slackId" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UsersOnSubscriptions_pkey" PRIMARY KEY ("id")
);
