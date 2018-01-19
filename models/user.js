module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING
    });
  
    return User;
  };
  