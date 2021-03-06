import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import PublicRoute from "./_components/Routes/PublicRoute";
import PrivateRoute from "./_components/Routes/PrivateRoute";
import { HomePage, Register, Login, TaskList, TaskDetail } from "./_pages/";
import { Provider } from "react-redux";
import taskStore from "./redux/Tasks";
import Auth from "./context/UserContext/context";

function App() {
  return (
    <div className="App">

      <Auth>
        <Provider store={taskStore}>
          <Router>
            Learn
            <Switch>
              {/* <Route path="/welcome" exact component={LandingPage} />*/ }

              <PublicRoute path="/login" exact component={Login} />
              <PublicRoute path="/register" exact component={Register} />

              <PrivateRoute path="/tasks" exact component={TaskList} />
              <PrivateRoute path="/tasks/:id" exact component={TaskDetail} />
              <PrivateRoute exact path="/" component={HomePage} />
            </Switch>

          </Router>
        </Provider>
      </Auth>
    </div>
  );
}

export default App;
