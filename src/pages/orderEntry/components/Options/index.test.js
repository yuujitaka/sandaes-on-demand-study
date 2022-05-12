import { render, screen } from "@testing-library/react";

import { OrderProvider } from "../../../../contexts/order";
import Options from "./";

test("displays image for each scoop from server", async () => {
  render(<Options optionType="scoops" />, { wrapper: OrderProvider });

  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  const altText = scoopImages.map((image) => image.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each toppings from server", async () => {
  render(<Options optionType="toppings" />, { wrapper: OrderProvider });

  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((image) => image.alt);
  expect(altText).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});
