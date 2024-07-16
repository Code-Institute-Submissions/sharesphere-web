import React, { useRef, useState } from "react";
import { Card, Overlay, OverlayTrigger, Tooltip } from "react-bootstrap";
import css from "../../styles/css/Posts.module.css";
import appCSS from "../../styles/css/App.module.css";
import btnCSS from "../../styles/css/Buttons.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosInstance } from "../../axios/axiosDefaults";
import { useAuth } from "../../context/AuthContext";
import Comment from "../comments/Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNext } from "../../utils/FetchNext";
import Loader from "../../components/Loader";
import CreateComment from "../comments/CreateComment";
import { EditDropdown } from "../../components/EditDropdown";
import ConfirmationModal from "../../components/ConfirmationModal";
import EditPostForm from "./EditPostForm";

const Post = ({ post, setPosts, comments, setComments }) => {
  const [postData, setPostData] = useState(post);
  const [newPostData, setNewPostData] = useState({
    title: post.title,
    content: post.content,
    image: null,
  });
  const {
    title,
    content,
    image,
    id,
    owner,
    is_owner,
    profile_id,
    profile_image,
    likes_count,
    like_id,
    comments_count,
    created_at,
    updated_at,
  } = postData;

  const [like, setLike] = useState(like_id);
  const [likeCount, setLikeCount] = useState(likes_count);
  const [commentCount, setCommentCount] = useState(comments_count);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editToggled, setEditToggled] = useState(false);

  const target = useRef(null);
  const { loggedInUser } = useAuth();

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/likes/", { post: id });
      setLikeCount(likeCount + 1);
      setLike(data.id);
    } catch (error) {
      console.log("Error when liking", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlike = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await axiosInstance.delete(`likes/${like}`);
      setLikeCount(likeCount - 1);
      setLike(null);
    } catch (error) {
      console.log("Error when unliking", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleEdit = () => {
    /**
     * Reverts the post back to it's original state
     * if user chooses to stop editing.
     */
    if (!editToggled) {
      setEditToggled(true);
    } else {
      setNewPostData({
        title: post.title,
        content: post.content,
        image: null,
      });
      setEditToggled(false);
    }
  };

  const handleEdit = async (e) => {
    /**
     * Handles edit submission.
     * Image is only added if one has been submitted,
     * otherwise it's omitted in the payload.
     *
     * Updates the newPostData state to set image to null again,
     * so that it isn't uploaded again without actually changing.
     */
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", newPostData.title);
    formData.append("content", newPostData.content);
    if (newPostData.image) {
      formData.append("image", newPostData.image);
    }
    try {
      const { data } = await axiosInstance.put(`/posts/${id}/`, formData);
      setPostData({
        ...postData,
        title: data.title,
        content: data.content,
        image: data.image,
      });

      setNewPostData({
        ...newPostData,
        image: null,
      });

      setEditToggled(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    /**
     * Handles deleting a post and removing it from the posts state
     */
    try {
      await axiosInstance.delete(`/posts/${id}`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: [...prevPosts.results.filter((post) => post.id !== id)],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const likeIcon = (
    <>
      <button
        className={btnCSS.Btn}
        type="button"
        title="Like post"
        onClick={() => {
          /**
           * Show a tooltip for post owner or logged out users.
           * The tooltip closes automatically after 3 seconds or
           * the next time the icon is clicked.
           *
           * For other users handles liking and unliking.
           */
          if (is_owner || !loggedInUser) {
            setShow(!show);
            !show && setTimeout(() => setShow(false), 3000);
          } else {
            !like ? handleLike() : handleUnlike();
          }
        }}
        ref={target}
      >
        <i
          className={`${like ? `fa-solid ${css.Liked}` : "fa-regular"}
      fa-heart me-1 ${css.Likes}`}
          aria-hidden="true"
        ></i>
      </button>

      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip {...props}>
            {is_owner ? (
              <div>You can't like your own post</div>
            ) : (
              <div>You must be logged in to like a post</div>
            )}
          </Tooltip>
        )}
      </Overlay>
    </>
  );

  const commentsIcon = (
    /**
     * Conditonally renders a link for the comments icon on a post
     * if the comments prop has not been passed which, it only is
     * for an individual post page where we don't want to link to
     * the post the user is already on.
     */
    <>
      {!comments ? (
        <Link className={appCSS.Link} to={`/post/${id}`}>
          <i
            className={`fa-regular fa-comments me-1 ${css.Comments}`}
            aria-hidden="true"
          ></i>
          <span className="sr-only">
            Go to page for post {id} to read comments
          </span>
        </Link>
      ) : (
        <i className={`fa-regular fa-comments me-1 ${css.Comments}`}></i>
      )}
    </>
  );

  const postImage = (
    /**
     * Conditonally renders a link for the for the image on a post
     * if the comments prop has not been passed, which it only is
     * for an individual post page where we don't want to link to
     * the post the user is already on.
     */
    <>
      {!comments ? (
        <Link to={`/post/${id}`}>
          <Card.Img
            className={css.PostImg}
            variant="top"
            src={image}
            alt={title}
          />
        </Link>
      ) : (
        <Card.Img
          className={css.PostImg}
          variant="top"
          src={image}
          alt={title}
        />
      )}
    </>
  );

  return (
    <Card className={css.PostCard}>
      {/* Quick ternary to check whether to render the post editing form
      or the post normal post card */}
      {editToggled ? (
        <EditPostForm
          handleEdit={handleEdit}
          postData={postData}
          toggleEdit={toggleEdit}
          newPostData={newPostData}
          setNewPostData={setNewPostData}
        />
      ) : (
        <>
          {postImage}
          <div className={css.CardHeader}>
            <Link
              className={css.OwnerLink}
              to={`/profile/${profile_id}`}
              aria-label={`${owner}'s profile`}
            >
              <Avatar src={profile_image} size={30} alt={`${owner}'s avatar`} />
              <div className="ms-1">
                <span>{owner}</span>
              </div>
              <div className={css.PostTime}>
                <span className="ms-1 me-1">·</span>
                <OverlayTrigger
                  overlay={
                    <Tooltip id="tooltip-disabled">
                      Updated: {updated_at}
                    </Tooltip>
                  }
                >
                  <span className="d-inline-block">
                    <span>{created_at}</span>
                  </span>
                </OverlayTrigger>
              </div>
            </Link>
            {/* Methods for deleting and editing posts for the post owner */}
            {is_owner && (
              <>
                <EditDropdown
                  toggleEdit={toggleEdit}
                  confirmDelete={() => setShowDeleteModal(true)}
                />
                <ConfirmationModal
                  show={showDeleteModal}
                  onHide={() => setShowDeleteModal(false)}
                  object={"post"}
                  handleDelete={handleDelete}
                />
              </>
            )}
          </div>
          <hr className={css.ContentSeparator} />
          <Card.Body className="text-center">
            <Card.Title>{title}</Card.Title>
            <Card.Text>{content}</Card.Text>
          </Card.Body>
          <div className={css.PostStats}>
            <div>
              {likeIcon}
              {likeCount}
            </div>
            <div>
              {commentsIcon}
              {commentCount}
            </div>
          </div>
        </>
      )}

      {/* Only render comments on a post card if the comments prop has been passed */}
      {comments && (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={comments.results.length}
          next={() => FetchNext(comments, setComments)}
          hasMore={!!comments.next}
          loader={
            <div className="d-flex mb-2 justify-content-center">
              <Loader />
            </div>
          }
        >
          <CreateComment
            post={id}
            setComments={setComments}
            setCommentCount={setCommentCount}
          />
          <hr className={css.ContentSeparator} />
          {/* Map over all the post comments */}
          {comments.results.map((comment) => (
            <Comment
              key={comment.id}
              {...comment}
              setComments={setComments}
              setCommentCount={setCommentCount}
            />
          ))}
        </InfiniteScroll>
      )}
    </Card>
  );
};

export default Post;
