import React, { Component } from "react";

class ColorButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "yellow",
      players: [],
      myId: ""
    };
    props.subscribeToStateUpdates(state => {
      console.log("UPDATE STATE BEFORE SETSTATE", state);
      this.setState(state, () => console.log("STATE AFTER UPDATE", this.state));
    });
    props.subscribeToPlayerJoined(() => {
      this.props.fetchGameState("test-0").then(state => {
        this.setState(state, () =>
          console.log("PLAYERS AFTER JOIN: ", this.state.players)
        );
      });
    });
  }

  componentDidMount() {
    this.props
      .fetchGameState("test-0")
      .then(state => this.setState(state, () => console.log(this.state)));
  }

  handleClick = color => {
    if (this.props.myTurn(this.state.players, this.state.myId)) {
      this.setState({ color }, () => {
        this.props.updateGameState({ color }, "test-0");
      });
    }
  };

  render() {
    const colors = ["red", "blue", "yellow", "green"];
    return (
      <div>
        <h3>
          {
            this.props.myTurn(this.state.players, this.state.myId)
              ? "MY TURN"
              : "NOT MY TURN"
          }
        </h3>
        <div
          style={{
            width: "50%",
            height: "50%",
            backgroundColor: this.state.color,
            borderWidth: "5px",
            borderColor: "black"
          }}
        />
        {colors.map(color => (
          <button
            key={color}
            type="button"
            className="btn btn-primary"
            onClick={() => this.handleClick(color)}
            style={{
              backgroundColor: color,
              width: "20px",
              height: "10px"
            }}
          />
        ))}
      </div>
    );
  }
}

export default ColorButton;
