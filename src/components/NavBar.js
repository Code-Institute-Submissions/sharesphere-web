import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import css from "../styles/css/NavBar.module.css";
import "../styles/css/NavBar.css";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

const NavBar = () => {
  const { loggedInUser } = useAuth();

  const loggedInNav = (
    <>
      <NavLink to={"/following"} className={css.NavLink}>
        Following
      </NavLink>
      <NavLink to={"/likes"} className={css.NavLink}>
        Likes
      </NavLink>
      <NavLink to={"/post/create"} className={css.NavLink}>
        Create post
      </NavLink>
      <NavLink
        to={`/profile/${loggedInUser?.pk}`}
        className={`${css.NavLink} d-lg-none`}
      >
        Profile
      </NavLink>
      <NavLink to={`/conversations`} className={css.NavLink}>
        Conversations
      </NavLink>
    </>
  );

  const loggedOutNav = (
    <>
      <NavLink to="/signin" className={css.NavLink}>
        Sign in
      </NavLink>
      <NavLink to="/signup" className={css.NavLink}>
        Sign up
      </NavLink>
    </>
  );

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
              {loggedInUser ? loggedInNav : loggedOutNav}
            </Nav>
            {loggedInUser ? (
              <div className="d-lg-flex d-none">
                <Link to={`/profile/${loggedInUser.pk}`}>
                  <Avatar
                    src={loggedInUser.profile_image}
                    size={50}
                    alt="Your avatar"
                  />
                </Link>
              </div>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
