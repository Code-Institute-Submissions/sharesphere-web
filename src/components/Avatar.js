import React from "react";
import Image from "react-bootstrap/Image";

const Avatar = (props) => {
  const { src, height, alt } = props;
  return <Image src={src} height={height} alt={alt} roundedCircle />;
};

export default Avatar;
