import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <>
      <h1>Bienvenido a la ToDoApp</h1>
      <h2>La app de tareas!</h2>

      <Link to="/tasks">Ver todas las tareas (Router)</Link>

      <a href="/tasks">Ver todas las tareas (anchore)</a>
    </>
  );
}

export default HomePage;