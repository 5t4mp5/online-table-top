const db = require('./db');

const setGameState = (state, id) => {
    const stateRef = db.collection('game-states').doc(id);
    return stateRef.set(state)
};

const updateGameState = (update, id) => {
    const stateRef = db.collection('game-states').doc(id);
    return stateRef.update(update)
};

const getGameState = id => {
    const stateRef = db.collection('game-states').doc(id);
    return stateRef.get()
};

module.exports = { setGameState, updateGameState, getGameState };
