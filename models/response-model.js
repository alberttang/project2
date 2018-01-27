module.exports = function (sequelize, DataTypes) {

    /*
         ================= RESPONSE CONSTRUCTOR =================
     */
 
    var Response = sequelize.define("Response", {
         answerId: {
             type: DataTypes.INTEGER,
             allowNull: false,
             validate: {
                 len: [1]
             }
         }
     });
 
    /*
         ================= RELATIONSHIP DEFFINITION ==============
     */
 
    Response.associate = function (models) {
         // Associating Response with Poll
         Response.belongsTo(models.User, {
             // When a User is deleted, also delete any associated Polls            
            onDelete: "cascade"
         });
         // We're saying that a Post should belong to an Author
         // A Post can't be created without an Author due to the foreign key constraint
         Response.belongsTo(models.Poll, {
             foreignKey: {
                 allowNull: false
             }
         });
 
        
    };
 
    return Response;
 };