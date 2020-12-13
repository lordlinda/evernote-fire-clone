import React, { Component } from "react";

export default class AddTodo extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      competed: false,
    };
  }
  handleTodo = (e) => {
    this.setState({ text: e.target.value });
  };
  AddTodo = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state);
    this.setState({ text: "" });
  };

  render() {
    //console.log(this.props);
    return (
      <form onSubmit={this.AddTodo}>
        <input type="text" value={this.state.text} onChange={this.handleTodo} />
        <button type="submit">Add Todo</button>
      </form>
    );
  }
}
