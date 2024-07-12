import React from "react";
import Image from "react-bootstrap/Image";

const Avatar = (props) => {
  const { src, size, alt } = props;
  return (
    <Image
      className="border border-secondary"
      src={src}
      height={size}
      width={size}
      alt={alt}
      roundedCircle
    />
  );
};

export default Avatar;
