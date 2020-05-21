const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Pet extends Model { }

  Pet.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 40],
        notEmpty: true,
      },
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
    },
    breed: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    microchip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    spayed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    vaccinated: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    notes: {
      type: DataTypes.BLOB,
    },
  }, {
    sequelize,
    modelName: 'pet',
  });

  Pet.associate = (models) => {
    Pet.hasMany(models.Appointment);
  };

  return Pet;
};
