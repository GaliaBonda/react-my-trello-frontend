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

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
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

// function Child(): JSX.Element {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   const { board_id } = useParams<{ board_id: string }>();

//   return (
//     <div>
//       <h3>ID: {board_id}</h3>
//     </div>
//   );
// }
