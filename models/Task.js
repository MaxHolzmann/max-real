const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Task extends Model {
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id"
      }
    },
    date_created: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  },
  {
    hooks: {
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: false,
    modelName: 'task',
  }
);

module.exports = Task;
