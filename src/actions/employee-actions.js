import { ActionType } from "../constants/action-types";

/**
 * the totalEmpData is an action which invokes a reducer/Employeereducer reducer and this take parameter
 * as all Employee Detalis
 * @param {*} empdata
 * @returns type of action ,data dispatched from dispatch method from components
 */
export const totalEmpData = (empdata) => {
  return {
    type: ActionType.ALL_EMPLOYEES,
    payload: empdata,
  };
};

/**
 * the selectedEmp is an action which invokes a reducer/Employeereducer and this take parameter
 * as selected Employee Detalis
 * @param {*} sempdata
 * @returns type of action ,data dispatched from dispatch method from components
 */
export const selectedEmp = (sempdata) => {
  return {
    type: ActionType.SELECTED_EMPLOYEE,
    payload: sempdata,
  };
};
