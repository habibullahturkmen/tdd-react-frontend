import SignUpPage from "./SignUpPage";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("Sign Up Page", () => {

    describe("Layout", () => {

        it('has header', () => {
            render(<SignUpPage />);
            const header = screen.queryByRole("heading", { name: "Sign Up" });
            expect(header).toBeInTheDocument();
        });

        it("has username input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Username");
            expect(input).toBeInTheDocument();
        });

        it("has email input", () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("E-mail");
            expect(input).toBeInTheDocument();
        });

        it('has password input', () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input).toBeInTheDocument();
        });

        it('has password type for password input', () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password");
            expect(input.type).toBe("password");
        });

        it('has password repeat input', () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password Repeat");
            expect(input).toBeInTheDocument();
        });

        it('has password repeat type for password input', () => {
            render(<SignUpPage />);
            const input = screen.getByLabelText("Password Repeat");
            expect(input.type).toBe("password");
        });

        it('has SignUp button', () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });

        it('disables the SignUp button initially', () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeDisabled();
        });

    });

    describe("Interactions", () => {

        it('enables the button when password and password repeat fields have same value', () => {
            render(<SignUpPage />);
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");
            userEvent.type(passwordInput, "password123");
            userEvent.type(passwordRepeatInput, "password123");
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeEnabled();
        });

        it('sends username, email, and password to backend after clicking the Sign Up button', async () => {
            let requestBody;
            const server = setupServer(
                rest.post("api/1.0/users", (req, res, ctx) => {
                    requestBody = req.body
                    return res(ctx.status(200))
                })
            );
            server.listen();
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("E-mail");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");

            userEvent.type(usernameInput, "habibullah_turkmen");
            userEvent.type(emailInput, "habibullahturkmen204@gmail.com");
            userEvent.type(passwordInput, "password123");
            userEvent.type(passwordRepeatInput, "password123");
            const button = screen.queryByRole("button", { name: "Sign Up" });
            userEvent.click(button);

            await new Promise(resolve => setTimeout(resolve, 500));

            expect(requestBody).toEqual({
                username: "habibullah_turkmen",
                email: "habibullahturkmen204@gmail.com",
                password: "password123"
            });
        });
    });
});