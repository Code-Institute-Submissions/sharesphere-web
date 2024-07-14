import React from "react";
import Image from "react-bootstrap/Image";

const Avatar = ({ src, size, alt }) => {
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
