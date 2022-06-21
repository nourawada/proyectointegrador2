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
        }
    };
    //configuraciones adicionales. 
    let config = {
        tableName: "comments",
        timestamp: true,
        underscored:false
    }

    const Comments = sequelize.define (alias, cols, config);
    Comments.associate = function(models){
        Comments.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'productsId'
        });

        Comments.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'usersId'
        });
    }
    return Comments;
}