import { render, screen } from "./test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import App from "./App";

test("order phases for happy path", async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppins
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);

  // find and click order button
  const summaryButton = screen.getByRole("button", {
    name: /order summary/i,
  });
  userEvent.click(summaryButton);

  // check summary information based on order
  const scoopsSubtotal = screen.getByRole("heading", { name: /scoops/i });
  expect(scoopsSubtotal).toHaveTextContent("4.00");

  const toppingsSubtotal = screen.getByRole("heading", { name: /toppings/i });
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  expect(screen.getByText("2 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  userEvent.click(termsCheckbox);

  const orderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  userEvent.click(orderButton);

  // confirm order number on confirmation page
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const orderNumber = await screen.findByText("Your order number is", {
    exact: false,
  });
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();
  //expect(loading).not.toBeInTheDocument();
  expect(orderNumber).toHaveTextContent("15200");

  // click new order on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  userEvent.click(newOrderButton);

  // check that subtotals have been reset
  const scoopsTotal = screen.getByText("Scoops total: $", { exact: false });
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(scoopsTotal).toHaveTextContent("0.00");
  expect(toppingsTotal).toHaveTextContent("0.00");
});

test("Toppings header is not on summary page if no toppings were ordered", async () => {
  // render app
  render(<App />);

  // add ice cream scoops and toppins
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  // find and click order button
  const summaryButton = screen.getByRole("button", {
    name: /order summary/i,
  });
  userEvent.click(summaryButton);

  // check summary information based on order
  const scoops = screen.getByRole("heading", { name: /scoops/i });
  expect(scoops).toBeInTheDocument();

  const toppings = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppings).not.toBeInTheDocument();
});
