import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
import {
  Alert,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Row,
} from "react-bootstrap";
import formCSS from "../../styles/css/Forms.module.css";
import css from "../../styles/css/CreatePost.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Upload from "../../assets/upload-image-icon.png";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [errors, setErrors] = useState();

  const { title, content, image } = postData;
  const imageUpload = useRef();

  const handleImageChange = async (e) => {
    setPostData({
      ...postData,
      image: e.target.files[0],
    });
  };

  const handleChange = async (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axiosInstance.post("/posts/", postData);
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data);
    }
  };

  return (
    <Container className={css.PostForm}>
      <div>
        <h1 className="text-center mt-1">Create post</h1>
        <Form onSubmit={handleSubmit}>
          <div>
            <div className="mb-2 mt-2">
              <FormGroup controlId="postImage" className="text-center">
                <FormLabel className={formCSS.FormImage}>
                  {imageUpload.current?.files[0] ? (
                    <>
                      <Image
                        className={css.UploadPreview}
                        src={URL.createObjectURL(imageUpload.current?.files[0])}
                        alt="Chosen post image"
                      />
                      <p>Tap to change image</p>
                    </>
                  ) : (
                    <>
                      <Image
                        className={css.UploadIcon}
                        src={Upload}
                        alt="Upload"
                      />
                      <p>Tap to upload an image</p>
                    </>
                  )}
                </FormLabel>
                <FormControl
                  className="d-none"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={imageUpload}
                ></FormControl>
              </FormGroup>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label className="">Title</Form.Label>
                <Form.Control
                  className={formCSS.FormInput}
                  type="text"
                  placeholder="Post title"
                  value={title}
                  name={"title"}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="postContent">
                <Form.Label className="">Post content</Form.Label>
                <Form.Control
                  className={formCSS.FormInput}
                  as="textarea"
                  rows={5}
                  placeholder="Post content"
                  value={content}
                  name="content"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className={formCSS.SubmitWrapper}>
              {errors?.image?.map((e) => (
                <Alert key={e} variant="warning">
                  {e}
                </Alert>
              ))}
              <Button variant="success" type="submit">
                Create post
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default CreatePost;
