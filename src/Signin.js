import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

import { auth } from "./firebase";
import { Link } from "react-router-dom";

function Signin(props) {
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

    if (email && password) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then((authUser) => {
          localStorage.setItem("user", authUser.user.uid);
          props.history.push("/home");
          setData({
            email: "",
            password: "",
          });
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("please fill in all fields");
    }
  };
  return (
    <div style={{ width: "80%", margin: "60px auto" }}>
      <div>
        <h3>Signin</h3>
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
          <Button type="submit" color="primary" variant="outlined">
            signin
          </Button>
        </form>
        <br />
        <Link to="/signup">Dont have an account? SignUp</Link>
      </div>
    </div>
  );
}

export default Signin;
