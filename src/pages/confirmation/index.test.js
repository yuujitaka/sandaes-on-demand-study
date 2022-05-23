import { rest } from "msw";

import { render, screen } from "../../test-utils/testing-library-utils";
import { server } from "../../mocks/server";

import OrderConfirmation from "./";

test("handles error for order route", async () => {
  server.resetHandlers(
    rest.post("http://localhost:3030/order", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderConfirmation />);

  const alert = await screen.findByRole("alert", { name: /error/i });
  expect(alert).toBeInTheDocument();
});
