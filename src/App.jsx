import React from 'react';
import { BrowserRouter as Router,Route } from 'react-router-dom';
import Home from './view/home';
import Login from './view/login';
class App extends React.Component {

  render() {
    return (
      <Router>
        <Route component={Home}
            path="/home"
        />
        <Route component={Login}
            path="/login"
        />
      </Router>

    );
  }
}
export default App;
