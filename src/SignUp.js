import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import { auth } from "./firebase";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

function SignUp(props) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const { email, password } = data;
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const signup = (e) => {
    e.preventDefault();
    console.log(data);
    if (email && password) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          console.log(authUser.user);
          localStorage.setItem("user", authUser.user.uid);
          props.history.push("/home");
          setData({
            email: "",
            password: "",
          });
          setOpen(!open);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("please fill in all fields");
    }
    setData({
      email: "",
      password: "",
    });
  };
  return (
    <div style={{ width: "80%", margin: "60px auto" }}>
      <h3>Signup</h3>
      <form onSubmit={signup}>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          type="email"
          name="email"
          label="Email"
          value={email}
          fullWidth
          onChange={handleChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          type="password"
          name="password"
          value={password}
          fullWidth
          onChange={handleChange}
        />
        <br />
        <br />
        <Button type="submit" color="primary" variant="contained">
          signup
        </Button>
      </form>

      <br />
      <Link to="/">Already have an account</Link>
    </div>
  );
}

export default SignUp;
