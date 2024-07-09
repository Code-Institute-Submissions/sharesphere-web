import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import css from "../styles/css/NavBar.module.css";
import "../styles/css/NavBar.css";
import { useAuth } from "../context/AuthContext";
import avatarCss from "../styles/css/Avatar.module.css"
import Avatar from "./Avatar";
import { Image } from "react-bootstrap";

const NavBar = () => {
  const { loggedInUser } = useAuth();

  return (
    <div>
      <Navbar expand="lg" className={css.NavBar} variant="dark">
        <Container>
          <Link to="/" className={css.NavBarBrand}>
            ShareSphere
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto NavLinks">
              <NavLink to="/" className={css.NavLink}>
                Home
              </NavLink>
              <NavLink to="/signin" className={css.NavLink}>
                Sign in
              </NavLink>
              <NavLink to="/signup" className={css.NavLink}>
                Sign up
              </NavLink>
              {console.log(loggedInUser)}

            </Nav>
            {loggedInUser ? (
                <div className="d-flex">
                  <Link to="/profile"><Avatar src={loggedInUser.profile_image} height={45}/></Link>
                </div>
              ) : (null)
              }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
