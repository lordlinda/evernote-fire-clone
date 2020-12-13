import React, { Component } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles.js";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import db from "../firebase";
import firebase from "firebase";
import { ListItem, List, ListItemText } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";
class Editor extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      title: "",
      id: "",
      notebooks: [],
      open: false,
    };
  }
  componentDidMount = () => {
    db.collection("notebooks").onSnapshot((snapshot) => {
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

    this.setState({
      text: this.props.selectedNote.body,
      title: this.props.selectedNote.title,
      id: this.props.selectedNote.id,
    });
  };
  componentDidUpdate = () => {
    /**when the component updates i.e
     * we ensure that we display what has just been selected
     * if note we have just selected is not equal to that in the state
     * we first update the state
     * to display the new note
     *
     */
    if (this.props.selectedNote.id !== this.state.id) {
      this.setState({
        text: this.props.selectedNote.body,
        title: this.props.selectedNote.title,
        id: this.props.selectedNote.id,
      });
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.editorContainer}>
        <Link to="/home">
          <ArrowBackIosIcon className={classes.editIcon}></ArrowBackIosIcon>
        </Link>

        <AddIcon
          className={classes.addIcon}
          onClick={this.handleClose}
        ></AddIcon>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="simple-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="simple-dialog-title">Add to Notebook</DialogTitle>
          <List>
            {this.state.notebooks.map((notebook) => (
              <ListItem
                button
                onClick={() => this.addToNoteBook(notebook)}
                key={notebook.id}
              >
                <ListItemText primary={notebook.name} />
              </ListItem>
            ))}
          </List>
        </Dialog>

        <input
          className={classes.titleInput}
          placeholder="Note title..."
          value={this.state.title ? this.state.title : ""}
          onChange={(e) => this.updateTitle(e.target.value)}
        ></input>
        <ReactQuill
          theme="snow"
          value={this.state.text}
          onChange={this.updateBody}
        ></ReactQuill>
      </div>
    );
  }
  //! the reason we have this.update is to wait to bombard our server
  //!every time  a user types in the input area
  updateBody = async (val) => {
    await this.setState({ text: val });
    this.update();
  };

  updateTitle = async (txt) => {
    await this.setState({ title: txt });
    this.update();
  };
  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.text,
    });
  }, 1500);
  addToNoteBook = (notebook) => {
    console.log(this.state);
    db.collection("notebooks")
      .doc(notebook.id)
      .update({
        notes: firebase.firestore.FieldValue.arrayUnion({
          id: this.state.id,
          title: this.state.title,
          body: this.state.text,
        }),
      })
      .then((res) => {
        this.handleClose();
      });
  };
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };
}
export default withStyles(styles)(Editor);
