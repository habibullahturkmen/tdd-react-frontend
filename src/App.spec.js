import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Routing", () => {

	it.each`
		path         | pageTestId
		${"/"}       | ${"home-page"}
		${"/signup"} | ${"signup-page"}
	`("displays $pageTestId when path is $path", ({path, pageTestId}) => {
		window.history.pushState({}, "", path);
		render(<App />);
		const page = screen.queryByTestId(pageTestId);
		expect(page).toBeInTheDocument();
	});

	it.each`
		path         | pageTestId
		${"/"}       | ${"signup-page"}
		${"/signup"} | ${"home-page"}
	`("does not display $pageTestId when path is $path", ({path, pageTestId}) => {
		window.history.pushState({}, "", path);
		render(<App />);
		const page = screen.queryByTestId(pageTestId);
		expect(page).not.toBeInTheDocument();
	});

});