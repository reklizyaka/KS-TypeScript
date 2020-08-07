// import axios from "axios";
// import { ITask } from "@/interfaces";
// import tasks from "../store/tasks";

// const state = {
//   taskID: null,
// };

// const actions = {
//   requestGetAllTasks({ commit }: any, mail: string) {
//     const url = "https://raysael.herokuapp.com/todo?author=";
//     axios
//       .get(`${url}${mail}`)
//       .then((response) => {
//         const tasksArr = response.data;
//         tasksArr.forEach((taskObj: any) => {
//           commit("CREATE_TASK", taskObj);
//         });
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Something wrong...");
//       });
//   },
//   requestAddNewTask({ commit }: any, taskObj: any) {
//     const url = "https://raysael.herokuapp.com/todo";
//     axios
//       .post(`${url}`, taskObj, {
//         headers: {
//           "Content-Type": "application/json;charset=UTF-8",
//           "Access-Control-Allow-Origin": "*",
//         },
//       })
//       .then((response) => {
//         commit("CREATE_TASK", response.data);
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Something wrong...");
//       });
//   },
//   requestEditTask({ commit }: any, id: any) {
//     const taskID = tasks.find((task: ITask) => task.id === id) || null;
//     const url = "https://raysael.herokuapp.com/todo/";
//     axios.patch(`${url}${taskID}`, id).catch((err) => {
//       console.error(err);
//       alert("Something wrong...");
//     });
//   },
//   requestDeleteTask({ commit }: any, taskID: any) {
//     const url = "https://raysael.herokuapp.com/todo/";
//     axios
//       .delete(`${url}${taskID}`)
//       .then((response) => {
//         if (response.statusText == "OK") {
//           commit("REMOVE_TASK", taskID);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Something wrong...");
//       });
//   },
// };

// export const requests = {
//   namespaced: true,
//   actions,
// };
