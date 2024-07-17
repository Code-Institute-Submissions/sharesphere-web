import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import css from "../../styles/css/Modals.module.css"
import btnCSS from "../../styles/css/Buttons.module.css"

const SignOut = ({ ...props }) => {
  const [modalShow, setModalShow] = useState(false)

  const handleSignOut = async () => {

  }

  return (
    <>
    <button className={`${btnCSS.Btn} ${btnCSS.SignOutBtn} ms-3`} title='sign out' onClick={() => setModalShow(true)}><i className="fa-solid fa-right-from-bracket"></i></button>
    <Modal
      className="justify-content-center d-flex"
      show={modalShow}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={css.Body}>
        <Modal.Header className={css.ModalHeader} closeButton closeVariant="white">
          <Modal.Title id="contained-modal-title-vcenter">
            Are you sure you want to sign out?
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer className={`${css.ModalFooter} justify-content-center`}>
          <Button className="btn btn-danger me-4" onClick={handleSignOut}>
            Sign out
          </Button>
          <Button className="btn btn-dark" onClick={() => setModalShow(false)}>Cancel</Button>
        </Modal.Footer>
      </div>
    </Modal>
    </>
  );
}

export default SignOut