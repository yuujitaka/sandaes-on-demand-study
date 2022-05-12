import { render } from "@testing-library/react";
import { OrderProvider } from "../contexts/order";

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: OrderProvider, ...options });

export * from "@testing-library/react";
export { renderWithContext as render };
