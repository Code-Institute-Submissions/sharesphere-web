import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
import {
  Col,
  Container,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import Avatar from "../../components/Avatar";
import css from "../../styles/css/EditProfile.module.css";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { owner, bio, image, is_owner, name, receive_messages } = profileData;
  const imageUpload = useRef();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("bio", bio);

    if (previewImage) {
      formData.append("image", imageUpload.current.files[0]);
    }

    const { data } = await axiosInstance.put(
      `/profiles/${loggedInUser?.pk}/`,
      formData
    );
    setLoggedInUser({
      ...loggedInUser,
      profile_image: data.image,
    });
    navigate(`/profile/${loggedInUser.pk}`);
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
          <h1 className="text-center">Edit profile</h1>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md="6">
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label className="">Name</Form.Label>
                  <Form.Control
                    className={css.FormInput}
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
                    className={css.FormInput}
                    as="textarea"
                    rows={8}
                    placeholder="Bio"
                    value={bio}
                    name="bio"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md="6">
                <FormGroup controlId="profile_image">
                  <FormLabel>
                    <Avatar
                      src={previewImage ? previewImage : image}
                      height={300}
                      alt="Change profile avatar"
                    />
                  </FormLabel>
                  <FormControl
                    className=""
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={imageUpload}
                  ></FormControl>
                </FormGroup>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="receiveMessages">
              <Form.Check
                type="checkbox"
                label="Receive messages from other users"
                value={receive_messages}
                name="receive_messages"
                onChange={handleChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update profile
            </Button>
          </Form>
        </div>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default EditProfile;
