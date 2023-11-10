import Spinner from "react-bootstrap/Spinner";

function LoadingIndicator() {
  return (
    <div className="d-flex justify-content-center m-4">
      <Spinner animation="border" variant="primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default LoadingIndicator;
