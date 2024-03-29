import React, { Component } from "react";
import openSocket from "socket.io-client";
import axios from "axios";
import uuidv4 from "uuid/v4";
const socket = openSocket("http://localhost:3000");

//games
import { ColorButton } from "./games";

class App extends Component {
  constructor() {
    super();
    this.state = {
      inGame: false,
      error: ""
    };
  }
  subscribeToStateUpdates = cb => {
    socket.on("stateUpdate", state => {
      console.log("SUBSCRIBE UPDATES", state);
      cb(state);
    });
  };

  subscribeToPlayerJoined = cb => {
    socket.on("playerJoined", player => {
      cb(player);
    });
  };

  subscribeToReset = cb => {
    socket.on("reset", () => {
      cb();
      this.setState({ inGame: false });
    });
  };

  addPlayer = (gameId, playerMax) => {
    return axios
      .put(`/api/game-state/${gameId}/players/${playerMax}`)
      .then(response => {
        console.log(response);
        this.setState({ inGame: true });
        return response.data;
      })
      .then(player => socket.emit("playerJoined", player))
      .catch(e => this.setState({ error: e.message }));
  };

  createGameState = (data, id) => {
    return axios
      .post(`/api/game-state/${id}`, data)
      .catch(e => console.error(e));
  };

  updateGameState = (data, id) => {
    return axios
      .put(`/api/game-state/${id}`, data)
      .then(() => this.fetchGameState(id))
      .then(state => socket.emit("stateUpdate", state))
      .catch(e => console.error(e));
  };

  fetchGameState = id => {
    console.log("FETCH: ", id);
    return axios
      .get(`/api/game-state/${id}`)
      .then(response => response.data)
      .catch(e => console.error(e));
  };

  myTurn = (players, myId) => {
    return players[0] === myId;
  };

  resetGame = (id, defaultState) => {
    return axios.put(`/api/game-state/${id}`, defaultState)
      .then(() => socket.emit('reset', id))
      .then(() => this.setState({ inGame: false }))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        {!this.state.inGame ? (
          this.state.error ? (
            <span className="alert alert-danger">
              UNABLE TO ENTER GAME ROOM. ROOM IS FULL OR UNAVAILABLE
            </span>
          ) : (
            <button
              type="button"
              onClick={() => this.addPlayer("test-0", 2)}
              className="btn btn-primary"
            >
              JOIN GAME
            </button>
          )
        ) : (
          <ColorButton
            socket={socket}
            fetchGameState={this.fetchGameState}
            createGameState={this.createGameState}
            updateGameState={this.updateGameState}
            myTurn={this.myTurn}
            resetGame={this.resetGame}
            subscribeToStateUpdates={this.subscribeToStateUpdates}
            subscribeToPlayerJoined={this.subscribeToPlayerJoined}
            subscribeToReset={this.subscribeToReset}
          />
        )}
      </div>
    );
  }
}

export default App;
