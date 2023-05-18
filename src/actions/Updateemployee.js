import { ActionType } from "../constants/ActionsTypes";
export const updateEmployee = (empdata) => {
  return {
    type: ActionType.UPDATE_EMPLOYEE,
    payload: empdata,
  };
};
export const selectEmp = (sempdata) => {
  return {
    type: ActionType.SELECTED_EMPLOYEE,
    payload: sempdata,
  };
};
