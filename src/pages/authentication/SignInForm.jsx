import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import FeatureImage from "../../assets/sign-in-feature-image.jpg";
import css from "../../styles/css/Auth.module.css";
import appCSS from "../../styles/css/App.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { signIn } from "../../utils/Utils";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState([]);
  const { username, password } = signInData;
  const navigate = useNavigate();
  const { setLoggedInUser } = useAuth();

  const handleChange = (e) => {
    setSignInData({
      ...signInData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(signInData, setLoggedInUser);
      navigate("/");
    } catch (error) {
      setFieldErrors(error.response?.data);
    }
  };

  return (
    <Container className={css.FormWrapper}>
      <div className={css.PageHeader}>
        <h1>Sign in to your account</h1>
      </div>
      <Row className={css.FormImageContainer}>
        <Col md={6}>
          <div className={css.FieldsContainer}>
            <p>
              If you don&#39;t already have an account, please{" "}
              <Link to={"/signup"} className={appCSS.SignInPrompt}>
                sign up
              </Link>
              .
            </p>
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
                {fieldErrors.password?.map((e, index) => (
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
                  className={`${css.FieldAlert} mb-2`}
                >
                  {e}
                </Alert>
              ))}

              <Button variant="primary" type="submit" className={css.SubmitBtn}>
                Sign in!
              </Button>
            </Form>
          </div>
        </Col>
        <Col className="d-none d-md-flex">
          <Image
            className={css.FeatureImage}
            src={FeatureImage}
            alt="Geometry pattern"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SignInForm;
