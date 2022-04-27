import { useState, useEffect } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";

import Scoops from "./Scoops";

const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await (
          await axios.get(`http://localhost:3030/${optionType}`)
        ).data;
        setItems(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchOptions();
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? Scoops : null;

  const optionItems = items.map((item) => (
    <ItemComponent key={item.name} item={item} />
  ));

  return <Row>{optionItems}</Row>;
};

export default Options;
