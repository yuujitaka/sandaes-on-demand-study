import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

    userEvent.click(termsCheckbox);
    expect(orderButton).toBeEnabled();

    userEvent.click(termsCheckbox);
    expect(orderButton).toBeDisabled();
  });

  test("popover responds to hover", async () => {
    render(<SummaryForm />);

    const nullPopover = screen.queryByText(/no ice cream/i);
    expect(nullPopover).not.toBeInTheDocument();

    const terms = screen.getByText(/terms and conditions/i);
    userEvent.hover(terms);

    const popover = screen.getByText(/no ice cream/i);
    expect(popover).toBeInTheDocument();

    userEvent.unhover(terms);

    await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream/i));
  });
});
