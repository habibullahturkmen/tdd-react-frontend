import SignUpPage from "./SignUpPage";
import { render, screen, waitFor } from "@testing-library/react";
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

        let requestBody;
        let counter = 0;
        const server = setupServer(
            rest.post("api/1.0/users", (req, res, ctx) => {
                requestBody = req.body;
                counter += 1;
                return res(ctx.status(200));
            })
        );

        beforeEach(() => {
            counter = 0;
        });

        beforeAll(() => {
            server.listen();
        });

        afterAll(() => {
            server.close();
        });

        let button;

        const setup = () => {
            render(<SignUpPage />);
            const usernameInput = screen.getByLabelText("Username");
            const emailInput = screen.getByLabelText("E-mail");
            const passwordInput = screen.getByLabelText("Password");
            const passwordRepeatInput = screen.getByLabelText("Password Repeat");

            userEvent.type(usernameInput, "habibullah_turkmen");
            userEvent.type(emailInput, "habibullahturkmen204@gmail.com");
            userEvent.type(passwordInput, "password123");
            userEvent.type(passwordRepeatInput, "password123");
            button = screen.queryByRole("button", { name: "Sign Up" });
        }

        it('enables the button when password and password repeat fields have same value', () => {
            setup();
            expect(button).toBeEnabled();
        });

        it('sends username, email, and password to backend after clicking the Sign Up button', async () => {
            setup();
            userEvent.click(button);

            await screen.findByText("Please check your e-mail to activate your account");

            expect(requestBody).toEqual({
                username: "habibullah_turkmen",
                email: "habibullahturkmen204@gmail.com",
                password: "password123"
            });
        });

        it('disables the button when there is an ongoing api call', async () => {
            setup();
            userEvent.click(button);
            userEvent.click(button);

            await screen.findByText("Please check your e-mail to activate your account");

            expect(counter).toBe(1);
        });

        it('displays spinner while the api request is in progress', () => {
            setup();
            userEvent.click(button);
            const spinner = screen.getByRole('status', { hidden: true });
            expect(spinner).toBeInTheDocument();
        });

        it('does not display spinner when there is no api request', () => {
            setup();
            const spinner = screen.queryByRole('status', { hidden: true });
            expect(spinner).not.toBeInTheDocument();
        });

        it('displays account activation notification after clicking the submit button', async () => {
            setup();
            userEvent.click(button);
            const text = await screen.findByText("Please check your e-mail to activate your account");
            expect(text).toBeInTheDocument();
        });

        it('should not display account activation notification before clicking the submit button', () => {
            setup();
            const text = screen.queryByText("Please check your e-mail to activate your account");
            expect(text).not.toBeInTheDocument();
        });

        it('hides sign up form after successful sign up request', async () => {
            setup();
            const form = screen.getByTestId("form-sign-up");
            userEvent.click(button);
            await waitFor(() => {
                expect(form).not.toBeInTheDocument();
            });
        });

        it('displays validation message for username', async () => {
            server.use(
                rest.post('/api/1.0/users', (req, res, ctx) => {
                    return res(
                        ctx.status(400),
                        ctx.json({
                            validationErrors: { username: "Username cannot be null" }
                        })
                    );
                })
            );
            setup();
            userEvent.click(button);
            const validationError = await screen.findByText("Username cannot be null");
            expect(validationError).toBeInTheDocument();
        });
    });
});