import React, { Component } from "react";
import openSocket from "socket.io-client";
import axios from "axios";
const socket = openSocket("http://localhost:3000");

//async
const addPlayer = (gameId, playerMax) => {
  axios.put(`/api/game-state/${gameId}/players/${playerMax}`)
    .then(response => response.data)
    .then(player => socket.emit("playerJoined", player));
};

//games
import { ColorButton } from "./games";

socket.on("connect", () => {
  addPlayer("test-0", 2)
});

class App extends Component {
  subscribeToStateUpdates = cb => {
    socket.on("stateUpdate", state => {
      cb(state);
    });
  };

  subscribeToPlayerJoined = cb => {
    socket.on("playerJoined", player => {
      cb(player);
    });
  };

  createGameState = (data, id) => {
    return axios
      .post(`/api/game-state/${id}`, data)
      .catch(e => console.error(e));
  };

  updateGameState = (data, id) => {
    return axios
      .put(`/api/game-state/${id}`, data)
      .then(() => {
        socket.emit("stateUpdate", data);
      })
      .catch(e => console.error(e));
  };

  fetchGameState = id => {
    console.log("FETCH: ", id);
    return axios
      .get(`/api/game-state/${id}`)
      .then(response => response.data)
      .catch(e => console.error(e));
  };

  render() {
    return (
      <ColorButton
        socket={socket}
        fetchGameState={this.fetchGameState}
        createGameState={this.createGameState}
        updateGameState={this.updateGameState}
        subscribeToStateUpdates={this.subscribeToStateUpdates}
        subscribeToPlayerJoined={this.subscribeToPlayerJoined}
      />
    );
  }
}

export default App;
