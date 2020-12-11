import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { deleteTask, getTasks, toggleCompleteTask } from "../../services/tasks";
import styles from "./Task.module.css";

const Task = (props) => {
  const [done, setDone] = useState(props.task.isComplete);
  const [error, setError] = useState('');

  const handleClick = async () => {
    const { status, data } = await toggleCompleteTask(props.task);
    if (status) {
      setDone(data.isComplete);
    } else {
      setError('No se pudo cambiar el estado de la tarea');
    }
  };

  const getTaskList = async () => {
    props.onTasksLoading();
    const response = await getTasks();
    if (response.status) {
      props.setTasks(response.data);
    }
    props.onTasksLoaded();
  };

  const handleDelete = async () => {
    const { status } = await deleteTask(props.id);
    if (status) {
      getTaskList();
    } else {
      //setError(data);
    }
  };

  const { task } = props;
  return (
    <li className={done ? styles.completed : styles.task}>
      <div className={styles.label} onClick={handleClick}>
        {task.name}
        {done && (
          <button className={styles.button} onClick={handleDelete}>
            X
          </button>
        )}
        <Link className={styles.details} to={`/tasks/${task.id}`}>
          Detalles
        </Link>
      </div>
      <span className="error">{error}</span>
    </li>
  );
};

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    isLoading: state.isLoading
  };
}

const mapActionsToProps = dispatch => {
  return {
    onTasksLoading: userId => dispatch({ type: 'LOAD_TASKS_INIT',  userId }),
    onTasksLoaded: userId => dispatch({ type: 'LOAD_TASKS_COMPLETED',  userId }),
    setTasks: tasks => dispatch({ type: 'UPDATE_TASKS', payload: { tasks }})
  }
}

export default connect(mapStateToProps, mapActionsToProps)(withRouter(Task));
