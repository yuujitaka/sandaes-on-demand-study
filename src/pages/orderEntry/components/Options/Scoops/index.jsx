import Col from "react-bootstrap/Col";

const Scoops = ({ item: { name, imageUrl } }) => {
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img src={`http://localhost:3030/${imageUrl}`} alt={`${name} scoop`} />
    </Col>
  );
};

export default Scoops;
