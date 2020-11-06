import axios from "axios";

const instance = axios.create({
  baseURL: "https://localhost:5001/api",
});

export async function getTasks() {
  let tasks = [];
  try {
    const response = await instance.get("/Todo");
    console.log(response);
    if (response.status === 200) {
      tasks = response.data;
      return { status: true, data: tasks };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}

export async function getTask(id) {
  try {
    const response = await instance.get(`/Todo/${id}`);
    if (response.status === 200) {
      return { status: true, data: response.data };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}

export async function createTask(task) {
  try {
    const response = await instance.post(`/Todo/`, task);
    if (response.status === 201) {
      return { status: true, data: response.data };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}

export async function deleteTask(id) {
  try {
    const response = await instance.delete(`/Todo/${id}`);
    if (response.status === 204) {
      return { status: true, data: response.data };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}

export async function toggleCompleteTask(task) {
  try {
    task.isComplete = !task.isComplete;
    const response = await instance.put(`/Todo/${task.id}`, task);
    if (response.status === 204) {
      return { status: true, data: response.data };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}