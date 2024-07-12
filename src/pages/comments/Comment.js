import React from "react";

const Comment = (props) => {
  const {
    content,
    id,
    is_owner,
    owner,
    post,
    profile_id,
    profile_image,
    updated_at,
    created_at,
  } = props;
  return (
  <div key={id}>
    {content}
    {owner}
    {created_at}
  </div>)
};

export default Comment;
