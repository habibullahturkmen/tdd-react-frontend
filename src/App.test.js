import { render, screen } from '@testing-library/react';
import App from './App';
import "./locale/i18n";

test('renders learn react link', () => {
  render(<App />);
  const header = screen.queryByRole("heading", { name: "Sign Up" });
  expect(header).toBeInTheDocument();
});
