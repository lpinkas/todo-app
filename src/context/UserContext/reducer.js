import { SET_CURRENT_USER } from "./actions";

export default function (state, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload,
        user: action.payload,
      };
    default:
      return state;
  }
}
