import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
  return (
    <>
      <h1>Bienvenido a la ToDoApp</h1>
      <h2>La app de tareas!</h2>

      <div>
        <h2>Estado actual: {props.state.number}</h2>
        <button type="button" onClick={() => props.onIncrement()}>Sumar</button>
        <button type="button" onClick={() => props.onDecrement()}>Restar</button>
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    state: state
  };
}

const mapActionsToProps = dispatch => {
  return {
    onIncrement: () => dispatch({ type: 'INCREMENT', payload: { step: 3 } }),
    onDecrement: () => dispatch({ type: 'DECREMENT', payload: { step: 5 } })
  }
}

export default connect(mapStateToProps, mapActionsToProps)(HomePage);