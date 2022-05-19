import SummaryForm from "./SummaryForm";
import { useOrder } from "../../contexts/order";

const Summary = () => {
  const [orderDetails] = useOrder();

  const scoops = Array.from(orderDetails.scoops.entries());

  const toppings = Array.from(orderDetails.toppings.entries());

  return (
    <div>
      <h1>Order Summary</h1>
      <h2>Scoops: {orderDetails.totals.scoops}</h2>
      <ul>
        {scoops.map(([key, value]) => (
          <li key={key}>
            {value} {key}
          </li>
        ))}
      </ul>

      {!!toppings.length && (
        <>
          <h2>Toppings: {orderDetails.totals.toppings}</h2>
          <ul>
            {toppings.map(([key]) => (
              <li key={key}>{key}</li>
            ))}
          </ul>
        </>
      )}

      <SummaryForm />
    </div>
  );
};

export default Summary;
