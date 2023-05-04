-- CreateTable
CREATE TABLE `items` (
    `iditem` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `link` VARCHAR(255) NULL,
    `lists_idlist` INTEGER NOT NULL,

    UNIQUE INDEX `idtable1_UNIQUE`(`iditem`),
    INDEX `fk_items_lists1_idx`(`lists_idlist`),
    PRIMARY KEY (`iditem`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lists` (
    `idlist` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `user_iduser` INTEGER NOT NULL,

    UNIQUE INDEX `idlist_UNIQUE`(`idlist`),
    UNIQUE INDEX `name_UNIQUE`(`name`),
    INDEX `fk_lists_user_idx`(`user_iduser`),
    PRIMARY KEY (`idlist`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `iduser_UNIQUE`(`iduser`),
    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `fk_items_lists1` FOREIGN KEY (`lists_idlist`) REFERENCES `lists`(`idlist`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lists` ADD CONSTRAINT `fk_lists_user` FOREIGN KEY (`user_iduser`) REFERENCES `users`(`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION;
