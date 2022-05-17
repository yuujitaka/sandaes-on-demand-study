import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import { PhaseContext } from "../../contexts/phase";
import { useOrder } from "../../contexts/order";

const OrderConfirmation = () => {
  const [orderNumber, setOrderNumber] = useState(null);
  const { setPhase } = useContext(PhaseContext);
  const [, , resetOrder] = useOrder();

  useEffect(() => {
    const getOrderNumber = async () => {
      try {
        const response = await axios.post("http://localhost:3030/order");
        setOrderNumber(response.data.orderNumber);
      } catch (error) {
        console.log(error);
      }
    };

    getOrderNumber();
  }, []);

  const newOrderHandler = () => {
    resetOrder();
    setPhase(1);
  };

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
