import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../../store/actions";
import { handleLoginApi } from "../../../services";
import "./login.scss";
import { userLoginFail, userLoginSuccess } from "../../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      errorMessage: "",
    };
  }
  handleOnChangeEmail = (value) => {
    this.setState({
      email: value,
    });
  };

  handleOnChangePassword = (value) => {
    this.setState({
      password: value,
    });
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLoginForm = async (data) => {
    this.setState({
      errorMessage: "",
    });
    try {
      const data = await handleLoginApi(this.state.email, this.state.password);
      if (!data.userInfo) {
        this.setState({
          errorMessage: data.message,
        });
        this.props.userLoginFail();
      } else {
        this.props.userLoginSuccess(data.userInfo);
      }
    } catch (error) {
      this.setState({
        errorMessage: error.data.message,
      });
      userLoginFail();
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="text-login col-12">Login</div>
            <div className="login-input col-12 form-group">
              <label htmlFor="login-email">Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email"
                id="login-email"
                value={this.state.email}
                onChange={(e) => this.handleOnChangeEmail(e.target.value)}
              />
            </div>
            <div className="login-input col-12 form-group">
              <label htmlFor="login-password">Password:</label>
              <div className="custom-input__password">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter your password"
                  id="login-password"
                  value={this.state.password}
                  onChange={(e) => this.handleOnChangePassword(e.target.value)}
                />

                <span
                  className="eye-icon__wrap"
                  onClick={this.handleShowHidePassword}
                >
                  <i
                    className={`eye-icon ${
                      this.state.isShowPassword
                        ? "fas fa-eye"
                        : "far fa-eye-slash"
                    }`}
                  ></i>
                </span>
              </div>
            </div>
            <div className="col-12 text-danger">{this.state.errorMessage}</div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => this.handleLoginForm()}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <span className="forgot-password">Forgot your password?</span>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="text-other-login">Or Login with:</span>
            </div>
            <div className="col-12 social-login">
              <i className="fab fa-google-plus-g google-icon"></i>
              <i className="fab fa-facebook-f facebook-icon"></i>
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
    // adminLoginSuccess: (adminInfo) =>
    //   dispatch(actions.adminLoginSuccess(adminInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
