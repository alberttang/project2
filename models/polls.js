module.exports = function (sequelize, DataTypes) {
    var Polls = sequelize.define("polls", {
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
        // Associating Polls with Response 
        Polls.hasMany(models.Reponse, {
            // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
        });
        // Associating Polls with Response 
        Polls.hasMany(models.Answers, {
            // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
        });
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Polls.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Polls;
};