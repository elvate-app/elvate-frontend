import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const title = getByText(/Loading Web3, accounts, and contract/i);
  expect(title).toBeInTheDocument();
});
