import React, { useState } from "react";
import { Form, FormGroup, FormLabel } from "react-bootstrap";

const CreateComment = () => {
  const [comment, setComment] = useState("");

  return (
    <Form>
      <FormGroup controlId="comment">
        <FormLabel>
          <Form.Control
            className=""
            type="text"
            placeholder="Leave a comment!"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></Form.Control>
        </FormLabel>
      </FormGroup>
    </Form>
  );
};

export default CreateComment;
