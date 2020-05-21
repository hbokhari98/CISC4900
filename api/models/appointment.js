/* eslint-disable no-unused-vars */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model { }

  Appointment.init({
    apptTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'appointment',
  });

  Appointment.associate = (models) => {
    // Associations here
  };

  return Appointment;
};
