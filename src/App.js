import { useContext } from "react";
import Container from "react-bootstrap/Container";

import { OrderProvider } from "./contexts/order";
import { PhaseContext, PhaseProvider } from "./contexts/phase";
import OrderEntry from "./pages/orderEntry";
import Summary from "./pages/summary";
import OrderConfirmation from "./pages/confirmation";

import "./App.css";

function App() {
  const { phase } = useContext(PhaseContext);

  const customRender = () => {
    // eslint-disable-next-line default-case
    switch (phase) {
      case 1:
        return <OrderEntry />;
      case 2:
        return <Summary />;
      case 3:
        return <OrderConfirmation />;
    }
  };

  return (
    <Container>
      <OrderProvider>{customRender()}</OrderProvider>
    </Container>
  );
}

export default App;
