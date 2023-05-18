import { combineReducers } from "redux";
import { Employeereducer } from "./employee-reducer";
/**
 * combining the reducer from employee-reducer file
 */
const reducers = combineReducers({
  selectedEmp: Employeereducer,
});

export default reducers;
