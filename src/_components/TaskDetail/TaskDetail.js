import React, { useEffect, useState } from "react";
import { getTask } from "../../services/tasks";

function TaskDetail(props) {
  const [counter, setCounter] = useState(0);
  const [task, setTask] = useState({});
  const id = props.match.params.id;

  const getTaskDetails = async (id) => {
    const response = await getTask(id);
    if (response.status) {
      setTask(response.data);
    }
  };

  useEffect(() => {
    getTaskDetails(id);
  }, [id]);

  const goBack = () => props.history.goBack();

  return (
    <>
      <div style={{ textAlign: "start" }}>
        <button className="backButton" type="button" onClick={goBack}>
          {" "}
          Volver
        </button>
      </div>
      <h1>Tarea: {task?.name}</h1>
      <h2 onClick={() => setCounter(counter + 1)}>Cliks {counter}</h2>
    </>
  );
}

export default TaskDetail;
