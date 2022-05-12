import { useOrder } from "../../contexts/order";
import Options from "./Options";

const OrderEntry = () => {
  const [orderDetails] = useOrder();
  return (
    <div>
      <Options optionType="scoops" />
      <Options optionType="toppings" />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </div>
  );
};

export default OrderEntry;
