import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import css from "../../styles/css/Modals.module.css";
import btnCSS from "../../styles/css/Buttons.module.css";
import { axiosReq } from "../../axios/axiosDefaults";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const [modalShow, setModalShow] = useState(false);

  const { setLoggedInUser } = useAuth();
  const navigate = useNavigate()

  const handleSignOut = async () => {
    /**
     * Makes a request to the logout endpoint and sets the
     * loggedInUser state to null, removes the locally stored
     * loggedInUser data, closes the modal, and navigates the
     * user to the home page with a success alert.
     */
    try {
      await axiosReq.post("/dj-rest-auth/logout/");
      setLoggedInUser(null);
      localStorage.removeItem("loggedInUser");
      setModalShow(false);
      navigate("/", {state: { success: "Successfully signed out!" }})
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <span className="d-lg-none" onClick={() => setModalShow(true)}>
        Sign out
      </span>
      <button
        className={`${btnCSS.Btn} ${btnCSS.SignOutBtn} ms-3 d-none d-lg-block`}
        title="sign out"
        onClick={() => setModalShow(true)}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
      </button>
      <Modal
        className="justify-content-center d-flex"
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className={css.Body}>
          <Modal.Header
            className={css.ModalHeader}
            closeButton
            closeVariant="white"
          >
            <Modal.Title id="contained-modal-title-vcenter">
              Are you sure you want to sign out?
            </Modal.Title>
          </Modal.Header>
          <Modal.Footer className={`${css.ModalFooter} justify-content-center`}>
            <Button className="btn btn-danger me-4" onClick={handleSignOut}>
              Sign out
            </Button>
            <Button
              className="btn btn-dark"
              onClick={() => setModalShow(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default SignOut;
