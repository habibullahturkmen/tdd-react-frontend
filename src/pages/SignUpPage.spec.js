import SignUpPage from "./SignUpPage";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

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

        it('has SignUp button',  () => {
            render(<SignUpPage />);
            const button = screen.queryByRole("button", { name: "Sign Up" });
            expect(button).toBeInTheDocument();
        });

        it('disables the SignUp button initially',  () => {
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
            const button = screen.queryByRole("button", { name: "Sign Up"});
            expect(button).toBeEnabled();
        });

        it('sends username, email, and password to backend after clicking the Sign Up button', () => {
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
            const mockFn = jest.fn();
            axios.post = mockFn;

            userEvent.click(button);

            const firstCallOfMockFunction = mockFn.mock.calls[0];
            const body = firstCallOfMockFunction[1];
            expect(body).toEqual({
                username: "habibullah_turkmen",
                email: "habibullahturkmen204@gmail.com",
                password: "password123"
            });
        });
    });
});

