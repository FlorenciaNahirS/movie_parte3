const db = require('../database/models');

module.exports = {
    list: (req, res) => {
        db.Actor.findAll(
            {
                order: [
                    ['first_name', 'ASC']
                ]
            },
            {
                include: ['movies'],

            },
        )
            .then(actors => {
                //return res.send(actors)
                return res.render('actorsList', {
                    actors
                })
            }).catch(error => console.log(error))
    },
    detail: (req, res) => {

        db.Actor.findByPk(req.params.id, {
            include: ['movies']
        })
            .then(actor => {
                db.Movie.findOne({
                    where: {
                        id: actor.favorite_movie_id
                    }
                }).then(movie => {
                    return res.render('actorsDetail', {
                        actor,
                        favoriteMovie: movie ? movie.title : ' ',
                        movies: actor.movies.map(movie => movie.title)
                    })
                })
            }).catch(error => console.log(error))


    },
    add: (req, res) => {
        db.Movie.findAll().then(movies => {
            return res.render('actorsAdd', {
                movies
            })
        }).catch(error => console.log(error))
    },
    store: (req, res) => {
        const { first_name, last_name, rating, favorite_movie_id } = req.body;
        db.Actor.create({
            first_name: first_name.trim(),
            last_name: last_name.trim(),
            rating,
            favorite_movie_id
        })
            .then(actor => {
                return res.redirect('/actors/detail/' + actor.id)
            }).catch(error => console.log(error))
    },
    edit: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                db.Actor.findOne(
                    {
                        where: {
                            id: req.params.id
                        }
                    },
                    {
                        include: ['movies']
                    }
                ).then(actor => {
                    return res.render('actorsEdit', {
                        actor,
                        movies
                    })
                }).catch(error => console.log(error))
            })

    },
    update: (req, res) => {
        const { first_name, last_name, rating, favorite_movie_id } = req.body;
        db.Actor.update(
            {
                first_name: first_name.trim(),
                last_name: last_name.trim(),
                rating,
                favorite_movie_id
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(actor => {
            return res.redirect('/actors/detail/' + req.params.id)
        }).catch(error => console.log(error))
    },
    destroy: (req, res) => {
        db.Actor.findByPk(req.params.id).then(actor => {
            return res.render('actorsDelete', {
                actor
            })
        }).catch(error => console.log(error))
    },
    delete: (req, res) => {
        db.Actor.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            return res.redirect('/actors');
        }).catch(error => console.log(error))
    }
}