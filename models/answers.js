module.exports = function (sequelize, DataTypes) {
    var Answers = sequelize.define("answers", {
        option: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    // DIFINING THE RELATIONSHIP BETWEEN ANSWERS AND POLLS
    Answers.belongsTo(models.Polls, {
        // THIS HAS TO HAVE A FOREIGN KEY
        foreignKey: {
            allowNull: false
        }
    });

    return Users;
};