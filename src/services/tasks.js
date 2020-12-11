import instance from "./configure";

const resource = '/todos';

export async function getTasks() {
  let tasks = [];
  try {
    const response = await instance.get(resource);
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
    const response = await instance.get(`${resource}/${id}`);
    if (response.status === 200) {
      return { status: true, data: response.data };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}

export async function createTask(task) {
  try {
    const response = await instance.post(`${resource}/`, task);
    if (response.status === 201) {
      return { status: true, data: response.data };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}

export async function deleteTask(id) {
  try {
    const response = await instance.delete(`${resource}/${id}`);
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
    const response = await instance.put(`${resource}/${task.id}`, task);
    if (response.status === 204) {
      return { status: true, data: task };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}

export async function getTypes(id) {
  try {
    const response = await instance.get(`${resource}/types`);
    if (response.status === 200) {
      return { status: true, data: response.data };
    }
  } catch (error) {
    return { status: false, data: error.message };
  }
}
