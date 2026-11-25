/* Data module: provides access to JSON data files for use in controllers */

const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname);
const RUTA = path.join(dataDir, 'games.json');





/**
 * Lee todos los juegos de games.json
 */
function getGames() {
  const raw = fs.readFileSync(RUTA, 'utf8');
  return JSON.parse(raw);
}





/**
 * Busca un juego por su ID
 */
function getGameById(id) {
  return getGames().find(game => game.id === id);
}





/**
 * Guarda el array completo de juegos en games.json
 */
function saveGames(games) {
  fs.writeFileSync(RUTA, JSON.stringify(games, null, 2) + '\n');
}





/**
 * Añade un juego nuevo al JSON
 */
function saveGame(datos) {
  const games = getGames();

  const ranking = games.length
    ? Math.max(...games.map(juego => juego.ranking)) + 1
    : 1;

  const juego = {
    id: datos.id,
    ranking,
    categoria: datos.categoria,
    image: datos.image || `https://picsum.photos/seed/${datos.id}/400/500`,
    alt: `Cover art for ${datos.title}`,
    title: datos.title,
    description: datos.description || '',
    metacritic: Number(datos.metacritic)
  };

  games.push(juego);

  saveGames(games);

  return juego;
}





module.exports = { getGames, getGameById, saveGames, saveGame };
 
 