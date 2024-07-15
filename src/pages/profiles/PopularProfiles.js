import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../axios/axiosDefaults";
import Loader from "../../components/Loader";
import { Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "../../components/Avatar";
import css from "../../styles/css/PopularProfiles.module.css";
import { Link } from "react-router-dom";
import { followHelper, unfollowHelper } from "../../utils/FollowHelper";

const PopularProfiles = () => {
  const [popularProfiles, setPopularProfiles] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);

  const fetchProfiles = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/profiles/?ordering=-post_count`
      );
      setPopularProfiles({ results: data.results });
      setHasLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div>
      <Card className={css.ProfilesContainer}>
        <h1>Most contributions!</h1>
        {hasLoaded ? (
          <>
            {popularProfiles.results.map((profile) => (
              <div key={profile.id} className={css.ProfileCard}>
                <OverlayTrigger overlay={<Tooltip>{profile.owner}</Tooltip>}>
                  <div className={css.ProfileInfo}>
                    <Link to={`/profile/${profile.id}`}>
                      <Avatar
                        size={35}
                        src={profile.image}
                        alt={`${profile.owner}'s profile`}
                      />
                    </Link>

                    <div>
                      <span className="ms-2">·</span>
                      <span className="ms-1">{profile.post_count} posts</span>
                    </div>
                  </div>
                </OverlayTrigger>
                {!profile.following_id ? (
                  <button
                    className={`${css.FollowBtn}`}
                    type="button"
                    onClick={() => followHelper(profile.id)}
                  >
                    Follow
                  </button>
                ) : (
                  <button
                    className={`${css.UnfollowBtn}`}
                    type="button"
                    onClick={() => unfollowHelper(profile.id)}
                  >
                    Unfollow
                  </button>
                )}
              </div>
            ))}
          </>
        ) : (
          <Loader />
        )}
      </Card>
    </div>
  );
};

export default PopularProfiles;
