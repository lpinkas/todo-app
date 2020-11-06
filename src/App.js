import React, { useContext } from "react";
import { Link, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext/UserContext";
import Login from "./_components/Login";
import TaskDetail from "./_components/TaskDetail/TaskDetail";
import TaskList from "./_components/TaskList/TaskList";

function HomePage() {
  return (
    <>
      <h1>Bienvenido a la ToDoApp</h1>
      <h2>La app de tareas!</h2>

      <Link to="/tasks">Ver todas las tareas (Router)</Link>

      <a href="/tasks">Ver todas las tareas (anchore)</a>
    </>
  );
}

function NotFound() {
  return <h1>No se encontro lo que buscaba...</h1>;
}

function Layout({ children }) {
  const id = useContext(UserContext).id;
  return (
    <>
      <h1>Header layout {id}</h1>
      {children}
    </>
  );
}


function App() {
  const isAuth = true;
  return (
    <div className="App">
      {isAuth && (

        <Layout>
          <Router>
            <Switch>
              <Route exact path="/" >
                <HomePage />
              </Route>
              <Route exact path="/tasks">
                <TaskList header="Tareas del día" />
              </Route>
              <Route path="/tasks/:id" component={TaskDetail} />
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </Router>
          </Layout>

      )}

      {!isAuth && <Login />}
    </div>
  );
}

export default App;
