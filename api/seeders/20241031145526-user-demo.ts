import { QueryInterface } from "sequelize";
const faker = require("faker");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: faker.name.findName(),
          email: faker.internet.email(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.name.findName(),
          email: faker.internet.email(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: faker.name.findName(),
          email: faker.internet.email(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete("Users", {}, {});
  },
};
