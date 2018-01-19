<<<<<<< HEAD

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("user", {
        // ROW ONE
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            // MAKE SURE LENGTH IS GREATER THAN ONE 
            validate: {
                len: [1]
            }
        },
        // ROW TWO
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            // MAKE SURE LENGTH IS GREATER THAN ONE 
            validate: {
                len: [1]
            }
        },
        // ROW THREE
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            // MAKE SURE LENGTH IS GREATER THAN ONE 
            validate: {
                len: [1]
            }
        }
    });

    // DEFINING THE RELATIONSHIP BETWEEN MODELS
    User.associate = function (models) {
        // Associating User with Polls
        User.hasMany(models.poll, {
            // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
        });
        // Associating User with Response 
        User.hasMany(models.response, {
            // When a User is deleted, also delete any associated Responses
            onDelete: "cascade"
        });
    };

    return User;
};
=======
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
      // Giving the Author model a name of type STRING
      name: DataTypes.STRING
    });
  
    return User;
  };
  
>>>>>>> ec43bb0d863dfe2e8fb3abab06a2f683011cc9e9
