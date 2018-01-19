module.exports = function (sequelize, DataTypes) {
    var Polls = sequelize.define("poll", {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    // DEFINING THE RELATIONSHIP BETWEEN MODELS
    Polls.associate = function (models) {
        // CONSOLE LOG THE MODELS OBJECT
        console.log(models);
        // ASSOCIATING POLLS WITH MANY RESPONSES  
        Polls.hasMany(models.response, {
            // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
        });
        // ASSOCIATING POLLS WITH MANY ANSWERS
        Polls.hasMany(models.answer, {
            // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
        });
        // We're saying that a Post should belong to an Author
        // ASSOCIATING POLLS TO BELONG TO MANY USERS
        Polls.belongsTo(models.user, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Polls;
};