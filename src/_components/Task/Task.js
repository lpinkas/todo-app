import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Task.module.css";

class Task extends Component {
  state = { done: this.props.task.isCompleted };

  handleClick = () => {
    this.setState({ done: !this.state.done });
    //Implementar llamado a la api para cambiar el estado
  };

  handleDelete = () => {
    const { onDelete, task } = this.props;
    onDelete(task.id);
  };

  render() {
    const { task } = this.props;
    return (
      <li
        onClick={this.handleClick}
        className={this.state.done ? styles.completed : styles.task}
      >
        <div className={styles.label}>
          {task.name}
          {this.state.done && (
            <button className={styles.button} onClick={this.handleDelete}>
              X
            </button>
          )}
          <Link className={styles.details} to={`/tasks/${task.id}`}>
            Detalles
          </Link>
        </div>
      </li>
    );
  }
}

export default Task;
