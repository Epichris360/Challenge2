import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ title, image, onClick }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button title={title} image={image} variant="primary" onClick={onClick}>
          See Product
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
