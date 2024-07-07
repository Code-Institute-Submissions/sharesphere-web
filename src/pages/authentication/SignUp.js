import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import css from "../../styles/css/SignUp.module.css";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const {username, password1, password2} = signUpData

  return (
    <Container className={css.FormWrapper}>
      <Row className="flex-grow-1">
        <Col md="6">
          <Form className={css.Form}>
            <Form.Group className="mb-4" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control type="text" placeholder="Username" value={username} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password1} />
            </Form.Group>

            <Form.Group className="mb-4" controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control type="password" placeholder="Confirm password" value={password2} />
            </Form.Group>

            <Button variant="success" type="submit">
              Sign up!
            </Button>
          </Form>
        </Col>
        <Col className="d-none d-md-flex">
          <p>Image placeholder</p>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
