import React, { useState } from "react";
import css from "../../styles/css/Comments.module.css";
import postCSS from "../../styles/css/Posts.module.css";
import dropdownCSS from "../../styles/css/EditDropdown.module.css";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Avatar from "../../components/Avatar";
import { Link } from "react-router-dom";
import { EditDropdown } from "../../components/EditDropdown";
import EditCommentForm from "./EditCommentForm";
import { axiosRes } from "../../axios/axiosDefaults";
import ConfirmationModal from "../../components/ConfirmationModal";

const Comment = (props) => {
  const {
    content,
    id,
    is_owner,
    owner,
    profile_id,
    profile_image,
    updated_at,
    created_at,
    setComments,
    setCommentCount,
  } = props;

  const [editToggled, setEditToggled] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [originalCommentData, setOriginalCommentData] = useState(null);
  const [commentData, setCommentData] = useState({
    id: id,
    content: content,
    updated_at: updated_at,
  });

  const toggleEdit = () => {
    if (!editToggled) {
      setOriginalCommentData(commentData.content);
      setEditToggled(true);
    } else {
      setCommentData({
        ...commentData,
        content: originalCommentData,
      });
      setEditToggled(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}`, commentData);
      setCommentData({
        ...commentData,
        updated_at: "now",
      });
      setEditToggled(false);
    } catch (error) {
      console.log("Error when updating comment:", error);
    }
  };

  const handleDelete = async () => {
    try {
      setModalShow(false);
      await axiosRes.delete(`/comments/${id}`);
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
      setCommentCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className={css.CommentCard}>
      <div className={postCSS.CardHeader}>
        <Link className={postCSS.OwnerLink} to={`/profile/${profile_id}`}>
          <Avatar src={profile_image} size={25} alt="Comment owner" />
          <div className="ms-1">
            <span>{owner}</span>
          </div>
          <div className={postCSS.PostTime}>
            <span className="ms-1 me-1">·</span>
            <OverlayTrigger
              overlay={
                <Tooltip id="tooltip-disabled">
                  Updated: {commentData.updated_at}
                </Tooltip>
              }
            >
              <span className="d-inline-block">
                <span>{created_at}</span>
              </span>
            </OverlayTrigger>
          </div>
        </Link>
        {is_owner && !editToggled && (
          <EditDropdown
            confirmDelete={() => setModalShow(true)}
            toggleEdit={toggleEdit}
          />
        )}
        {is_owner && editToggled && (
          <i
            className={`fa-solid fa-xmark ${dropdownCSS.ToggleIcon}`}
            onClick={toggleEdit}
          ></i>
        )}
        {is_owner && (
          <ConfirmationModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            object={"comment"}
            handleDelete={handleDelete}
          />
        )}
      </div>
      <hr className={postCSS.ContentSeparator} />
      <Card.Body className={css.CommentBody}>
        {!editToggled ? (
          <Card.Text>{commentData.content}</Card.Text>
        ) : (
          <EditCommentForm
            handleEdit={handleEdit}
            commentData={commentData}
            setCommentData={setCommentData}
          />
        )}
      </Card.Body>
    </Card>
  );
};

export default Comment;
