import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTask } from "../../services/tasks";

function TaskDetail(props) {
  const params = useParams();

  const [counter, setCounter] = useState(0);
  const [task, setTask] = useState({});
  const id = params.id;

  const getTaskDetails = async (id) => {
    const response = await getTask(id);
    if (response.status) {
      setTask(response.data);
    }
  };

  useEffect(() => {
    getTaskDetails(id);
  }, [id]);

  return (
    <>
      <h1>Tarea: {task?.name}</h1>
      <h2 onClick={() => setCounter(counter + 1)}>Cliks {counter}</h2>
    </>
  );
}

export default TaskDetail;
