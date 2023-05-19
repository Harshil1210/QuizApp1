import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleRegister = (event) => {
    
    event.preventDefault();

    let getOldDataFormLocal =
      JSON.parse(localStorage.getItem("RegisterData")) === null
        ? []
        : JSON.parse(localStorage.getItem("RegisterData"));
    let arr = [];
    arr.push(...getOldDataFormLocal, this.state);
    localStorage.setItem("RegisterData", JSON.stringify(arr));
    console.log("RegisteredData", arr);
    alert("SuccessFully Registered");

    this.setState({

     username: "",
      password: "",
      email: "",
    });
  };
  render() {
    return (
     
      <div className="container">
        
        <div className="screen">
          <div className="screen__content">
            <form className="login">
              <span id="hello"> <h4>REGISTER YOURSELF</h4></span> 
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder=" User Name"
                  name="username"
                  value={(this.state.username )}
                  onChange={(e) => this.handleInputChange(e)}
                />
              </div>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="Email"
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
              <Link className="button login__submit " to="/register" onClick={this.handleRegister}>
                <span className="button__text">Register</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </Link>
              
              <Link className="button login__submit " to="/">
                 <span className="button__text"> Sign IN</span>
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
    );
  }
}
export default Register;
