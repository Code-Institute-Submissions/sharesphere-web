import React from "react";
import Image from "react-bootstrap/Image";

const Avatar = (props) => {
  const { src, height, alt } = props;
  return (
    <Image
      className="border border-secondary"
      src={src}
      height={height}
      width={height}
      alt={alt}
      roundedCircle
    />
  );
};

export default Avatar;
