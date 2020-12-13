import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import {
  ListItem,
  Collapse,
  Button,
  ListItemText,
  ListItemIcon,
  TextField,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import SidebarItem from "../sidebarItem/SidebarItem";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import db from "../firebase";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import Notebook from "../editor/Notebook";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import firebase from "firebase";
class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null,
      open: false,
      openModal: false,
      notebooks: [],
      notebook: "",
    };
  }
  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  componentDidMount() {
    db.collection("notebooks")
      .where("user", "==", localStorage.user ? localStorage.user : "")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        let notebooksArr = [];
        snapshot.docs.map((doc) => {
          notebooksArr.push({
            id: doc.id,
            name: doc.data().name,
            notes: doc.data().notes,
          });
          this.setState({ notebooks: notebooksArr });
        });
      });
  }
  handleClose = () => {
    this.setState({ openModal: !this.state.openModal });
  };
  render() {
    const { classes, notes, selectedNoteIndex } = this.props;
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {this.state.addingNote ? "Cancel" : "New Note"}
        </Button>
        {this.state.addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              value={this.state.title}
              placeholder="Enter new note title"
              onChange={(e) => this.updateTitle(e.target.value)}
            />{" "}
            <Button onClick={this.newNote} className={classes.newNoteSubmitBtn}>
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((note, index) => (
            <div className="list" key={index}>
              <SidebarItem
                note={note}
                index={index}
                selectedNoteIndex={selectedNoteIndex}
                selectNote={this.selectNote}
                deleteNote={this.deleteNote}
                history={this.props.history}
              />
            </div>
          ))}
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText primary="Notebooks" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem>
                <ListItemIcon>
                  <LibraryAddIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Create Notebook"
                  onClick={this.handleClose}
                />
              </ListItem>
              <Dialog
                onClose={this.handleClose}
                aria-labelledby="simple-dialog-title"
                open={this.state.openModal}
                className={classes.modal}
              >
                <DialogTitle id="simple-dialog-title">
                  Enter notebook name
                </DialogTitle>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  type="text"
                  className={classes.newNoteBookInput}
                  value={this.state.notebook}
                  placeholder="Enter new note title"
                  onChange={(e) => this.setState({ notebook: e.target.value })}
                />
                <Button onClick={this.updateNotebook} color="primary">
                  ok
                </Button>
              </Dialog>

              {this.state.notebooks.map((notebook) => (
                <Notebook
                  key={notebook.id}
                  notebook={notebook}
                  selectedNoteIndex={selectedNoteIndex}
                  selectNote={this.selectNote}
                  deleteNote={this.deleteNote}
                />
              ))}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
  newNoteBtnClick = () => {
    this.setState({ addingNote: !this.state.addingNote, title: "" });
  };

  updateTitle = (text) => {
    this.setState({ title: text });
  };
  updateNotebook = () => {
    const notebook = db.collection("notebooks").add({
      name: this.state.notebook,
      notes: [],
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: localStorage.user ? localStorage.user : "",
    });
    this.handleClose();
  };

  newNote = () => {
    this.props.newNote(this.state.title);
    this.setState({ title: "", addingNote: false });
  };
  selectNote = (note, index) => {
    this.props.selectNote(note, index);
  };
  deleteNote = (note) => {
    this.props.deleteNote(note);
  };
}
export default withStyles(styles)(Sidebar);
