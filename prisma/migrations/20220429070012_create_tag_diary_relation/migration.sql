/*
  Warnings:

  - You are about to drop the `Diary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_DiaryToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Diary` DROP FOREIGN KEY `Diary_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Tag` DROP FOREIGN KEY `Tag_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `_DiaryToTag` DROP FOREIGN KEY `_diarytotag_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_DiaryToTag` DROP FOREIGN KEY `_diarytotag_ibfk_2`;

-- DropTable
DROP TABLE `Diary`;

-- DropTable
DROP TABLE `Tag`;

-- DropTable
DROP TABLE `_DiaryToTag`;

-- CreateTable
CREATE TABLE `diaries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `detail` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diary_tag` (
    `diary_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL,

    PRIMARY KEY (`diary_id`, `tag_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `diaries` ADD CONSTRAINT `diaries_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tags` ADD CONSTRAINT `tags_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diary_tag` ADD CONSTRAINT `diary_tag_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `diaries`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diary_tag` ADD CONSTRAINT `diary_tag_diary_id_fkey` FOREIGN KEY (`diary_id`) REFERENCES `tags`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
