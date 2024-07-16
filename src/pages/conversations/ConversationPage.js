import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosDefaults";
import CreateReplyForm from "../replies/CreateReplyForm";
import { Card, Container } from "react-bootstrap";
import css from "../../styles/css/Conversation.module.css";
import Loader from "../../components/Loader";
import Avatar from "../../components/Avatar";
import Reply from "../replies/Reply";
import InfiniteScroll from "react-infinite-scroll-component";
import { FetchNext } from "../../utils/FetchNext";

const ConversationPage = () => {
  const [hasLoaded, setHadLoaded] = useState(false);
  const [conversation, setConversation] = useState({});
  const [replies, setReplies] = useState({});
  const [repliesCount, setRepliesCount] = useState();

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
        setReplies(replies);
        setRepliesCount(conversation.replies_count);
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
      {hasLoaded ? (
        <Card className={`${css.ConvCard}`}>
        {console.log(replies)}

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
                <span className="ms-1 opacity-75">
                  {conversation.created_at}
                </span>
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
                    {repliesCount}
                    <span className="sr-only">replies</span>
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
          {/* Replies section */}
          <CreateReplyForm
            id={id}
            setReplies={setReplies}
            setRepliesCount={setRepliesCount}
          />
          <InfiniteScroll
            style={{ overflow: "hidden" }}
            dataLength={replies.results.length}
            next={() => FetchNext(replies, setReplies)}
            hasMore={!!replies.next}
            loader={
              <div className="d-flex mb-2 justify-content-center">
                <Loader />
              </div>
            }
          >
            {replies.results.map((reply) => (
              <div key={reply.id}>
                <Reply
                  reply={reply}
                  setReplies={setReplies}
                  setRepliesCount={setRepliesCount}
                />
              </div>
            ))}
          </InfiniteScroll>
        </Card>
      ) : (
        <Loader center />
      )}
    </Container>
  );
};

export default ConversationPage;
