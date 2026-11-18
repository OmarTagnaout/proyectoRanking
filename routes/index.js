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

  if (game){
  // Renderizamos la vista game.ejs y le pasamos los datos del videojuego encontrado
  // para mostrar su información (título, imagen, descripción, puntuación, etc.)
  res.render('game', { game });
  }else{
    res.render('error', { message: "Ese juego no existe", error:{statut:"404", stack:""}})
  }

});

module.exports = router;
