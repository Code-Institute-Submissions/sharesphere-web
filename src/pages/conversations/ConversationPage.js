import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
import CreateReplyForm from "../replies/CreateReplyForm";
import { Card, Container } from "react-bootstrap";
import css from "../../styles/css/Conversation.module.css";
import Loader from "../../components/Loader";
import Avatar from "../../components/Avatar";
import Reply from "../replies/Reply";

const ConversationPage = () => {
  const [hasLoaded, setHadLoaded] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [conversation, setConversation] = useState({});
  const [replies, setReplies] = useState({});

  {
  }

  const { id } = useParams();

  useEffect(() => {
    const fetchConversation = async () => {
      setHadLoaded(false);
      try {
        const [{ data: conversation }, { data: replies }] = await Promise.all([
          axiosInstance.get(`/messages/${id}`),
          axiosInstance.get(`/replies/?message=${id}`),
        ]);
        setConversation(conversation);
        setReplies(replies)
        console.log("conversation", conversation);
        console.log("replies", replies);
        setHadLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchConversation();
  }, [id]);

  return (
    <Container className="d-flex flex-column">
      <button onClick={() => setModalShow(true)} type="button">
        Reply
      </button>
      <CreateReplyForm
        id={id}
        topic={conversation.topic}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {hasLoaded ? (
        <Card className={`${css.ConvCard}`}>
          <Card.Body className={css.ConvBody}>
            <div className="d-flex">
              <Link
                to={`/profile/${conversation.owner_id}`}
                aria-label={`${conversation.owner}'s profile`}
              >
                <Avatar
                  src={conversation.owner_image}
                  size={40}
                  alt={`${conversation.owner}'s avatar`}
                />
              </Link>

              <h2 className="ms-2 card-title h5">{conversation.topic}</h2>
            </div>
            <div className={css.ConvInfo}>
              <span>
                From
                {!conversation.is_owner ? " @" + conversation.owner : " you"}
              </span>
              <span className="ms-1 opacity-75">{conversation.created_at}</span>
            </div>
            <hr className={css.ConvSeparator} />
            <div
              className={css.ConvContent}
              to={`/conversation/${conversation.id}`}
              aria-label={`go to ${conversation.topic} conversation`}
            >
              <Card.Text>{conversation.content}</Card.Text>
              <div className={css.ConvReplies}>
                <i className="fa-solid fa-comments me-1"></i>
                <span>
                  {conversation.replies_count}
                  <span className="sr-only">replies</span>
                </span>
              </div>
            </div>
          </Card.Body>
          <hr className={css.ConvSeparator} />
          <div className="d-flex">
            {replies.results.map((reply) => (
              <div key={reply.id}>
                <Reply reply={reply} />
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <Loader center />
      )}
    </Container>
  );
};

export default ConversationPage;
