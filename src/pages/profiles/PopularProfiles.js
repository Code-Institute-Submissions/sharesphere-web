import React, { useEffect, useState } from "react";
import { axiosReq } from "../../axios/axiosDefaults";
import Loader from "../../components/Loader";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "../../components/Avatar";
import css from "../../styles/css/PopularProfiles.module.css";
import btnCSS from "../../styles/css/Buttons.module.css";
import { Link } from "react-router-dom";
import { followHelper, unfollowHelper } from "../../utils/Utils";
import { useAuth } from "../../context/AuthContext";

const PopularProfiles = () => {
  const [popularProfiles, setPopularProfiles] = useState({});
  const [hasLoaded, setHasLoaded] = useState(false);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get(`/profiles/?ordering=-post_count`);
        setPopularProfiles(data.results.slice(0, 10));
        setHasLoaded(true);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchProfiles();
  }, []);

  const handleFollow = async (id) => {
    /**
     * Makes a follow request using the imported
     * followHelper function and loops through the
     * popularProfiles state to update corresponding
     * profile following_id.
     */
    try {
      const data = await followHelper(id);
      setPopularProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.id === id ? { ...profile, following_id: data.id } : profile,
        ),
      );
    } catch (error) {
      // console.log(error);
    }
  };

  const handleUnfollow = async (following_id) => {
    /**
     * Makes an unfollow request using the imported
     * unfollowHelper function and loops through the
     * popularProfiles state to update corresponding
     * profile following_id.
     */
    try {
      await unfollowHelper(following_id);
      setPopularProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile.following_id === following_id
            ? { ...profile, following_id: null }
            : profile,
        ),
      );
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div>
      <Card className={css.PopularContainer}>
        <h2 className={css.PopularHeading}>Most active posters!</h2>
        <div className={css.ProfilesContainer}>
          {hasLoaded ? (
            <>
              {popularProfiles.map((profile) => (
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
                  {!profile.following_id &&
                    !profile.is_owner &&
                    loggedInUser && (
                      <button
                        className={`${btnCSS.FollowBtn}`}
                        type="button"
                        onClick={() => handleFollow(profile.id)}
                      >
                        Follow
                      </button>
                    )}
                  {profile.following_id &&
                    !profile.is_owner &&
                    loggedInUser && (
                      <button
                        className={`${btnCSS.UnfollowBtn}`}
                        type="button"
                        onClick={() => handleUnfollow(profile.following_id)}
                      >
                        Unfollow
                      </button>
                    )}
                </div>
              ))}
            </>
          ) : (
            <div className="mx-auto">
              <Loader />
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PopularProfiles;
