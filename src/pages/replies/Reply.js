import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import css from "../../styles/css/Conversation.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { EditDropdown } from "../../components/EditDropdown";
import ConfirmationModal from "../../components/ConfirmationModal";
import { axiosRes } from "../../axios/axiosDefaults";

const Reply = ({ reply, setReplies, setRepliesCount }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleDelete = async () => {
    /**
     * Handles deleting a chosen reply.
     *
     * Updates the reply count and replies array on deletion.
     */
    try {
      await axiosRes.delete(`/replies/${reply.id}`);
      setRepliesCount((prevCount) => prevCount - 1);
      setReplies((prevReplies) => ({
        ...prevReplies,
        results: [...prevReplies.results.filter((rep) => rep.id !== reply.id)],
      }));
      setModalShow(false);
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <Card className={css.ConvCard}>
      {/* Dropdown and modal for deleting reply, visible to owner */}
      {reply.is_owner && (
        <>
          <div className="d-flex justify-content-end">
            <EditDropdown confirmDelete={() => setModalShow(true)} />
          </div>
          <ConfirmationModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            object={"reply"}
            handleDelete={handleDelete}
          />
        </>
      )}

      <div className="d-flex align-items-center">
        <div>
          <Link
            to={`/profile/${reply.owner_id}`}
            aria-label={`${reply.owner}'s profile`}
          >
            <Avatar
              src={reply.owner_image}
              size={40}
              alt={`${reply.owner}'s avatar`}
            />
          </Link>
        </div>

        <Card.Body className={`${css.ConvBody} ps-2`}>
          <div className={css.ConvInfo}>
            <span>
              From
              {!reply.is_owner ? " @" + reply.owner : " you"}
            </span>
            <span className="ms-1 opacity-75">{reply.created_at}</span>
          </div>
          <hr className={css.ConvSeparator} />
        </Card.Body>
      </div>
      <div className="mb-1">
        <Card.Text>{reply.content}</Card.Text>
      </div>
    </Card>
  );
};

export default Reply;
