module.exports = (sequelize, dataTypes) => { 
    let alias = 'Actor';

    let cols = {
        id : {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull : false,
            unique:true
        },
        first_name : {
            type: dataTypes.STRING(100),
            allowNull : false
        },
        last_name : {
            type: dataTypes.STRING(100),
            allowNull : false,
            unique:true
        },
        rating : {
            type: dataTypes.DECIMAL(3,1).UNSIGNED
        },
        favorite_movie_id: {
            type: dataTypes.INTEGER(10).UNSIGNED
        }
     };
    
    let config = {
        tableName : 'actors',
        createdAt : 'created_at',
        updatedAt: 'updated_at',
        deleteAt: false,
        underscored: true
    }

    const Actor = sequelize.define(alias,cols,config);

    Actor.associate = function(modelos){
        Actor.belongsToMany(modelos.Movie, {
            as: 'movies',
            through: "actor_movie",
            foreignKey: 'actor_id',
            otherKey : 'movie_id'
        })
    }

    return Actor;
}