import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Modal from "react-bootstrap/Modal";
import css from "../../styles/css/Modals.module.css";
import formCSS from "../../styles/css/Forms.module.css";
import { axiosRes } from "../../axios/axiosDefaults";
import { useLocation, useNavigate } from "react-router-dom";

const CreateConversationForm = ({ owner, id, setModalShow, ...props }) => {
  const [formData, setFormData] = useState({
    receiver: id,
    topic: "",
    content: "",
  });
  const [errors, setErrors] = useState();
  const [posting, setPosting] = useState(false);

  const { topic, content } = formData;
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    /**
     * Posts a new conversation given topic and
     * content input is provided.
     * Nullifies any previous errors and closes the
     * modal.
     *
     * setErrors in case of a failed request to display
     * in alert fields for each field.
     */
    e.preventDefault();
    if (!posting) {
      try {
        setPosting(true);
        await axiosRes.post(`/messages/`, formData);
        setFormData({
          receiver: id,
          topic: "",
          content: "",
        });
        setErrors(null);
        setModalShow(false);
        navigate(location.pathname, {
          replace: true,
          state: { success: "Conversation successfully started!" },
        });
        setPosting(false);
      } catch (error) {
        setPosting(false);
        setErrors(error.response.data);
      }
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
        <Modal.Header
          className={css.ModalHeader}
          closeButton
          closeVariant="white"
        >
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
                maxLength={40}
              ></FormControl>
              {errors?.topic?.map((err) => (
                <Alert key={err} className="mt-1" variant="warning">
                  {err}
                </Alert>
              ))}
            </FormGroup>
            <FormGroup className="mt-3 mb-3" controlId="conversationContent">
              <FormLabel className="sr-only">Conversation content</FormLabel>
              <FormControl
                className={formCSS.FormInput}
                as="textarea"
                rows={4}
                placeholder="Message"
                value={content}
                name={"content"}
                onChange={handleChange}
              ></FormControl>
              {errors?.content?.map((err) => (
                <Alert key={err} className="mt-1" variant="warning">
                  {err}
                </Alert>
              ))}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer className={css.ModalFooter}>
            <Button type="submit" variant="success">
              Start conversation
            </Button>
            <Button onClick={props.onHide}>Cancel</Button>
          </Modal.Footer>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateConversationForm;
