import { render, screen, fireEvent } from "@testing-library/react";
import SummaryForm from "./";

describe("<SummaryForm/>", () => {
  test("initial conditions", () => {
    render(<SummaryForm />);
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    expect(termsCheckbox).not.toBeChecked();

    const orderButton = screen.getByRole("button", {
      name: /confirm order/i,
    });
    expect(orderButton).toBeDisabled();
  });

  test("checkbox enables and disables order button", () => {
    render(<SummaryForm />);
    const termsCheckbox = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });

    const orderButton = screen.getByRole("button", {
      name: /confirm order/i,
    });

    fireEvent.click(termsCheckbox);
    expect(orderButton).toBeEnabled();

    fireEvent.click(termsCheckbox);
    expect(orderButton).toBeDisabled();
  });
});
