module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie';

    let cols = {
        id : {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false
        },
        title : {
            type: dataTypes.STRING(500),
            allowNull : false
        },
        rating : {
            type: dataTypes.DECIMAL(3,1).UNSIGNED,
            allowNull : false
        },
        awards : {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull : false,
            defaultValue : '0'
        },
        release_date: {
            type: dataTypes.DATE
        },
        length : {
            type: dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        },
        genre_id : {
            type: dataTypes.INTEGER.UNSIGNED,
            defaultValue : null
        }
     };
    
    let config = {
        tableName : 'movies',
        createdAt : 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false,
        underscored: true
    }

    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = function(modelos){
        Movie.belongsTo(modelos.Genre, {
            as: 'genres',
            foreignKey: 'genre_id'
        })
        Movie.belongsToMany(modelos.Actor, {
            as: 'actors',
            through: "actor_movie",
            foreignKey: 'movie_id',
            otherKey : 'actor_id'
        })
    }

    return Movie;
}