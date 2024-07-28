import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosReq, axiosRes } from "../../axios/axiosDefaults";
import Alert from "react-bootstrap/Alert";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/FormGroup";
import FormLabel from "react-bootstrap/FormLabel";
import Row from "react-bootstrap/Row";
import Avatar from "../../components/Avatar";
import formCSS from "../../styles/css/Forms.module.css";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const EditProfileForm = () => {
  const [profileData, setProfileData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [errors, setErrors] = useState([]);
  const { loggedInUser, setLoggedInUser } = useAuth();
  const { bio, image, name, receive_messages } = profileData;
  const imageUpload = useRef();
  const receiveMessagesCheckBox = useRef();
  const navigate = useNavigate();

  const id = loggedInUser?.pk;

  // Handles updating the state of the profile data when fields are modified.
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
      receive_messages: receiveMessagesCheckBox.current.checked,
    });
  };

  /**
   * Handles updating the preview image in case of choosing a new one.
   *
   * Saves the chosen file in previewImage instead since if a user
   * decides they don't want to change the picture, simply pressing
   * cancel in the file explorer window will reset it to null and instead
   * display the users current profile image in the preview again.
   *
   * On submission we can also use previewImage to check if the file input
   * has a file stored in it by checking whether or not previewImage is true.
   */
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
     * Only if previewImage is true will formData have the image field appended to it.
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
      const { data } = await axiosReq.put(
        `/profiles/${loggedInUser?.pk}/`,
        formData,
      );
      setLoggedInUser({
        ...loggedInUser,
        profile_image: data.image,
      });
      navigate(`/profile/${loggedInUser.pk}`);
    } catch (error) {
      console.log(error);
      setErrors(error.response?.data);
    }
  };

  useEffect(() => {
    setHasLoaded(false);
    const fetchProfile = async () => {
      try {
        const profile = await axiosRes.get(`/profiles/${id}`);
        setProfileData(profile.data);
        setHasLoaded(true);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchProfile();
  }, [id]);

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
                  <FormLabel className={formCSS.FormImage}>
                    <p className="mb-2">Tap to upload a new image!</p>
                    <Avatar
                      src={previewImage ? previewImage : image}
                      size={300}
                      alt="Change profile avatar"
                    />
                  </FormLabel>
                  <FormControl
                    className="d-none"
                    type="file"
                    accept="image/jpeg,image/png,image/bmp"
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
                {errors?.image?.map((err) => (
                  <Alert key={err} variant="warning">
                    {err}
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
        <Loader center />
      )}
    </Container>
  );
};

export default EditProfileForm;
