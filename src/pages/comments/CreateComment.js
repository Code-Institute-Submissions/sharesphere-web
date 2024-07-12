import React, { useState } from "react";
import { Button, Form, FormGroup, FormLabel } from "react-bootstrap";
import { axiosInstance } from "../../axios/axiosDefaults";

const CreateComment = (props) => {
  const [comment, setComment] = useState({
    post: props.post,
    content: "",
  });
  const { content } = comment;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/comments/", comment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup controlId="comment">
        <FormLabel>
          <Form.Control
            className=""
            type="text"
            placeholder="Leave a comment!"
            value={content}
            onChange={(e) => {
              setComment({
                ...comment,
                content: e.target.value,
              });
            }}
          ></Form.Control>
        </FormLabel>
      </FormGroup>
      <Button type="submit" variant="success">
        Comment!
      </Button>
    </Form>
  );
};

export default CreateComment;
