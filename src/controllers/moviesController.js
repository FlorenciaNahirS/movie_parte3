const db = require('../database/models');
const sequelize = db.sequelize;
const dayjs = require('dayjs')

//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id, {
            include: [
                {association: 'genres'}
            ]
        })
            .then(movie => {
                res.render('moviesDetail.ejs', {movie, genreName : movie.genres.name});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, //Aqui debemos modificar y completar lo necesario para trabajar con el CRUD
    add: function (req, res) {
        db.Genre.findAll({
            order : [['name','ASC']]
        })
            .then((genres)=>{
                let genre = genres.map(genre => genre);

                return res.render('moviesAdd',{
                    genres: genre
                }) 
            })
            .catch((error) => {console.log(error)})
    },
    create: function (req, res) {
        const {title, rating, awards, release_date, length, genres} = req.body;


        db.Movie.create({
            title: title.trim(),
            rating,
            awards,
            release_date,
            length,
            genre_id :genres
        })

            .then(movie => {
                return res.redirect('/movies/detail/'+movie.id)
            })
            .catch((errors) => console.log(errors))
    },
    edit: function(req, res) {
        db.Movie.findByPk(req.params.id)
            .then((movie) => {
                //return res.send(movie)
                db.Genre.findAll({
                    order : [['name','ASC']]
                })
                    .then((genres)=>{
                        let genre = genres.map(genre => genre);
        
                        return res.render('moviesEdit',{
                            Movie : movie,
                            release_date : dayjs(movie.release_date).format('YYYY-MM-DD'),
                            genres: genre
                        })
                    })
            })
            .catch((errors) => console.log(errors))
    },
    update: function (req,res) {
        const {title, rating, awards, release_date, length,genres} = req.body;
        db.Movie.update(
            {
                title: title.trim(),
                rating,
                awards,
                release_date : dayjs(release_date).format('YYYY-MM-DD'),
                length,
                genre_id:genres
            },
            {
                where : {
                    id : req.params.id
                }
            }
            )
            .then(() => {
                return res.redirect('/movies')
            })
            .catch((errors) => console.log(errors))
    },
    delete: function (req, res) {
        db.Movie.findByPk(req.params.id)
            .then((movie) => {
                //return res.send(movie)
                return res.render('moviesDelete',{
                    Movie : movie
                })
            })
            .catch((errors) => console.log(errors))
    },
    destroy: function (req, res) {
        db.Movie.destroy(
            {
                where : {
                    id : req.params.id
                }
            }
            )
            .then(() => {
                return res.redirect('/movies')
            })
            .catch((errors) => console.log(errors))
    }

}

module.exports = moviesController;