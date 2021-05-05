import "./App.css";
import Form from "./Form";
import Display from "./Display";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route excat path="/form">
            <Form />
          </Route>
          <Route excat path="/">
            <Display />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
