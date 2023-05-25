-- DropForeignKey
ALTER TABLE `lists` DROP FOREIGN KEY `fk_lists_user`;

-- AddForeignKey
ALTER TABLE `lists` ADD CONSTRAINT `fk_lists_user` FOREIGN KEY (`user_iduser`) REFERENCES `users`(`iduser`) ON DELETE CASCADE ON UPDATE NO ACTION;
