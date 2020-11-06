import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext/UserContext";
import { toggleCompleteTask } from "../../services/tasks";
import styles from "./Task.module.css";

class Task extends Component {
  state = { done: this.props.task.isComplete };

  handleClick = async () => {
    const { status, data } = await toggleCompleteTask(this.props.task);
    if (status) {
      this.setState({ done: data.isComplete });
    } else {
      console.log(data);
    }
  };

  handleDelete = () => {
    const { onDelete, task } = this.props;
    onDelete(task.id);
  };

  render() {
    const { task } = this.props;
    const { id, name } = this.context;
    console.log(id, name);
    return (
      <UserContext.Consumer>
        {({ id, name }) => (
          <li
            onClick={this.handleClick}
            className={this.state.done ? styles.completed : styles.task}
          >
            <div className={styles.label}>
              <span>
                id: {id} name: {name}
              </span>
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
        )}
      </UserContext.Consumer>
    );
  }
}

export default Task;
