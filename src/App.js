import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import HomePage from "./pages/HomePage";
import JobDetails from "./pages/JobDetails";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <Switch>
            <Route path="/" exact component={HomePage}/>
            <Route path="/jobs/:jobID" component={JobDetails}/>
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
