-- CreateTable
CREATE TABLE "publications" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "is_reposted" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL,
    "current_owner_id" TEXT NOT NULL,
    "original_owner_id" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,

    CONSTRAINT "publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "link_publications" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,

    CONSTRAINT "link_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_publications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,

    CONSTRAINT "video_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "photo_publications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,

    CONSTRAINT "photo_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_publications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,

    CONSTRAINT "text_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quote_publications" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "announcement" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "publicationId" TEXT NOT NULL,

    CONSTRAINT "quote_publications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "publication_id" TEXT NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "publication_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PublicationToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "link_publications_publicationId_key" ON "link_publications"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "video_publications_publicationId_key" ON "video_publications"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "photo_publications_publicationId_key" ON "photo_publications"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "text_publications_publicationId_key" ON "text_publications"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "quote_publications_publicationId_key" ON "quote_publications"("publicationId");

-- CreateIndex
CREATE UNIQUE INDEX "tags_title_key" ON "tags"("title");

-- CreateIndex
CREATE INDEX "tags_title_idx" ON "tags"("title");

-- CreateIndex
CREATE INDEX "comments_publication_id_idx" ON "comments"("publication_id");

-- CreateIndex
CREATE UNIQUE INDEX "_PublicationToTag_AB_unique" ON "_PublicationToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_PublicationToTag_B_index" ON "_PublicationToTag"("B");

-- AddForeignKey
ALTER TABLE "link_publications" ADD CONSTRAINT "link_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_publications" ADD CONSTRAINT "video_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "photo_publications" ADD CONSTRAINT "photo_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_publications" ADD CONSTRAINT "text_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_publications" ADD CONSTRAINT "quote_publications_publicationId_fkey" FOREIGN KEY ("publicationId") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_publication_id_fkey" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PublicationToTag" ADD CONSTRAINT "_PublicationToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PublicationToTag" ADD CONSTRAINT "_PublicationToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
