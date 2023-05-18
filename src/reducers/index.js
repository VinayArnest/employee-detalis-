import { combineReducers } from "redux";
import { UpdateEmployeereducer } from "./employeeReducer";
import { SelectedEmployee } from "./employeeReducer";
const reducers = combineReducers({
  allEmployee: UpdateEmployeereducer,
  selectedEmp: SelectedEmployee,
});

export default reducers;
