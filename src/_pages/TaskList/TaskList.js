import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getTasks, createTask, deleteTask, getTypes } from "../../services/tasks";
import Loader from "../../_components/Loader/Loader";
import Task from "../../_components/Task/Task";
import "./TaskList.css";

const TaskList = ({ header, history }) => {
  const [tasks, setTasks] = useState([]);
  const [types, setTypes] = useState([]);
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [type, setType] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  const getTaskList = async () => {
    const response = await getTasks();
    if (response.status) {
      setTasks(response.data);
      setNewTaskDesc("");
    }
    setIsLoading(false);
  };

  const getTaskTypes = async () => {
    const response = await getTypes();
    if (response.status) {
      setTypes(response.data);
      setType(response.data[0].id);
    }
    setIsLoading(false);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  }



  useEffect(() => {
    getTaskList();
    getTaskTypes();
  }, []);

  const handleDelete = async (id) => {
    const { status, data } = await deleteTask(id);
    if (status) {
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
      type,
      isComplete: false,
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
          <select onChange={handleTypeChange}>
            {types && types.map(t => (
              <option value={t.id}>{t.descripcion}</option>
            ))}
          </select>
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
          <Task task={task} onDelete={handleDelete} key={task.id} />
        ))}
      </ul>
    </Fragment>
  );
}

export default withRouter(TaskList);
