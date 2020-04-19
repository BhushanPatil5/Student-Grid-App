import { FETCH_STUDENT_RECORD, SET_STUDENT_RECORDS, REGISTER_STUDENT, UPDATE_STUDENT_RECORDS } from './types';

/*
   fetcing individuals student record from local storage
   for profile details and updating the profile details
*/
export const fetchStudentRecord = (id) => dispatch => {
  let records = JSON.parse(localStorage.getItem("students"))
  let record = records ? records.find(item => item.id === id) : null
  if (record) {
    dispatch({
      type: FETCH_STUDENT_RECORD,
      payload: record
    })
  }
};


/*
   fetcing the student records from local storage if available
   the setting it up to redux-state to get update student records in components
*/
export const setStudentRecords = () => dispatch => {
  let updatedStudentRecord = JSON.parse(localStorage.getItem("students"))
  if (updatedStudentRecord) {
    dispatch({
      type: SET_STUDENT_RECORDS,
      payload: updatedStudentRecord
    })
  }
};



/*
  This action is responsible for registering the student 
  and create a collection of student records
*/
export const registerStudent = data => dispatch => {
  let studentCollection = []
  let newStudentCollection = []
  studentCollection = JSON.parse(localStorage.getItem("students"))
  if (Array.isArray(studentCollection) && studentCollection.length > 0) {
    for (const [i, v] of studentCollection.entries()) {
      newStudentCollection[i] = v
    }
    newStudentCollection.push(data);
    localStorage.setItem("students", JSON.stringify(newStudentCollection))
    dispatch({
      type: REGISTER_STUDENT,
      payload: newStudentCollection
    })
  }
  else {
    studentCollection = [data]
    localStorage.setItem("students", JSON.stringify(studentCollection))
    dispatch({
      type: REGISTER_STUDENT,
      payload: studentCollection
    })
  }
};


/*
   Update the student info and also local storage 
*/
export const updateStudentRecords = (data, id) => dispatch => {
  return new Promise((resolve) => {
    //simulating request
    setTimeout(() => {
      let studentRecords = JSON.parse(localStorage.getItem("students"))

      //find the index of object from array that you want to update
      const index = studentRecords.findIndex(record => record.item === id);

      // make final new array of objects by assingning updated records to match index.
      studentRecords[index] = data

      // update it in local storage also
      localStorage.setItem("students", JSON.stringify(studentRecords))
      if (studentRecords) {
        dispatch({
          type: UPDATE_STUDENT_RECORDS,
          payload: studentRecords
        })
      }
      resolve();
    }, 0);
  });
};