import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../redux/slices/userSlice";
import { useHistory } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const Auth = () => { 
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login());
    history.push("/");

    // ----i don't have api for this logic----
    // try {
    //   const response = await fetch("https://yourbackend.com/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });
    //   const data = await response.json();

    //   dispatch(login({ email: data.email, name: data.name }));
    // } catch (error) {
    //   console.error("Login failed:", error);
    // }
  };

  const handleLogout = () => {
    dispatch(logout());
    history.push("/");
  };

  return (
    <Container>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Login
        </Button>
        <Button variant='secondary' onClick={handleLogout}>
          Logout
        </Button>
      </Form>
    </Container>
  );
};

export default Auth;
