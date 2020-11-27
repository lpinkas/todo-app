export default function (state = { number: 0 }, action) {
  const step = action.payload && action.payload.step;
  switch (action.type) {
    case "INCREMENT":
      return { number: state.number + (step || 1) };
    case "DECREMENT":
      return {number: state.number - (step || 1) };
    default:
      return state;
  }
}
