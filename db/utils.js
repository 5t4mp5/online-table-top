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
    .then(() => changeTurn(id))
    .then(() => stateRef.get())
    .then(state => {
      console.log("DB AFTER UPDATE", state.data());
      return state.data();
    });
};

const getGameState = id => {
  const stateRef = db.collection("game-states").doc(id);
  return stateRef.get().then(state => state.data());
};

const setPlayer = (gameId, playerId, playerMax = 2) => {
  const stateRef = db.collection("game-states").doc(gameId);
  return stateRef
    .get()
    .then(response => response.data())
    .then(state => state.players)
    .then(players => {
      if (!players.includes(playerId) && players.length < playerMax) {
        return stateRef.update({ players: [...players, playerId] });
      } else if (players.includes(playerId)) {
      } else if (players.length >= playerMax) {
        throw new Error("Player Cap has been Reached");
      }
    });
};

const changeTurn = id => {
  const stateRef = db.collection("game-states").doc(id);
  return stateRef.get()
    .then(response => response.data())
    .then(state => state.players)
    .then(players => {
      if(players.length > 1){
        const newPlayerOrder = [...players.slice(1), ...players.slice(0,1)];
        return stateRef.update({
          players: newPlayerOrder
        })
      }
    });
};

module.exports = { setGameState, updateGameState, getGameState, setPlayer };
