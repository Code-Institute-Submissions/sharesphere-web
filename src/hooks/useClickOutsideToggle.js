import { useEffect, useRef, useState } from "react";

// Credits to:
// https://github.com/mr-fibonacci/moments/blob/bb6657e265fb18360b841e10d9d633dad06f4e5c/src/hooks/useClickOutsideToggle.js
const useClickOutsideToggle = () => {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;
