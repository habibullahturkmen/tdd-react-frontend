import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";

test('The header should exist', () => {
    render(<SignUpPage />);
    const header = screen.queryByRole("heading", { name: "Sign Up" });
    expect(header).toBeInTheDocument();
})