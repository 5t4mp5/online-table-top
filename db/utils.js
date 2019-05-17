const db = require("./db");

const setGameState = (state, id) => {
  const stateRef = db.collection("game-states").doc(id);
  return stateRef
    .set(state)
    .then(() => stateRef.get())
    .then(state => state.data());
};

const updateGameState = (update, id) => {
  const stateRef = db.collection("game-states").doc(id);
  return stateRef
    .update(update)
    .then(() => stateRef.get())
    .then(state => state.data());
};

const getGameState = id => {
  const stateRef = db.collection("game-states").doc(id);
  return stateRef.get().then(state => state.data());
};

module.exports = { setGameState, updateGameState, getGameState };
