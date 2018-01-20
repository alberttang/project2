module.exports = function (sequelize, DataTypes) {

    /*
        ================= ANSWER CONSTRUCTOR ==================== 
    */
    
    var Answer = sequelize.define("Answer", {
        option: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        num: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    });

    /*
        ================= RELATIONSHIP DEFFINITION ==============
    */

    // DEFINING THE RELATIONSHIP BETWEEN MODELS
    Answer.associate = function (models) {
        // DIFINING THE RELATIONSHIP BETWEEN ANSWER AND POLLS
        Answer.belongsTo(models.Poll, {
            // THIS HAS TO HAVE A FOREIGN KEY
            foreignKey: {
                allowNull: false
            }
        });
    }; //  END ASSOCIATION FUNCTION

    return Answer;

}; // END EXPORT FUNCTION