import React from "react";
import { Card } from "react-bootstrap";
import css from "../../styles/css/Conversation.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Reply = ({ reply }) => {
  return (
    <Card className={css.ConvCard}>
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
