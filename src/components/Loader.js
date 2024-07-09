import Spinner from 'react-bootstrap/Spinner';

function Loader() {
  return <Spinner animation="border" variant='secondary' className='position-absolute top-50 start-50' />;
}

export default Loader;