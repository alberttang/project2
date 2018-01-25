module.exports = function (sequelize, DataTypes) {

    /*
        ================= POLL CONSTRUCTOR ==================== 
    */

    var Poll = sequelize.define("Poll", {
        question: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
         } },
        category: {
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

    Poll.associate = function (models) {
        // CONSOLE LOG THE MODELS OBJECT
        console.log(models);
        // ASSOCIATING POLL WITH MANY RESPONSES  
        Poll.hasMany(models.Response, {
            // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
        });
        // ASSOCIATING POLL WITH MANY ANSWERS
        Poll.hasMany(models.Answer, {
            // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
        });
        // We're saying that a Post should belong to an Author
        // ASSOCIATING POLLS TO BELONG TO MANY USERS
        Poll.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Poll;
};