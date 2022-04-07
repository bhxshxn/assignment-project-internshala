import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import "./styles.css";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Cookies from 'js-cookie'
import ChangePassword from "./components/ChangePassword";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar status="notLogged" />
        <Switch>
          <Route path="/login">
            {Cookies.get('user') ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/changePassword">
            {Cookies.get('user') ? <ChangePassword /> : <Login />}
          </Route>
          <Route path="/">
            {Cookies.get('user') ? <Home /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
