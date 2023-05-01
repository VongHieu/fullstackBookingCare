import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { FormattedMessage } from "react-intl";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
    };
  }

  handleOnChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
    console.log(e.target.value);
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleSubmitLogin = () => {};

  handleShowPassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-section">
            <h2 className="text-center pt-3 text-color mb-2">
              Login Booking Care
            </h2>
            <div className="form-login">
              <div class="form-group">
                <label for="">Username</label>
                <div className="input-icon">
                  <input
                    type="text"
                    class="form-input"
                    name="username"
                    placeholder="Type your username"
                    value={this.state.username}
                    onChange={(e) => this.handleOnChangeUsername(e)}
                  />
                  <i class="fas fa-user input-icon-login"></i>
                </div>
              </div>
              <div class="form-group">
                <label for="">Password</label>
                <div className="input-icon">
                  <input
                    type={this.state.isShowPassword ? "text" : "password"}
                    class="form-input"
                    name="password"
                    placeholder="Type your password"
                    value={this.state.password}
                    onChange={(e) => this.handleOnChangePassword(e)}
                  />
                  <i class="fas fa-lock input-icon-login"></i>
                  <span onClick={() => this.handleShowPassword()}>
                    <i
                      class={
                        this.state.isShowPassword
                          ? "fas fa-eye input-icon-eye"
                          : "fas fa-eye-slash input-icon-eye"
                      }
                    ></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2 mb-3">
              <span className="forgot-password">Forgot Password?</span>
            </div>
            <div className="mb-5">
              <button
                className="btn-login"
                onClick={() => this.handleSubmitLogin()}
              >
                Log in
              </button>
            </div>
            <p className="text-center mt-5 mb-4">or sign in with</p>
            <div className="login-other">
              <a href="#" className="social-login google">
                <i class="fab fa-google"></i>
              </a>
              <a href="#" className="social-login facebook">
                <i class="fab fa-facebook-f"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    adminLoginSuccess: (adminInfo) =>
      dispatch(actions.adminLoginSuccess(adminInfo)),
    adminLoginFail: () => dispatch(actions.adminLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
