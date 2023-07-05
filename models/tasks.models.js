const { DataTypes } = require('sequelize');
const db = require ('../database/database');

const Tasks = db.define('tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: { 
        type: DataTypes.STRING(50),
        allowNull: false
    },
    description: { 
        type: DataTypes.STRING(100)
    },
    completed: { 
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Tasks;