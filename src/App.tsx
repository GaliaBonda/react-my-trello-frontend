import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './app.scss';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';

function Main(): JSX.Element {
  return <Home />;
}

function About(): JSX.Element {
  return <Board />;
}

export default function App(): JSX.Element {
  return (
    <Router>
      <div>
        <nav className="nav">
          <ul>
            <li>
              <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link>
            </li>
            <li>
              <Link to={`${process.env.PUBLIC_URL}/board`}>Board</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path={`${process.env.PUBLIC_URL}/board`}>
            <About />
          </Route>
          <Route path={`${process.env.PUBLIC_URL}/`}>
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
