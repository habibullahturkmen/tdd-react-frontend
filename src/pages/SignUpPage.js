import React from "react";
import axios from "axios";

class SignUpPage extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        passwordRepeat: '',
        apiProgress: false,
        signUpSuccess: false,
        errors: {}
    }

    onChange = (event) => {
        const { id, value } = event.target;
        this.setState({
            [id]: value
        });
    }

    submit = async (event) => {
        event.preventDefault();
        const { username, email, password } = this.state;
        const body = {
            username: username,
            email: email,
            password: password
        }
        this.setState({apiProgress: true});
        try {
            await axios.post("/api/1.0/users", body);
            this.setState({ signUpSuccess: true });
        } catch (error) {
            if (error.response.status === 400) {
                this.setState({ errors: error.response.data.validationErrors });
            }
        }
    }

    render() {
        let disabled = true;
        const { password, passwordRepeat, apiProgress, signUpSuccess, errors } = this.state;
        if (password && passwordRepeat) {
            disabled = password !== passwordRepeat;
        }
        return (
            <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2">
                { !signUpSuccess && <form className="card mt-5" data-testid="form-sign-up">
                    <div className="card-header">
                        <h1 className="text-center">Sign Up</h1>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input id="username" onChange={this.onChange} className="form-control"/>
                            <span>{ errors.username }</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">E-mail</label>
                            <input id="email" onChange={this.onChange} className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input id="password" type="password" onChange={this.onChange} className="form-control"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordRepeat" className="form-label">Password Repeat</label>
                            <input id="passwordRepeat" type="password" onChange={this.onChange} className="form-control"/>
                        </div>
                        <div className="text-center">
                            <button disabled={disabled || apiProgress} onClick={this.submit} className="btn btn-primary">
                                { apiProgress && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> }
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form> }
                { signUpSuccess && <div className="alert alert-success mt-3">Please check your e-mail to activate your account</div> }
            </div>
        );
    }
}

export default SignUpPage;