import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import History from './components/History';

const App: React.FC = () => (
  <div className="App">
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/history/:id" component={History} />
        </Switch>
      </div>
    </Router>
  </div>
);

export default App;
