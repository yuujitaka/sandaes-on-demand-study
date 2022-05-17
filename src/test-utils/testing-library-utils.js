import { render } from "@testing-library/react";
import { OrderProvider } from "../contexts/order";
import { PhaseProvider } from "../contexts/phase";

const AllTheProviders = ({ children }) => {
  return (
    <PhaseProvider>
      <OrderProvider>{children}</OrderProvider>
    </PhaseProvider>
  );
};

const renderWithContext = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { renderWithContext as render };
