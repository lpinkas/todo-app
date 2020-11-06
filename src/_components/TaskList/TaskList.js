import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getTasks, createTask, deleteTask } from "../../services/tasks";
import Loader from "../Loader/Loader";
import { Task } from "../Task";
import "./TaskList.css";

function TaskList({ header, history }) {
  const [tasks, setTasks] = useState([]);
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const getTaskList = async () => {
    const response = await getTasks();
    if (response.status) {
      setTasks(response.data);
      setNewTaskDesc("");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getTaskList();
  }, []);

  const handleDelete = async (id) => {
    const { status, data } = await deleteTask(id);
    if(status) {
      getTaskList();
    } else {
      setError(data);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    getTaskList();
  };

  const handleCreate = async () => {
    const newTask = {
      name: newTaskDesc,
      isComplete: false,
    };

    setNewTaskDesc("");

    const { status, data } = await createTask(newTask);
    if(status) {
      getTaskList();
    } else {
      setError(data);
    }

  };

  const handleDescChange = (e) => {
    setNewTaskDesc(e.target.value);
    setError('');
  }

  const goBack = () => history.goBack();

  return (
    <Fragment>
      <div style={{ textAlign: "start" }}>
        <button className="backButton" type="button" onClick={goBack}>
          {" "}
          Volver
        </button>
      </div>
      <h1>{header}</h1>
      <div>
        <input
          type="text"
          placeholder="Descripcion de la tarea"
          onChange={handleDescChange}
          value={newTaskDesc}
        ></input>
        {error && <span className="error">{error}</span>}
      </div>
      <div className="buttonContainer">
        <button
          className="button"
          onClick={handleCreate}
          disabled={!newTaskDesc}
        >
          Agregar
        </button>
        <button className={["button reload"]} onClick={handleReload}>
          Refrescar
        </button>
      </div>

      {isLoading && <Loader></Loader>}
      <ul className="list">
        {tasks.map((task) => (
          <Task task={task} onDelete={handleDelete} key={task.id} />
        ))}
      </ul>
    </Fragment>
  );
}

export default withRouter(TaskList);
