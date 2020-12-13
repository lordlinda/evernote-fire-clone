import React, { Component } from "react";
import Todo from "./Todo";

export default class TodoList extends Component {
  render() {
    const { todos } = this.props;
    return (
      <div className="todoListContainer">
        {todos.map((todo, index) => (
          <Todo key={index} todo={todo} updateTodo={this.update} />
        ))}
      </div>
    );
  }
  update = (todo) => {
    this.props.updateTodo(todo);
  };
}
