module.exports = function (sequelize, DataTypes) {
    var Response = sequelize.define("response", {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        pollId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        answerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    // DEFINING THE RELATIONSHIP BETWEEN MODELS
    Response.associate = function (models) {
        // Associating Polls with Response 
        Response.belongsTo(models.user, {
            // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
        });
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Response.belongsTo(models.poll, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Response;
};