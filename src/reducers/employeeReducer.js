import { ActionType } from "../constants/ActionsTypes";
const initialState = {
  employees: [],
};

export const UpdateEmployeereducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case ActionType.UPDATE_EMPLOYEE:
      return { ...state, employees: payload };
    default:
      return state;
  }
};

export const SelectedEmployee = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionType.SELECTED_EMPLOYEE:
      return { ...state, employees: payload };
    default:
      return state;
  }
};
