
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

import Home from './Components/Home';
import Register from './Components/Register';

import Quiz from './Components/Quiz';

class App extends Component {
  render() {
    return (
      <>
        <Router>
      <div>

       <Routes>
        
        <Route exact path="/" element={<Home/>}/>
       <Route exact path="/quiz" element={<Quiz/>}/>
       {/* <Route exact path="/login" element={<Login/>}/> */}
       <Route exact path="/register" element={<Register/>}/>
       </Routes>
 
      </div>
      </Router>
      </>
     
    );
  }
}
export default App;