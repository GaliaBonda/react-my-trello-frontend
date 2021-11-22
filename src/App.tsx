import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './app.scss';
import './styles/normalize.css';
import './styles/reset.css';
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
    <Router basename="/react-my-trello-frontend">
      <div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/board">Board</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/board/:board_id">
            <About />
          </Route>
          <Route path="/board">
            <About />
          </Route>
          <Route path="/">
            <Main />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
