module.exports = function (Sequelize,DataTypes){ //el modelo exporta una funcion
    
    //definir un alias que va a ser el nombre con el que vamos a llamar al modelo cuando estemos en el controlador
    let alias = 'User';

    //columnas y sus propiedades
    let cols = {
        id:{
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        email:{
            notNull: true,
            type: DataTypes.STRING, 
        },
        username:{
            notNull: true,
            type: DataTypes.STRING,
        },
        password:{
            notNull: true,
            type: DataTypes.STRING,
        },
        nacimiento:{
            notnull: true,
            type: DataTypes.DATE,
        },
        dni:{
            notnull: true,
            type: DataTypes.INTEGER,
        },
        image:{
            notNull: true,
            type: DataTypes.STRING,
        },
        createdAt:{
            notNull: true,
            type: DataTypes.DATE,
        },
        updatedAt:{
            notNull: true,
            type: DataTypes.DATE,
        },
        
    
    }
    //CONFIGURACIONES ADICIONALES
    let config = { //puede no estar, cuando el nombre de la tabla es el nombre del modelo en plural
        tableName: "users",
        timestamps: true, //le dice al modelo si la tabla estan las columnas updatedAt y createdAt
        underscored: false, //si la tabla tiene columnas con nombres usando _.
    }
    const User = Sequelize.define(alias, cols, config);
    
    //Relaciones entre tablas 
    User.associate = function(models){
        User.hasMany(models.Product,
        {
            as:'product',
            foreignKey:'usersId'
        })
    }
    User.associate = function(models){
        User.hasMany(models.Comment, {
            as: 'comment',
            foreignKey: 'usersId'
        });
    }

    return User;
}
