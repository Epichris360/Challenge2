import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function ProductCard({ title, image }) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button variant="primary">See Product</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
