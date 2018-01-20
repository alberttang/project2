
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("user", {
        // ROW ONE
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            // MAKE SURE LENGTH IS GREATER THAN ONE 
            validate: {
                len: [1]
            }
        },
        // ROW TWO
        password: {
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
