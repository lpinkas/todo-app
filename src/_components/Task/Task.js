import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserContext";
import { toggleCompleteTask } from "../../services/tasks";
import styles from "./Task.module.css";

const Task = (props) => {
  const [done, setDone] = useState(props.task.isComplete);

  const handleClick = async () => {
    const { status, data } = await toggleCompleteTask(props.task);
    if (status) {
      setDone(data.isComplete);
    } else {
      console.log(data);
    }
  };

  const handleDelete = () => {
    const { onDelete, task } = props;
    onDelete(task.id);
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
    </li>
  );
};

export default Task;
