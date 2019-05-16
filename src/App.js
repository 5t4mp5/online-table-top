import React, { Component } from "react";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:3000");

//games
import { ColorButton } from "./games";

socket.on("connect", () => {
  console.log(`I HAVE CONNECTED!`);
});

class App extends Component {
  subscribeToStateUpdates = cb => {
    socket.on("stateUpdate", state => {
      "state update ran"
      cb(state);
    });
  };

  render() {
    return <ColorButton socket={socket} subscribeToStateUpdates={this.subscribeToStateUpdates} />;
  }
}

export default App;
