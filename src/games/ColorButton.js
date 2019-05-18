import React, { Component } from 'react';

class ColorButton extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        color: "yellow",
        players: [],
     };
      props.subscribeToStateUpdates(state => this.setState(state))
    }

    componentDidMount(){
      this.props.fetchGameState('test-0')
        .then(state => this.setState(state))
    }
  
    handleClick = color => {
      this.setState({ color }, () => {
        this.props.updateGameState({ color }, 'test-0')
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
