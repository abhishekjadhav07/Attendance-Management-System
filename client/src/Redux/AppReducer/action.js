import * as types from "./actionTypes";

import axios from "axios";

const getStudents = (payload) => {
  return { type: types.GET_STUDENTS, payload };
};

const getStudentsRequest = () => {
  return { type: types.GET_STUDENTS_REQUEST };
};

const getStudentsSuccess = () => {
  return { type: types.GET_STUDENTS_SUCCESS };
};

const getStudentsError = () => {
  return { type: types.GET_STUDENTS_ERROR };
};

const addStudentsRequest = () => {
  return { type: types.ADD_STUDENTS_REQUEST };
};

const addStudentsSuccess = () => {
  return { type: types.ADD_STUDENTS_SUCCESS };
};

const addStudentsError = () => {
  return { type: types.ADD_STUDENTS_ERROR };
};

const addLectureRequest = () => {
  return { type: types.ADD_LECTURE_REQUEST };
};
const addLecturesuccess = () => {
  return { type: types.ADD_LECTURE_SUCCESS };
};
const addLecturfailure = () => {
  return { type: types.ADD_LECTURE_ERROR };
};

const addStudents = (payload) => (dispatch) => {
  dispatch(addStudentsRequest());
  return axios
    .post(`http://localhost:5000/students/addstudent`, payload)
    .then((res) => {
      console.log(res.data.msg);
      if (res.data.msg == "Student Added Successfully") {
        setTimeout(function () {
          dispatch(addStudentsError());
        }, 1000);
        dispatch(addStudentsSuccess());
      } else if (res.data.msg == "Something Went Wrong") {
        let x = document.getElementById("snackbar");
        x.innerText = res.data.msg;
        x.style.backgroundColor = "red";
        x.className = "show";
        setTimeout(function () {
          x.className = x.className.replace("show", "");
          dispatch(addStudentsError());
        }, 3000);
      }
    })
    .catch((err) => {
      dispatch(addStudentsError());
      console.log(err);
    });
};

const addLecture = (payload) => async (dispatch) => {
  dispatch(addLectureRequest());
  try {
    dispatch(addLectureRequest());
    let res = await axios.post(`http://localhost:5000/attendance`, payload);
    console.log(res.data);
    if (res.data.message == "Attendence Recorded Successfully") {
      let x = document.getElementById("snackbar");
      x.innerText = res.data.message;
      x.style.backgroundColor = "green";
      x.className = "show";
      setTimeout(function () {
        x.className = x.className.replace("show", "");
        dispatch(addLecturesuccess());
      }, 3000);
      dispatch(addLecturesuccess());
    }
  } catch (err) {
    dispatch(addLecturfailure());
  }
};

export {
  getStudents,
  getStudentsError,
  getStudentsRequest,
  getStudentsSuccess,
  addStudents,
  addStudentsError,
  addStudentsRequest,
  addStudentsSuccess,
  addLecture,
  addLectureRequest,
  addLecturesuccess,
  addLecturfailure,
};
