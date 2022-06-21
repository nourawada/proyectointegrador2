module.exports = function(sequelize, dataTypes){
    let alias = "Comment";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text:{
            type: dataTypes.STRING,
            notNull: true
        },
        productsId:{
            type: dataTypes.INTEGER
        },
        usersId:{
            type: dataTypes.INTEGER
        },
        createdAt:{
            type: dataTypes.DATE,
            notNull: true
        },
        updatedAt:{
            type: dataTypes.DATE,
            notNull: true
        },
        deletedAt:{
            type: dataTypes.DATE,
            notNull: true
        }
    };
    //configuraciones adicionales. 
    let config = {
        tableName: "comments",
        timestamps: true,
        underscored:false
    }

    const Comment = sequelize.define (alias, cols, config);
    Comment.associate = function(models){
        Comment.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productsId'
        });

        Comment.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'usersId'
        });
    }
    return Comment;
}