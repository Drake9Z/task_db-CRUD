const {Sequelize} = require(('sequelize'));

const db = new Sequelize({ 
   host: 'localhost',
   database: 'tasks_db',
   port: '5432', 
    username: 'alphonse', 
    password: 'root',
    dialect: 'postgres'
});

module.exports = db;