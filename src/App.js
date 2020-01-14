import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './assets/css/App.css';
import SignPage from './containers/SignPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route 
              exact
              path='/login'
              render={(props) => <SignPage {...props}/>}
            />
            <Route 
              exact
              path='/register'
              render={(props) => <SignPage {...props}/>}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
