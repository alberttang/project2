module.exports = function (sequelize, DataTypes) {
    var Answer = sequelize.define("answer", {
        option: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });
    // DEFINING THE RELATIONSHIP BETWEEN MODELS
    Answer.associate = function (models) {
        // DIFINING THE RELATIONSHIP BETWEEN ANSWERS AND POLLS
        Answer.belongsTo(models.poll, {
            // THIS HAS TO HAVE A FOREIGN KEY
            foreignKey: {
                allowNull: false
            }
        });
    }; //  END ASSOCIATION FUNCTION
    // RETURN THE ANSWER CONSTRUCTOR
    return Answer;
};