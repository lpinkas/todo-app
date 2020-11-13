import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import "./App.css";
import PublicRoute from "./_components/Routes/PublicRoute";
import PrivateRoute from "./_components/Routes/PrivateRoute";
import { HomePage, Register, Login, TaskList, TaskDetail  } from "./_pages/";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <PublicRoute path="/login" exact component={Login} />
          <PublicRoute path="/register" exact component={Register} />

          <PrivateRoute exact path="/" component={HomePage}/>
          <PrivateRoute path="/tasks" exact component={TaskList}/>
          <PrivateRoute path="/tasks/:id" exact component={TaskDetail}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
