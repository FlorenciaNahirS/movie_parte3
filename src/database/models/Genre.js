module.exports = (sequelize, dataTypes) => { 
    let alias = 'Genre';

    let cols = {
        id : {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        name : {
            type: dataTypes.STRING(100),
            allowNull : false,
            unique:true
        },
        ranking : {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false
        },
        active: {
            type: dataTypes.BOOLEAN,
            allowNull : false,
            defaultValues: '1'
        }
     };
    
    let config = {
        tableName : 'genres',
        createdAt : 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false,
        underscored: true
    }

    const Genre = sequelize.define(alias,cols,config);

    Genre.associate = function(modelos){
        Genre.hasMany(modelos.Movie, {
            as: 'genres',
            foreinKey: 'genre_id'
        })
    }

    return Genre;
}