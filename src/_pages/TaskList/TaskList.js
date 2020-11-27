import React, { Fragment, useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { userContext } from "../../context/UserContext/context";
import {
  getTasks,
  createTask,
  deleteTask,
  getTypes,
} from "../../services/tasks";
import Loader from "../../_components/Loader/Loader";
import Task from "../../_components/Task/Task";
import "./TaskList.css";

const TaskList = (props) => {
  const { user } = useContext(userContext).stateUser;

  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [error, setError] = useState("");

  const { tasks, setTasks, isLoading, header } = props;

  const getTaskList = async () => {
    props.onTasksLoading();
    const response = await getTasks();
    if (response.status) {
      setTasks(response.data);
      setNewTaskDesc("");
    }
    props.onTasksLoaded();
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const handleReload = () => {
    getTaskList();
  };

  const handleCreate = async () => {
    const newTask = {
      name: newTaskDesc,
      isComplete: false,
      userId: user.id,
    };

    setNewTaskDesc("");

    const { status, data } = await createTask(newTask);
    if (status) {
      getTaskList();
    } else {
      setError(data);
    }
  };

  const handleDescChange = (e) => {
    setNewTaskDesc(e.target.value);
    setError("");
  };
  return (
    <Fragment>
      <h1>{header}</h1>
      <form onSubmit={handleCreate}>
        <div>
          <input
            type="text"
            placeholder="Descripcion de la tarea"
            onChange={handleDescChange}
            value={newTaskDesc}
          ></input>
        </div>
        {error && <span className="error">{error}</span>}
        <div className="buttonContainer">
          <button
            type="submit"
            className="button"
            onClick={handleCreate}
            disabled={!newTaskDesc}
          >
            Agregar
          </button>
          <button
            type="button"
            className={["button reload"]}
            onClick={handleReload}
          >
            Refrescar
          </button>
        </div>
      </form>

      {isLoading && <Loader></Loader>}
      <ul className="list">
        {tasks.map((task) => (
          <Task task={task} key={task.id} id={task.id} />
        ))}
      </ul>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    isLoading: state.isLoading,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    onTasksLoading: (userId) => dispatch({ type: "LOAD_TASKS_INIT", userId }),
    onTasksLoaded: (userId) =>
      dispatch({ type: "LOAD_TASKS_COMPLETED", userId }),
    setTasks: (tasks) => dispatch({ type: "UPDATE_TASKS", payload: { tasks } }),
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(TaskList));
