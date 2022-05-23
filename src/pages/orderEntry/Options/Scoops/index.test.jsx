import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Scoops from "./";

const item = {
  name: "Vanilla",
  imagePath: "/images/vanilla.png",
};

test("shows a red box for invalid scoop count", () => {
  render(<Scoops item={item} updateItemCount={jest.fn()} />);

  const vanillaInput = screen.getByRole("spinbutton", {
    name: "Vanilla",
  });
  expect(vanillaInput).not.toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "11");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "3");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});
