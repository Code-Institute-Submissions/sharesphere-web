import React from "react";
import Image from "react-bootstrap/Image";
import css from "../styles/css/Avatar.module.css";

const Avatar = ({ src, size, alt }) => {
  return (
    <div className={css.AvatarWrapper} style={{ height: size, width: size }}>
      <Image
        className={`${css.Avatar} border border-secondary`}
        src={src}
        alt={alt}
        roundedCircle
      />
    </div>
  );
};

export default Avatar;
