import { SET_STUDENT_RECORDS, FETCH_STUDENT_RECORD, REGISTER_STUDENT, UPDATE_STUDENT_RECORDS } from '../actions/types';

const initialState = {
  studentRecords: [],
  studentCollection: [],
  studentProfileData: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_STUDENT_RECORDS:
      return {
        ...state,
        studentRecords: action.payload
      };
    case REGISTER_STUDENT:
      return {
        ...state,
        studentCollection: action.payload
      };
    case FETCH_STUDENT_RECORD:
      return {
        ...state,
        studentProfileData: action.payload
      };
    case UPDATE_STUDENT_RECORDS:
      return {
        ...state,
        studentRecords: action.payload
      };
    default:
      return state;
  }
}