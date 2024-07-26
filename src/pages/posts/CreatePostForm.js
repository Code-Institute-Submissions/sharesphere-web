import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosRes } from "../../axios/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Image from "react-bootstrap/Image";
import css from "../../styles/css/Forms.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Upload from "../../assets/upload-image-icon.png";

const CreatePostForm = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
  });
  const [errors, setErrors] = useState();

  const { title, content, image } = postData;
  const imageUpload = useRef();
  const navigate = useNavigate();

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
      const { data } = await axiosRes.post("/posts/", postData);
      navigate(`/post/${data.id}`);
    } catch (error) {
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
                <FormLabel className={css.FormImage}>
                  {imageUpload.current?.files[0] ? (
                    /**
                     * Updates preview image based on if an image file
                     * has been chosen or not.
                     */
                    <>
                      <Image
                        className={css.UploadPreview}
                        src={URL.createObjectURL(image)}
                        alt="Chosen post image"
                      />
                      <div>Tap to change image</div>
                    </>
                  ) : (
                    <>
                      <Image
                        className={css.UploadIcon}
                        src={Upload}
                        alt="Choose file"
                      />
                      <div>Tap to upload an image</div>
                    </>
                  )}
                </FormLabel>
                <FormControl
                  className="d-none"
                  type="file"
                  accept="image/jpeg,image/png,image/bmp"
                  onChange={handleImageChange}
                  ref={imageUpload}
                ></FormControl>
                {errors?.image?.map((err) => (
                  <Alert key={err} variant="warning">
                    {err}
                  </Alert>
                ))}
              </FormGroup>
            </div>
            <div>
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label className="sr-only">Title</Form.Label>
                <Form.Control
                  className={css.FormInput}
                  type="text"
                  placeholder="Post title"
                  value={title}
                  name={"title"}
                  onChange={handleChange}
                />
                {errors?.title?.map((err) => (
                  <Alert key={err} variant="warning" className="mt-2">
                    {err}
                  </Alert>
                ))}
              </Form.Group>

              <Form.Group className="mb-3" controlId="postContent">
                <Form.Label className="sr-only">Post content</Form.Label>
                <Form.Control
                  className={css.FormInput}
                  as="textarea"
                  rows={5}
                  placeholder="Post content"
                  value={content}
                  name="content"
                  onChange={handleChange}
                />
              </Form.Group>
            </div>

            <div className={css.SubmitWrapper}>
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

export default CreatePostForm;
