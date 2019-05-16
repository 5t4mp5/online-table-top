import React, { Component } from 'react';

class ColorButton extends Component {
    constructor(props) {
      super(props);
      this.state = { color: "yellow" };
      props.subscribeToStateUpdates(color => this.setState({ color }))
    }
  
    handleClick = color => {
      this.setState({ color }, () => {
        this.props.socket.emit('updateState', color);
      });
    };
  
    render() {
      const colors = ["red", "blue", "yellow", "green"];
      return (
        <div>
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
              style ={{
                  backgroundColor: color,
                  width: '20px',
                  height: '10px'
              }}
            />
          ))}
        </div>
      );
    }
  }

  export default ColorButton;
