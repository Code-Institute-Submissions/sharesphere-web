import React from "react";
import Image from "react-bootstrap/Image";

const Avatar = (props) => {
  const { src, height } = props;
  return <Image src={src} height={height} roundedCircle />;
};

export default Avatar;
