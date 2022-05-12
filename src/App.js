import "./App.css";
import Container from "react-bootstrap/Container";

import { OrderProvider } from "./contexts/order";
import OrderEntry from "./pages/orderEntry";

function App() {
  return (
    <Container>
      <OrderProvider>
        <OrderEntry />
      </OrderProvider>
    </Container>
  );
}

export default App;
