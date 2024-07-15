import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import css from "../../styles/css/ConfirmationModal.module.css";
import btnCSS from "../../styles/css/Buttons.module.css";
import formCSS from "../../styles/css/Forms.module.css";
import { axiosInstance } from "../../axios/axiosDefaults";

const CreateConversationForm = ({ owner, id, ...props }) => {
  const [formData, setFormData] = useState({
    receiver: id,
    topic: "",
    content: "",
  });

  const { topic, content } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post(`/messages/`, formData);
      setFormData({
        receiver: id,
        topic: "",
        content: "",
      });
      console.log("message sent", data);
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
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title id="contained-modal-title-vcenter">
            Start conversation with <b>{owner}</b>
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <FormGroup controlId="conversationTopic">
              <FormLabel className="sr-only">Conversation topic</FormLabel>
              <FormControl
                className={formCSS.FormInput}
                type="text"
                placeholder="Conversation topic"
                value={topic}
                name={"topic"}
                onChange={handleChange}
              ></FormControl>
            </FormGroup>
            <FormGroup className="mt-3 mb-3" controlId="conversationContent">
              <FormLabel className="sr-only">Conversation topic</FormLabel>
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
          <Modal.Footer>
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

export default CreateConversationForm;
