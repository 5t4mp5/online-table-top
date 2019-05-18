import React, { Component } from "react";
import openSocket from "socket.io-client";
import axios from "axios";
const socket = openSocket("http://localhost:3000");

//async
const createGameState = (data, id) => {
  axios
    .post(`/api/game-state/${id}`, data)
    .then(state => console.log(state))
    .catch(e => console.error(e));
};

//games
import { ColorButton } from "./games";

socket.on("connect", () => {
  console.log(`I HAVE CONNECTED!`);
});

class App extends Component {
  subscribeToStateUpdates = cb => {
    socket.on("stateUpdate", state => {
      "state update ran";
      cb(state);
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
        fetchGameState = {this.fetchGameState}
        createGameState={this.createGameState}
        updateGameState={this.updateGameState}
        subscribeToStateUpdates={this.subscribeToStateUpdates}
      />
    );
  }
}

export default App;
