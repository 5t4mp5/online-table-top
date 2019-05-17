const db = require('./db');
const { setGameState, updateGameState, getGameState } = require('./utils');

module.exports = { db, setGameState, updateGameState, getGameState };
