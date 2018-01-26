module.exports = function (sequelize, DataTypes) {

    /*
        ================= ANSWER CONSTRUCTOR ==================== 
    */
    
    // ANSWER CONSTRUCTOR FUNCTION FOR DB
    var Answer = sequelize.define("Answer", {
        // OPTION PROPERTY
        option: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            },
        },
        // NUM PROPERTY
        num: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }); // END ANSWER

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