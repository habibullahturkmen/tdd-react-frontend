import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Routing", () => {

	it("displays homepage at /", () => {
		render(<App />);
		const homepage = screen.getByTestId("home-page");
		expect(homepage).toBeInTheDocument();
	});

	it("does not display SignUpPage at /", () => {
		render(<App />);
		const page = screen.queryByTestId("signup-page");
		expect(page).not.toBeInTheDocument();
	});

	it("displays SignUpPage at /signup", () => {
		window.history.pushState({}, "", "/signup");
		render(<App />);
		const page = screen.queryByTestId("signup-page");
		expect(page).toBeInTheDocument();
	});

});