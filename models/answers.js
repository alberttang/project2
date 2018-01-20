module.exports = function (sequelize, DataTypes) {
    var Answers = sequelize.define("answer", {
        option: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
<<<<<<< HEAD
Answers.associate = function(models) {
    // DIFINING THE RELATIONSHIP BETWEEN ANSWERS AND POLLS
    Answers.belongsTo(models.Polls, {
        // THIS HAS TO HAVE A FOREIGN KEY
        foreignKey: {
            allowNull: false
        }
    });
};
    return Answers;
=======


    // DEFINING THE RELATIONSHIP BETWEEN MODELS
    Answers.associate = function (models) {
        // DIFINING THE RELATIONSHIP BETWEEN ANSWERS AND POLLS
        Answers.belongsTo(models.poll, {
            // THIS HAS TO HAVE A FOREIGN KEY
            foreignKey: {
                allowNull: false
            }
        });
    }; //  END ASSOCIATION FUNCTION

return Answers;
>>>>>>> 4d5debbea97776da53f388ae7005143b5b85652a
};