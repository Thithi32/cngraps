module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    passwordActivation: DataTypes.STRING,
    emailConfirmed: DataTypes.BOOLEAN,
  }, {
    classMethods: {
      associate: (models) => {
        // add asscioation here
        /*
        User.hasMany(models.Bar, {
          foreignKey: 'owner',
        });
        */
      },
    },
  });
  return User;
};
