import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  ListItem,
  Collapse,
  List,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import BookIcon from "@material-ui/icons/Book";
import SidebarItem from "../sidebarItem/SidebarItem";
import { useHistory } from "react-router-dom";
function Notebook(props) {
  const history = useHistory();
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);
  const { id, name, selectedNoteIndex } = props.notebook;
  useEffect(() => {
    db.collection("notebooks")
      .doc(id)
      .onSnapshot((snapshot) => {
        //console.log(snapshot.data());
        setNotes(snapshot.data().notes);
      });
  }, [id]);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary={name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {notes.map((note, index) => (
            <div className="list" key={index}>
              <SidebarItem
                note={note}
                index={index}
                selectedNoteIndex={selectedNoteIndex}
                selectNote={props.selectNote}
                deleteNote={props.deleteNote}
                history={history}
              />
            </div>
          ))}
        </List>
      </Collapse>
    </>
  );
}

export default Notebook;
