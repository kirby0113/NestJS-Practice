/*
  Warnings:

  - You are about to drop the `diaries` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `diary_tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `diaries` DROP FOREIGN KEY `diaries_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `diary_tag` DROP FOREIGN KEY `diary_tag_diary_id_fkey`;

-- DropForeignKey
ALTER TABLE `diary_tag` DROP FOREIGN KEY `diary_tag_tag_id_fkey`;

-- DropForeignKey
ALTER TABLE `tags` DROP FOREIGN KEY `tags_user_id_fkey`;

-- DropTable
DROP TABLE `diaries`;

-- DropTable
DROP TABLE `diary_tag`;

-- DropTable
DROP TABLE `tags`;

-- CreateTable
CREATE TABLE `Tag` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DiaryToTag` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DiaryToTag_AB_unique`(`A`, `B`),
    INDEX `_DiaryToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Diary` ADD CONSTRAINT `Diary_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiaryToTag` ADD FOREIGN KEY (`A`) REFERENCES `Diary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DiaryToTag` ADD FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
