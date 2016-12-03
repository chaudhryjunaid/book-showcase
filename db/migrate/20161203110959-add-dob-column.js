'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('ALTER TABLE `bookdb`.`Users` ADD COLUMN `dob` INT UNSIGNED NULL AFTER `salt`;');
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query('ALTER TABLE `bookdb`.`Users` DROP COLUMN `dob`;');
  }
};
