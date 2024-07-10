import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
import {
  Alert,
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import Avatar from "../../components/Avatar";
import formCSS from "../../styles/css/Forms.module.css";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { bio, image, name, receive_messages } = profileData;
  const imageUpload = useRef();
  const receiveMessagesCheckBox = useRef();
  const navigate = useNavigate();

  // Handles updating the state of the profile data when fields are modified
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
      receive_messages: receiveMessagesCheckBox.current.checked,
    });
  };

  // Handles updating the preview image in case of choosing a new one
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    /**
     * Creates a FormData object with the data of the fields for the put request
     * An image is only added to the payload if a file is actually chosen
     *
     * On successful put request updates the loggedInUser context to contain the
     * updated profile image and redirects user to their updated profile
     *
     * If the form submission isn't valid save the response and diplay an error field
     */
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("receive_messages", receive_messages);

    if (previewImage) {
      formData.append("image", imageUpload.current.files[0]);
    }

    try {
      const { data } = await axiosInstance.put(
        `/profiles/${loggedInUser?.pk}/`,
        formData
      );
      setLoggedInUser({
        ...loggedInUser,
        profile_image: data.image,
      });
      navigate(`/profile/${loggedInUser.pk}`);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  useEffect(() => {
    setHasLoaded(false);
    if (loggedInUser) {
      const fetchProfile = async () => {
        try {
          const profile = await axiosInstance.get(
            `/profiles/${loggedInUser.pk}`
          );
          setProfileData(profile.data);
          setHasLoaded(true);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProfile();
    }
  }, [loggedInUser]);

  return (
    <Container>
      {hasLoaded ? (
        <div>
          <h1 className="text-center mt-1">Edit profile</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="">Name</Form.Label>
                  <Form.Control
                    className={formCSS.FormInput}
                    type="text"
                    placeholder="Name"
                    value={name}
                    name={"name"}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="bio">
                  <Form.Label className="">Profile bio</Form.Label>
                  <Form.Control
                    className={formCSS.FormInput}
                    as="textarea"
                    rows={8}
                    placeholder="Bio"
                    value={bio}
                    name="bio"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md="6" className="mb-3">
                <FormGroup controlId="profile_image" className="text-center">
                  <FormLabel>
                    <p className="mb-2">Tap to upload a new image!</p>
                    <Avatar
                      src={previewImage ? previewImage : image}
                      height={300}
                      alt="Change profile avatar"
                    />
                  </FormLabel>
                  <FormControl
                    className="d-none"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={imageUpload}
                  ></FormControl>
                </FormGroup>
              </Col>
              <Col className={formCSS.SubmitWrapper}>
                <Form.Group className="mb-4" controlId="receiveMessages">
                  <Form.Check
                    type="checkbox"
                    label="Receive messages from other users"
                    ref={receiveMessagesCheckBox}
                    defaultChecked={receive_messages}
                    onChange={handleChange}
                  />
                </Form.Group>
                {errors?.image?.map((e) => (
                  <Alert key={e} variant="warning">
                    {e}
                  </Alert>
                ))}
                <Button variant="primary" type="submit">
                  Update profile
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default EditProfile;
