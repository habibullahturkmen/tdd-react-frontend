/* eslint-disable no-undef */
describe("Navigation", () => {

	it("should find the HomePage heading", () => {
		cy.visit("/");
		cy.get("h3").contains("Users");
	});

	it("should find the SignUpPage heading", () => {
		cy.visit("/signup");
		cy.get("h1").contains("Sign Up");
	});

	it("should find the LoginPage heading", () => {
		cy.visit("/login");
		cy.get("h1").contains("Login Page");
	});
})
