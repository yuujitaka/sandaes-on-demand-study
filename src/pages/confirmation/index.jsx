import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import { PhaseContext } from "../../contexts/phase";
import { useOrder } from "../../contexts/order";
import AlertBanner from "../../components/AlertBanner";

const OrderConfirmation = () => {
  const [orderNumber, setOrderNumber] = useState(null);
  const { setPhase } = useContext(PhaseContext);
  const [, , resetOrder] = useOrder();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getOrderNumber = async () => {
      try {
        const response = await axios.post("http://localhost:3030/order");
        setOrderNumber(response.data.orderNumber);
      } catch (error) {
        setError(true);
      }
    };

    getOrderNumber();
  }, []);

  const newOrderHandler = () => {
    resetOrder();
    setPhase(1);
  };

  if (error)
    return (
      <AlertBanner>An unexpected error occured! Please try later</AlertBanner>
    );

  return (
    <div>
      {orderNumber ? (
        <>
          <h2>Thank you</h2>
          <h4>Your order number is: {orderNumber}</h4>
          <Button onClick={newOrderHandler}>Create new order</Button>
        </>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default OrderConfirmation;
