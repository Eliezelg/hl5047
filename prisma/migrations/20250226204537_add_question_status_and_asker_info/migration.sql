-- AlterTable
ALTER TABLE "qa" ADD COLUMN     "askerEmail" VARCHAR(255),
ADD COLUMN     "askerName" VARCHAR(100),
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "status" TEXT DEFAULT 'pending',
ALTER COLUMN "answer" DROP NOT NULL;

-- CreateTable
CREATE TABLE "rabbi_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rabbi_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "question_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "question_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RabbiToRabbiCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_RabbiToRabbiCategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "rabbi_categories_name_key" ON "rabbi_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "question_categories_name_key" ON "question_categories"("name");

-- CreateIndex
CREATE INDEX "_RabbiToRabbiCategory_B_index" ON "_RabbiToRabbiCategory"("B");

-- AddForeignKey
ALTER TABLE "qa" ADD CONSTRAINT "qa_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "question_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RabbiToRabbiCategory" ADD CONSTRAINT "_RabbiToRabbiCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "rabbis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RabbiToRabbiCategory" ADD CONSTRAINT "_RabbiToRabbiCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "rabbi_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
