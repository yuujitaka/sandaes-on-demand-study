import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { server } from "../../mocks/server";

import OrderEntry from "./";

test("handles error for scoops and toppings routes", async () => {
  server.resetHandlers(
    rest.get("http://localhost:3030/scoops", (req, res, ctx) =>
      res(ctx.status(500))
    ),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) =>
      res(ctx.status(500))
    )
  );

  render(<OrderEntry />);

  //waitFor is not necessary sometimes
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert", { name: /error/i });

    expect(alerts).toHaveLength(2);
  });
});
