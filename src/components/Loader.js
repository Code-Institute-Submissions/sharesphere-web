import Spinner from "react-bootstrap/Spinner";

function Loader(props) {
  /**
   * Center prop can be called to have the loader appear in the center
   * of the viewport. This means that it can also be used to appear
   * at the bottom during InfiniteSroll fetching more data.
   */
  const { center } = props;
  return (
    <Spinner
      animation="border"
      variant="secondary"
      className={center ? "position-absolute top-50 start-50" : ""}
    />
  );
}

export default Loader;
