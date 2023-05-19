import React, { Component } from 'react';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        password: ''
      };
    }
  
    handleInputChange = (event) => {
      const target = event.target;
      const value = target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    handleSubmit = (event) => {
      event.preventDefault();
      // TODO: add login functionality
    }
  
    render() {
      return (
        <div>
          <h2>Login</h2>
          <form onSubmit={this.handleSubmit}>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange} />
            </label>
            <br />
            <button type="submit">Submit</button>
           
          </form>
        </div>
      );
    }
  }
  export default Login;