import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const Toppings = ({ item: { name, imagePath }, updateItemCount }) => {
  const handleChange = (e) => {
    updateItemCount(name, e.target.value);
  };

  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label>{name}</Form.Label>
        <Form.Control type="number" defaultValue={0} onChange={handleChange} />
      </Form.Group>
    </Col>
  );
};

export default Toppings;
