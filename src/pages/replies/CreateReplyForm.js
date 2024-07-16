import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import css from "../../styles/css/Modals.module.css";
import btnCSS from "../../styles/css/Buttons.module.css";
import formCSS from "../../styles/css/Forms.module.css";
import { axiosInstance } from "../../axios/axiosDefaults";

const CreateReplyForm = ({ topic, id, ...props }) => {
  const [formData, setFormData] = useState({
    message: id,
    content: "",
  });

  const { content } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(`/replies/`, formData);
      setFormData({
        message: id,
        content: "",
      });
      console.log("reply sent", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div className={css.Body}>
        <Modal.Header className={css.ModalHeader} closeButton closeVariant="white">
          <Modal.Title id="contained-modal-title-vcenter">
            Reply to <b>{topic}</b>
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <FormGroup className="mt-3 mb-3" controlId="conversationContent">
              <FormLabel className="sr-only">Content</FormLabel>
              <FormControl
                className={formCSS.FormInput}
                as="textarea"
                rows={4}
                placeholder="Message"
                value={content}
                name={"content"}
                onChange={handleChange}
              ></FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer className={css.ModalFooter}>
            <Button type="submit" variant="success" onClick={props.onHide}>
              Send message
            </Button>
            <Button onClick={props.onHide}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateReplyForm;
