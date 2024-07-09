import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
import { Col, Container, Row } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import css from "../../styles/css/ProfilePage.module.css";
import Loader from "../../components/Loader";

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
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
      const profile = await axiosInstance.get(`/profiles/${id}`);
      setProfileData(profile.data);
      setHasLoaded(true);
    };
    fetchProfile();
  }, [id]);

  return (
    <Container>
      {hasLoaded ? (
        <Row>
          <Col xs="12" className={css.Header}>
            {console.log(profileData)}
            <Avatar src={image} height={240} alt={`${owner}'s avatar`} />
            <div className="d-flex align-items-end">
              <h1 className="mt-2">{owner}</h1>
              <div className={css.ActionWrapper}>
                {is_owner ? (
                  <Link to="/profile/edit" aria-labelledby="Edit profile">
                    <i
                      className={`fa-regular fa-pen-to-square ${css.Action}`}
                    ></i>
                  </Link>
                ) : (
                  <Link to={`/profile/${id}/message`} aria-labelledby="Message user">
                    <i
                      className={`fa-regular fa-envelope-open ${css.Action}`}
                    ></i>
                  </Link>
                )}
              </div>
            </div>
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
        <Loader />
      )}
    </Container>
  );
};

export default ProfilePage;
