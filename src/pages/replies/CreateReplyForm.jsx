import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import formCSS from "../../styles/css/Forms.module.css";
import { axiosRes } from "../../axios/axiosDefaults";

const CreateReplyForm = ({ id, setReplies, setRepliesCount }) => {
  const [formData, setFormData] = useState({
    message: id,
    content: "",
  });
  const [errors, setErrors] = useState();
  const [posting, setPosting] = useState(false);

  const { content } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    /**
     * Posts a new reply given content input is provided.
     * Updates reply count, removes any error fields and
     * empties the form on sumbission.
     *
     * Prevent post requests being attempted a request is
     * already being made.
     *
     * setErros to display alerts if form is bad.
     */
    e.preventDefault();
    if (!posting) {
      try {
        setPosting(true);
        const { data } = await axiosRes.post(`/replies/`, formData);
        setReplies((prevReplies) => ({
          ...prevReplies,
          results: [data, ...prevReplies.results],
        }));
        setRepliesCount((prevCount) => prevCount + 1);
        setErrors(null);
        setFormData({
          message: id,
          content: "",
        });
        setPosting(false);
      } catch (error) {
        setErrors(error.response.data);
        setPosting(false);
      }
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
        {errors?.content?.map((err) => (
          <Alert key={err} className="mt-1" variant="warning">
            {err}
          </Alert>
        ))}
      </FormGroup>
      <Button type="submit" variant="success">
        Add reply <i className="fa-regular fa-paper-plane"></i>
      </Button>
    </Form>
  );
};

export default CreateReplyForm;
