import { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import { useOrder } from "../../../contexts/order";
import { pricePerItem } from "../../../constants";
import formatCurrency from "../../../utils/formatCurrency";
import AlertBanner from "../../../components/AlertBanner";
import Scoops from "./Scoops";
import Toppings from "./Toppings";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const [orderDetails, updateItemCount] = useOrder();

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await (
          await axios.get(`http://localhost:3030/${optionType}`)
        ).data;
        setItems(response);
      } catch (error) {
        setError(true);
      }
    }

    fetchOptions();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? Scoops : Toppings;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      item={item}
      updateItemCount={(itemName, newItemCount) =>
        updateItemCount(itemName, newItemCount, optionType)
      }
    />
  ));

  if (error)
    return (
      <AlertBanner>An unexpected error occured! Please try later</AlertBanner>
    );

  return (
    <>
      <h4>{title}</h4>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {orderDetails.totals[optionType]}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
};

export default Options;
