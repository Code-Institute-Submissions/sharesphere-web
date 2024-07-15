import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Col, Container, Row } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import css from "../../styles/css/ProfilePage.module.css";
import btnCSS from "../../styles/css/Buttons.module.css";
import Loader from "../../components/Loader";
import { followHelper, unfollowHelper } from "../../utils/FollowHelper";
import CreateConversationForm from "../conversations/CreateConversationForm";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const [modalShow, setModalShow] = useState(false)
  const { id } = useParams();
  const {
    owner,
    bio,
    created_at,
    followers_count,
    following_count,
    following_id,
    image,
    is_owner,
    name,
    post_count,
    receive_messages,
  } = profileData;

  useEffect(() => {
    setHasLoaded(false);
    const fetchProfile = async () => {
      const {data} = await axiosInstance.get(`/profiles/${id}`);
      setProfileData(data);
      setHasLoaded(true);
    };
    fetchProfile();
  }, [id]);

  const handleFollow = async () => {
    /**
     * Makes a follow request using the imported
     * followHelper function and updates the profile
     * state's following id and count if successful.
     */
    try {
      const data = await followHelper(id);
      setProfileData((prevProfile) => ({
        ...prevProfile,
        following_id: data.id,
        followers_count: prevProfile.followers_count + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    /**
     * Makes an unfollow request using the imported
     * unfollowHelper function and updates the profile
     * state's following id and count if successful.
     */
    try {
      await unfollowHelper(following_id);
      setProfileData((prevProfile) => ({
        ...prevProfile,
        following_id: null,
        followers_count: prevProfile.followers_count - 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {console.log(profileData)}
      {hasLoaded ? (
        <Row>
          <Col xs="12" className={css.Header}>
            <Avatar src={image} size={240} alt={`${owner}'s avatar`} />
            <div className="d-flex align-items-end">
              <h1 className="mt-2">{owner}</h1>
              <div className={css.ActionWrapper}>
                {is_owner && (
                  <Link to="/profile/edit" aria-labelledby="Edit profile">
                    <i
                      className={`fa-regular fa-pen-to-square ${css.Action}`}
                    ></i>
                  </Link>
                )}
                {!is_owner && receive_messages && (
                  <button
                  className={btnCSS.Btn}
                    type="button"
                    aria-label="Message user"
                    onClick={() => setModalShow(true)}
                  >
                    <i
                      className={`fa-regular fa-envelope-open ${css.Action}`}
                    ></i>
                  </button>
                )}
              </div>
            </div>
            {!following_id && !is_owner && (
              <button
                className={`${btnCSS.FollowBtn}`}
                type="button"
                onClick={() => handleFollow(id)}
              >
                Follow
              </button>
            )}
            {following_id && !is_owner && (
              <button
                className={`${btnCSS.UnfollowBtn}`}
                type="button"
                onClick={() => handleUnfollow(following_id)}
              >
                Unfollow
              </button>
            )}

            <p>{bio} </p>
            <div className={css.Info}>
              <p>
                {name ? (
                  <span>
                    <i className="fa-regular fa-user"></i> {name}
                  </span>
                ) : (
                  ""
                )}
                {"  "}
                <span>
                  <i className="fa-regular fa-calendar"></i> Joined:{" "}
                  {created_at}
                </span>
              </p>
            </div>
          </Col>
          <div className={css.Stats}>
            <Col xs="4" md="3">
              <p>Followers</p>
              <p>{followers_count}</p>
            </Col>
            <Col xs="4" md="3">
              <p>Following</p>
              <p>{following_count}</p>
            </Col>
            <Col xs="4" md="3">
              <p>Posts</p>
              <p>{post_count}</p>
            </Col>
          </div>
        </Row>
      ) : (
        <Loader center />
      )}
      <CreateConversationForm show={modalShow} onHide={() => setModalShow(false)} owner={owner} id={id} />
    </Container>
  );
};

export default ProfilePage;
