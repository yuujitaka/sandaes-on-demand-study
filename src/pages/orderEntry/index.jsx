import { Button } from "react-bootstrap";
import { useContext } from "react";

import { useOrder } from "../../contexts/order";
import { PhaseContext } from "../../contexts/phase";
import Options from "./Options";

const OrderEntry = () => {
  const [orderDetails] = useOrder();
  const { setPhase } = useContext(PhaseContext);
  const scoopsCount = orderDetails.totals.scoops === "$0.00";

  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>

      <Button onClick={() => setPhase(2)} disabled={scoopsCount}>
        Order summary
      </Button>
    </div>
  );
};

export default OrderEntry;
