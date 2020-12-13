import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";
import { IconButton } from "@material-ui/core";

class SidebarItem extends Component {
  render() {
    const { classes, index, selectedNoteIndex, note } = this.props;
    return (
      <div key={index}>
        <ListItem
          className={classes.listItem}
          selected={selectedNoteIndex === index}
          alignItems="center"
          justifycontent="space-between"
        >
          <div
            className={classes.textSection}
            onClick={() => this.selectNote(note, index)}
          >
            <ListItemText
              secondary={removeHTMLTags(note.body.substring(0, 30)) + "..."}
              primary={note.title}
            ></ListItemText>
          </div>
          <IconButton onClick={() => this.deleteNote(note)}>
            <DeleteIcon className={classes.deleteIcon} />
          </IconButton>
        </ListItem>
      </div>
    );
  }
  deleteNote = (note) => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      this.props.deleteNote(note);
    }
  };
  selectNote = (note, index) => {
    this.props.selectNote(note, index);
    this.props.history.push("/note");
  };
}
export default withStyles(styles)(SidebarItem);
