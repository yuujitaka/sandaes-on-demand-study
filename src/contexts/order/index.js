import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../../constants";
import formatCurrency from "../../utils/formatCurrency";

const Order = createContext();

export const useOrder = () => {
  //It is equivalent to <MyContext.Consumer>
  const context = useContext(Order);

  if (!context) {
    throw new Error("useOrder must be used within a Order Provider");
  }

  return context;
};

const calculateSubtotal = (optionType, optionCounts) => {
  let optionCount = 0;
  for (const count of optionCounts[optionType].values()) {
    optionCount += count;
  }

  return optionCount * pricePerItem[optionType];
};

export const OrderProvider = (props) => {
  const [optionCounts, setOptionsCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const zeroCurrency = formatCurrency(0);

  const [totals, setTotals] = useState({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const scoopsSubtotal = calculateSubtotal("scoops", optionCounts);
    const toppingsSubtotal = calculateSubtotal("toppings", optionCounts);
    const grandTotal = scoopsSubtotal + toppingsSubtotal;
    setTotals({
      scoops: formatCurrency(scoopsSubtotal),
      toppings: formatCurrency(toppingsSubtotal),
      grandTotal: formatCurrency(grandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function updateItemCount(itemName, newItemCount, optionType) {
      const newOptionsCounts = { ...optionCounts };
      const optionCountMap = newOptionsCounts[optionType];
      optionCountMap.set(itemName, parseInt(newItemCount));

      setOptionsCounts(newOptionsCounts);
    }

    return [{ ...optionCounts, totals }, updateItemCount];
  }, [optionCounts, totals]);
  return <Order.Provider value={value} {...props} />;
};
