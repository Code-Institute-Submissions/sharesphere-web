import React, { useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import css from "../../styles/css/SignUpForm.module.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState([]);
  const { username, password } = signInData;
  const navigate = useNavigate();
  const { setLoggedInUser } = useAuth()

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post("/dj-rest-auth/login/", signInData);
      setLoggedInUser(data.data.user)
      navigate("/");
    } catch (error) {
      setFieldErrors(error.response?.data);
    }
  };

  return (
    <Container className={css.FormWrapper}>
      <Row className="flex-grow-1">
        <Col xs="12" className={css.PageHeader}>
          <h1>Sign in to your account</h1>
          <p>
            If you don't already have an account, please{" "}
            <Link to={"/signup"} className="text-decoration-none">
              sign up
            </Link>
            .
          </p>
        </Col>
        <Col md="6">
          <Form className={css.Form} onSubmit={handleSubmit}>
            <Form.Group className="mb-4" controlId="username">
              <Form.Label className="sr-only">Username</Form.Label>
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

            <Form.Group className="mb-4" controlId="password">
              <Form.Label className="sr-only">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handleChange}
                name="password"
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
            {fieldErrors.non_field_errors?.map((e, index) => (
              <Alert
                key={`${e}-${index}`}
                variant="warning"
                className={css.FieldAlert}
              >
                {e}
              </Alert>
            ))}

            <Button variant="primary" type="submit" className="mt-3">
              Sign in!
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

export default SignInForm;
