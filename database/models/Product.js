module.exports = function (Sequelize,DataTypes){ //el modelo exporta una funcion
    
    //definir un alias que va a ser el nombre con el que vamos a llamar al modelo cuando estemos en el controlador
    let alias = 'Product';

    //columnas y sus propiedades
    let cols = {
        id:{
            primaryKey: true,
            notNull: true,
            autoIncrement: true,
            type: DataTypes.INTEGER.UNSIGNED,
        },
        name:{
            notNull: true,
            type: DataTypes.STRING, 
        },
        image:{
            notNull: true,
            type: DataTypes.STRING,
        },
        brand:{
            notNull: true,
            type: DataTypes.STRING,
        },
        descripcion:{
            notnull: true,
            type: DataTypes.STRING,
        },
        usersId:{
            notnull: true,
            type: DataTypes.INTEGER.UNSIGNED,
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
        tableName: "products",
        timestamps: true, //le dice al modelo si la tabla estan las columnas updatedAt y createdAt
        underscored: false, //si la tabla tiene columnas con nombres usando _.
    }
    const Product = Sequelize.define(alias, cols, config);

    //Relaciones entre tablas
    Product.associate = function(models){
        Product.belongsTo(models.User,
        {
            as:'user',
            foreignKey:'usersId'
        })
    
    
        Product.hasMany(models.Comment, {
            as: 'comment',
            foreignKey: 'productsId'
        });
    }

    return Product;
}