import { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import AlertBanner from "../../../../components/AlertBanner";
import Scoops from "./Scoops";
import Toppings from "./Toppings";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);

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

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} item={item} />
  ));

  if (error)
    return (
      <AlertBanner>An unexpected error occured! Please try later</AlertBanner>
    );

  return <Row>{optionItems}</Row>;
};

export default Options;
