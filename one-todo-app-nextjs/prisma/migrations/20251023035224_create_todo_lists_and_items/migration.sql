-- CreateTable
CREATE TABLE "todo_lists" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todo_lists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todo_items" (
    "id" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todo_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "todo_lists_title_idx" ON "todo_lists"("title");

-- CreateIndex
CREATE INDEX "todo_lists_createdAt_idx" ON "todo_lists"("createdAt");

-- CreateIndex
CREATE INDEX "todo_lists_updatedAt_idx" ON "todo_lists"("updatedAt");

-- CreateIndex
CREATE INDEX "todo_lists_deleted_idx" ON "todo_lists"("deleted");

-- CreateIndex
CREATE INDEX "todo_items_listId_idx" ON "todo_items"("listId");

-- CreateIndex
CREATE INDEX "todo_items_createdAt_idx" ON "todo_items"("createdAt");

-- CreateIndex
CREATE INDEX "todo_items_updatedAt_idx" ON "todo_items"("updatedAt");

-- AddForeignKey
ALTER TABLE "todo_items" ADD CONSTRAINT "todo_items_listId_fkey" FOREIGN KEY ("listId") REFERENCES "todo_lists"("id") ON DELETE CASCADE ON UPDATE CASCADE;
