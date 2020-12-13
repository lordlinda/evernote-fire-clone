import React, { Component } from "react";
import "./App.css";
import Sidebar from "./sidebar/Sidebar";
import Editor from "./editor/editor";
import firebase from "firebase";
import db from "./firebase";
import Signin from "./Signin";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      notes: [],
      selectedNote: null,
      selectedNoteIndex: null,
      open: true,
    };
  }
  toggleDrawer = () => {
    this.setState({ ...this.state, open: !this.state.open });
  };
  render() {
    const user = localStorage.getItem("user");
    return (
      <>
        <div className="app-container">
          <Router>
            <Switch>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/" component={Signin} />
              <Route
                exact
                path="/home"
                render={(props) => (
                  <Sidebar
                    {...props}
                    selectedNoteIndex={this.state.selectedNoteIndex}
                    notes={this.state.notes}
                    deleteNote={this.deleteNote}
                    selectNote={this.selectNote}
                    newNote={this.newNote}
                  />
                )}
              />
              <Route
                exact
                path="/note"
                render={(props) =>
                  this.state.selectedNote ? (
                    <Editor
                      {...props}
                      selectedNote={this.state.selectedNote}
                      selectedNoteIndex={this.state.selectedNoteIndex}
                      notes={this.state.notes}
                      noteUpdate={this.noteUpdate}
                    />
                  ) : null
                }
              />
            </Switch>
          </Router>
        </div>
      </>
    );
  }
  componentDidMount = () => {
    db.collection("notes")
      .where("user", "==", localStorage.user ? localStorage.user : "")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let notesArr = [];
        snapshot.docs.map((doc) => {
          notesArr.push({
            id: doc.id,
            title: doc.data().title,
            body: doc.data().body,
          });
          this.setState({ notes: notesArr });
        });
      });
    /**const todos = localStorage.getItem("todos");
    if (todos) {
      const savedTodos = JSON.parse(todos);
      this.setState({ todos: savedTodos });
    } else {
      console.log("not todos");
    }**/
  };
  newNote = async (title) => {
    const note = await db.collection("notes").add({
      title: title,
      body: "",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: localStorage.user ? localStorage.user : "",
    });
    const addedNote = {
      title: title,
      body: "",
      id: note.id,
      user: localStorage.user ? localStorage.user : "",
    };
    await this.setState({ notes: [addedNote, ...this.state.notes] });
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter((_note) => _note.id === addedNote.id)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex,
    });

    /**console.log(todo);
    await this.setState({ todos: [...this.state.todos, todo] });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    **/
  };
  noteUpdate = async (id, note) => {
    firebase.firestore().collection("notes").doc(id).update({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    /**  const todos = this.state.todos.map((todo) => {
      if (todo === _todo) {
        return {
          text: todo.text,
          completed: !todo.completed,
        };
      } else {
        return todo;
      }
    });
    console.log(todos);
    await this.setState({ todos: todos });
    localStorage.setItem("todos", JSON.stringify(this.state.todos));**/
  };

  selectNote = (note, index) => {
    this.setState({
      selectedNoteIndex: index,
      selectedNote: note,
      open: false,
    });
  };

  deleteNote = async (note) => {
    const noteIndex = this.state.notes.indexOf(note);
    await this.setState({
      notes: this.state.notes.filter((_note) => _note !== note),
    });
    if (this.state.selectedNoteIndex === noteIndex) {
      this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
      this.state.notes.length > 1
        ? this.selectNote(
            this.state.notes[this.state.selectedNoteIndex - 1],
            this.state.selectedNoteIndex - 1
          )
        : this.setState({ selectedNoteIndex: null, selectedNote: null });
    }

    firebase.firestore().collection("notes").doc(note.id).delete();
  };
}
