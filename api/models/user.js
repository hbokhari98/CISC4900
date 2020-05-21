/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model { }

  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.VIRTUAL,
      validate: {
        len: {
          args: 7,
        },
      },
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 11],
        notEmpty: true,
      },
    },
    address: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    city: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
    zipcode: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  }, {
    sequelize,
    modelName: 'user',
  });

  User.associate = (models) => {
    User.hasMany(models.Pet);
    User.hasMany(models.Appointment);
  };

  User.beforeSave(async (user) => {
    if (user.password) {
      user.passwordHash = await bcrypt.hash(user.password, 10).catch((error) => {
        throw error;
      });
    }
  });

  return User;
};
