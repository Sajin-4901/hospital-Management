
module.exports = (db, Sequelize) => {
  let check = db.define(
    'check',
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      createdAt: {
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    },
    {
      tableName: 'check',
      schema: 'data',
    }
  )
  return check;
}