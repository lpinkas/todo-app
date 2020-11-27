export default function (state = { isLoading: false, tasks: [] }, action) {
  switch (action.type) {
    case "LOAD_TASKS_INIT":
      return {
        ...state,
        isLoading: true,
      };
    case "LOAD_TASKS_COMPLETED":
      return {
        ...state,
        isLoading: false,
      };
    case "UPDATE_TASKS":
      return {
        ...state,
        tasks: action.payload.tasks,
        isLoading: false,
      };
    case "DELETE_TASK":
      return {
        ...state,
      }
    default:
      return state;
  }
}
