/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */

// Seeders are used in the sequelize-cli

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */

    return queryInterface.bulkInsert('users', [{
      firstName: 'John',
      lastName: 'Doe',
      email: 'demo@demo.com',
      passwordHash: '$2a$10$CXiLkovhotPZF/Qtff8A1uDKerwr51Jdd8Uhxt.0PnUuFRyfcXv2a',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('Users', null, {});
  },
};
