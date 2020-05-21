
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.addColumn('appointments', 'task', {
      type: Sequelize.STRING,
      allowNull: false,
      after: 'apptTime',
    }, { transaction: t }),
  ])),

  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction((t) => Promise.all([
    queryInterface.removeColumn('appointments', 'task', { transaction: t }),
  ])),
};
