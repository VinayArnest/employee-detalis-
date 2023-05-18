import { ActionType } from "../constants/action-types";
/**
 * initialState of reducer
 */
const initialState = {
  employees: [],
};

/**
 * the below method is to update the reducer state data with payload
 * @param {*} state
 * @param {*} type of action and payload data
 * @returns modified data of state to App
 */

export const Employeereducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.ALL_EMPLOYEES:
      return { ...state, employees: payload };
    case ActionType.SELECTED_EMPLOYEE:
      return { ...state, employees: payload };
    default:
      return state;
  }
};
