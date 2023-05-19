import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Register.css";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      signUpData: [],
      redirect: false,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  
  componentDidMount() {
    let getDataFromLocal = JSON.parse(localStorage.getItem("RegisterData"));
    this.setState({
      signUpData: getDataFromLocal,
    });
  }
  onSignin = (e) => {
    if(this.state.email==="" && this.state.password==="")
    {
      return alert("Invalid email or password")
    }
    let getDataFromLocal = JSON.parse(localStorage.getItem("RegisterData"));
    console.log(getDataFromLocal);
    const { email, password } = this.state;
    const arr = getDataFromLocal.find(
      (item) => item.email === email && item.password === password
    );
    console.log(arr);
    if (arr) {
      console.log("Login successful");
      alert("Login SuccessFul");
      this.setState({
        redirect: true,
      });
    } else {
      alert("Invalid email or password");
    }
  };

  render() {
    return (
      <>
        <div className="container">
          {this.state.redirect && <Navigate to="/quiz"></Navigate>}
          <div className="screen">
            <div className="screen__content">
              <form className="login">
                <span id="hello ">
                  {" "}
                  <h4>Sign In</h4>
                </span>
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <input
                    type="text"
                    className="login__input"
                    placeholder="User name / Email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => this.handleInputChange(e)}
                  />
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <input
                    type="password"
                    className="login__input"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.handleInputChange(e)}
                  />
                </div>
                <button
                  className="button login__submit "
                  onClick={(e) => this.onSignin(e)}
                >
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
                <Link className="button login__submit " to="/register">
                  <span className="button__text">Register</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </Link>
              </form>
            </div>
            <div className="screen__background">
              <span className="screen__background__shape screen__background__shape4"></span>
              <span className="screen__background__shape screen__background__shape3"></span>
              <span className="screen__background__shape screen__background__shape2"></span>
              <span className="screen__background__shape screen__background__shape1"></span>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
