import React, { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import css from "../../styles/css/SignUp.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const [fieldErrors, setFieldErrors] = useState([]);
  const { username, password1, password2 } = signUpData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      navigate(-1);
    } catch (error) {
      setFieldErrors(error.response?.data);
    }
  };

  return (
    <Container className={css.FormWrapper}>
      <Row className="flex-grow-1">
        <Col md="6">
          <Form className={css.Form} onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="username">
              <Form.Label className="d-none">Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleChange}
                name="username"
              />
              {fieldErrors.username?.map((e, index) => (
                <Alert
                  key={`${e}-${index}`}
                  variant="warning"
                  className={css.FieldAlert}
                >
                  {e}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group className="mb-4" controlId="password1">
              <Form.Label className="d-none">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password1}
                onChange={handleChange}
                name="password1"
              />
              {fieldErrors.password1?.map((e, index) => (
                <Alert
                  key={`${e}-${index}`}
                  variant="warning"
                  className={css.FieldAlert}
                >
                  {e}
                </Alert>
              ))}
            </Form.Group>

            <Form.Group className="mb-4" controlId="password2">
              <Form.Label className="d-none">Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={password2}
                onChange={handleChange}
                name="password2"
              />
              {fieldErrors.password2?.map((e, index) => (
                <Alert
                  key={`${e}-${index}`}
                  variant="warning"
                  className={css.FieldAlert}
                >
                  {e}
                </Alert>
              ))}
            </Form.Group>
            {fieldErrors.non_field_errors?.map((e, index) => (
              <Alert
                key={`${e}-${index}`}
                variant="warning"
                className={css.FieldAlert}
              >
                {e}
              </Alert>
            ))}

            <Button variant="success" type="submit" className="mt-3">
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
