module.exports = (sequelize, dataTypes) => {
    let alias = 'actor_movie';
    let cols = {
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        movie_id :{
            type: dataTypes.INTEGER.UNSIGNED,
        },
        actor_id: {
            type: dataTypes.INTEGER.UNSIGNED,
        }     
    };
    let config = {
        tableName : 'actor_movie',
        timestamps: false,
        underscored: true
    }
    const actor_movie = sequelize.define(alias, cols, config); 

    //Aquí debes realizar lo necesario para crear las relaciones con el modelo (Movie)
 
    return actor_movie
};