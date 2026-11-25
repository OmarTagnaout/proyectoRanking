
var express = require('express');
var router = express.Router();
var data = require('../data/data');


/* GET home page. */
router.get('/', function(req, res, next) {

    // Obtenemos todos los videojuegos del archivo games.json
    const games = data.getGames();

    // Renderizamos la vista index.ejs y le pasamos los videojuegos
    // para poder mostrarlos en la página principal
    res.render('index', { games });

});


/*
GET game page
*/

// Creamos una ruta GET para acceder a la página de cada videojuego mediante su ID
router.get('/game/:id', function(req, res, next){

    // Obtenemos el ID del videojuego de la URL
    const id = req.params.id;

    // Buscamos en el archivo JSON el videojuego que coincida con ese ID
    const game = data.getGameById(id);

    if (game) {

        // Renderizamos la vista game.ejs y le pasamos los datos del videojuego
        // para mostrar su información (título, imagen, descripción, puntuación, etc.)
        res.render('game', { game });

    } else {

        // Si el videojuego no existe, mostramos un error 404
        res.status(404).render('error', {
            message: "Ese juego no existe",
            error: { status: "404", stack: "" }
        });

    }

});


/*
GET formulario de alta
*/

// Creamos una ruta GET para mostrar el formulario new.ejs
router.get('/games/create', (req, res) => {

    // Renderizamos la vista del formulario de alta
    res.render('new');

});




/*
POST guardar nuevo videojuego

Recibimos los datos del formulario mediante POST.
Los datos enviados se encuentran dentro de req.body.
*/

router.post('/games', function(req, res, next) {

    /*
    Mostramos por consola los datos recibidos
    desde el formulario para comprobar que llegan correctamente.
    */
    console.log(req.body);

    /*
    Llamamos a la función saveGame del módulo data
    para guardar el nuevo videojuego en games.json.
    */
    data.saveGame(req.body);

    /*
    Una vez guardado el videojuego,
    redirigimos al usuario a la página principal del ranking.
    Desde el POST NUNCA renderizamos, siempre redirigimos.
    */
    res.redirect('/');

});


module.exports = router;
