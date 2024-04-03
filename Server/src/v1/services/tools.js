
const testDatabase = async (sequelize) => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const syncDatabase = async (sequelize) => {
    try {
        await sequelize.sync();
        console.log('Database synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    }
}

module.exports = {
    testDatabase,
    syncDatabase
}