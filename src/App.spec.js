import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Routing", () => {

	it.each`
		path         | pageTestId
		${"/"}       | ${"home-page"}
		${"/signup"} | ${"signup-page"}
		${"/login"}  | ${"login-page"}
	`("displays $pageTestId when path is $path", ({path, pageTestId}) => {
		window.history.pushState({}, "", path);
		render(<App />);
		const page = screen.queryByTestId(pageTestId);
		expect(page).toBeInTheDocument();
	});

	it.each`
		path         | pageTestId
		${"/"}       | ${"signup-page"}
		${"/"}       | ${"login-page"}
		${"/signup"} | ${"home-page"}
		${"/signup"} | ${"login-page"}
		${"/login"}  | ${"home-page"}
		${"/login"}  | ${"signup-page"}
	`("does not display $pageTestId when path is $path", ({path, pageTestId}) => {
		window.history.pushState({}, "", path);
		render(<App />);
		const page = screen.queryByTestId(pageTestId);
		expect(page).not.toBeInTheDocument();
	});

});