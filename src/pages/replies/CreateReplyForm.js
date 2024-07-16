import React, { useState } from "react";
import {
  Button,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import formCSS from "../../styles/css/Forms.module.css";
import { axiosInstance } from "../../axios/axiosDefaults";

const CreateReplyForm = ({ topic, id }) => {
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
    <Form
      className="d-flex flex-column align-items-center"
      onSubmit={handleSubmit}
    >
      <FormGroup
        className={`${formCSS.FullInput} px-3 my-2`}
        controlId="conversationContent"
      >
        <FormLabel className="sr-only">Content</FormLabel>
        <FormControl
          className={formCSS.FormInput}
          as="textarea"
          rows={3}
          placeholder="Message"
          value={content}
          name={"content"}
          onChange={handleChange}
        ></FormControl>
      </FormGroup>
      <Button type="submit" variant="success">
        Add reply <i className="fa-regular fa-paper-plane"></i>
      </Button>
    </Form>
  );
};

export default CreateReplyForm;
