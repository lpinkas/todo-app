import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { getTasks } from "../../services/tasks";
import Loader from "../Loader/Loader";
import { Task } from "../Task";
import "./TaskList.css";

function TaskList({ header, history }) {
  const [tasks, setTasks] = useState([]);
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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

  const handleDelete = (id) => {
    //setTasks(tasks.filter(task => task.id !== id));
    //Implementar llamado a la api
  };

  const handleReload = () => {
    setIsLoading(true);
    getTaskList();
  };

  const handleCreate = () => {
    const newTask = {
      id: tasks.length + 2,
      title: newTaskDesc,
      createdAt: new Date().toISOString(),
    };

    setNewTaskDesc("");

    //setTasks([newTask, ...this.state.tasks]);
    //Implementar llamado a la api
  };

  const handleDescChange = (e) => setNewTaskDesc(e.target.value);

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
