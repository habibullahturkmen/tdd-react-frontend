import React from "react";

class SignUpPage extends React.Component {
    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <label htmlFor="username">Username</label>
                <input id="username" />
                <label htmlFor="email">E-mail</label>
                <input id="email" />
                <label htmlFor="password">Password</label>
                <input id="password" type="password" />
                <label htmlFor="password-repeat">Password Repeat</label>
                <input id="password-repeat" type="password" />
                <button disabled>Sign Up</button>
            </div>
        );
    }
}

export default SignUpPage;