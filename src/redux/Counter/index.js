import { createStore } from "redux";
import CounterReducer from "./reducer";

export default createStore(CounterReducer);
