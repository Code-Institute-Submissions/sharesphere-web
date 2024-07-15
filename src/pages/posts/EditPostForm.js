import React, { useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import postCSS from "../../styles/css/Posts.module.css";
import formCSS from "../../styles/css/Forms.module.css";
import dropdownCSS from "../../styles/css/EditDropdown.module.css";
import Avatar from "../../components/Avatar";

const EditPostForm = ({
  postData,
  handleEdit,
  toggleEdit,
  newPostData,
  setNewPostData,
}) => {
  const [originalImage] = useState(postData.image);
  const [previewImage, setPreviewImage] = useState(null);
  const { title, content } = newPostData;
  const {
    owner,
    profile_image,
    likes_count,
    comments_count,
    created_at,
    updated_at,
  } = postData;

  const [errors, setErrors] = useState();

  const imageUpload = useRef();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setNewPostData({
      ...newPostData,
      image: file,
    });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChange = async (e) => {
    setNewPostData({
      ...newPostData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Form className="text-center" onSubmit={handleEdit}>
        <div className={postCSS.PostImg}>
          <FormGroup controlId="postImage" className="text-center">
            <FormLabel className={formCSS.FormImage}>
              <Image
                className={formCSS.UploadPreview}
                // Update preview image based on file input
                src={
                  imageUpload.current?.files[0] ? previewImage : originalImage
                }
                alt="Chosen post image"
              />
              <div>Tap to change image!</div>
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

        <div className={postCSS.CardHeader}>
          <div className={postCSS.OwnerLink}>
            <Avatar src={profile_image} size={30} alt="Post owner" />

            <div className="ms-1">
              <span>{owner}</span>
            </div>

            <div className={postCSS.PostTime}>
              <span className="ms-1 me-1">·</span>

              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">Updated: {updated_at}</Tooltip>
                }
              >
                <span className="d-inline-block">
                  <span>{created_at}</span>
                </span>
              </OverlayTrigger>
            </div>
          </div>
          <i
            className={`fa-solid fa-xmark ${dropdownCSS.ToggleIcon}`}
            onClick={toggleEdit}
          ></i>
        </div>

        <hr className={postCSS.ContentSeparator} />

        <Card.Body className="text-center">
          <Card.Title>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label className="sr-only">Title</Form.Label>
              <Form.Control
                className={formCSS.FormInput}
                type="text"
                placeholder="Post title"
                value={title}
                name={"title"}
                onChange={handleChange}
                maxLength={50}
              />
              {errors?.title?.map((err) => (
                <Alert key={err} variant="warning" className="mt-2">
                  {err}
                </Alert>
              ))}
            </Form.Group>
          </Card.Title>

          <Card.Text as={"div"}>
            <Form.Group className="mb-3" controlId="postContent">
              <Form.Label className="sr-only">Post content</Form.Label>
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
          </Card.Text>
        </Card.Body>
        <Button className="mb-3" type="submit" variant="primary">
          Update post! <i className="fa-solid fa-pencil"></i>
        </Button>
      </Form>

      <div className={postCSS.PostStats}>
        <span>
          <i className={`fa-regular fa-heart me-1 ${postCSS.Likes}`}></i>
          {likes_count}
        </span>
        <span>
          <i className={`fa-regular fa-comments me-1 ${postCSS.Comments}`}></i>
          {comments_count}
        </span>
      </div>
    </>
  );
};

export default EditPostForm;
