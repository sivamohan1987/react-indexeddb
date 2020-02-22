import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import { DBConfig } from './DBConfig';
import { initDB } from 'react-indexed-db';
import Login from './containers/login';
import Transactions from './containers/transactions';
import PrivateRoute from './utils/privateRoute';

initDB(DBConfig);

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <NavLink activeClassName='active' to='/transactions' style={{textDecoration: 'none'}}>Transactions</NavLink>{' '}
          <NavLink activeClassName='active' to="/login" style={{textDecoration: 'none'}}>Login</NavLink>
        </nav>
        <main>
          <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/transactions" component={Transactions} />
            <Route render={() => <h1>Page not found</h1>} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
