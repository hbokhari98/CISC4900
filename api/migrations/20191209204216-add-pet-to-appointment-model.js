
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('appointments', 'petId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'pets',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      after: 'userId',
    }, { transaction: t }),
  ])),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('appointments', 'petId', { transaction: t }),
  ])),
};
