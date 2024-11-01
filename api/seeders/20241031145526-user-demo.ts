import { QueryInterface } from "sequelize";
import { faker } from "@faker-js/faker";

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          username: faker.person.firstName(),
          email: faker.internet.email(),
          passwordHash: faker.internet.password(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: faker.person.firstName(),
          email: faker.internet.email(),
          passwordHash: faker.internet.password(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: faker.person.firstName(),
          email: faker.internet.email(),
          passwordHash: faker.internet.password(),
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
