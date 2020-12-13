import React, { Component } from "react";
import "./Todo.css";
export default class Todo extends Component {
  toggleTodo = () => {
    this.props.updateTodo(this.props.todo);
  };
  render() {
    const { todo } = this.props;
    return (
      <div
        onClick={this.toggleTodo}
        className={`todo ${todo.completed && "completed"}`}
      >
        <div>{todo.text}</div>
      </div>
    );
  }
}
