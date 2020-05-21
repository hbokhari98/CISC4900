const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Service extends Model { }

  Service.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    rate: {
      type: DataTypes.DECIMAL.UNSIGNED,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'service',
  });

  Service.associate = (models) => {
    Service.hasMany(models.Appointment);
  };

  return Service;
};
