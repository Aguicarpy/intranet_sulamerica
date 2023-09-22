import axios from 'axios';
const URL_BASE = 'http://localhost:3015';
export const POST_OFFICER = "POST_OFFICER"
export const LOG_USER = "LOG_USER"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const GET_DATA = "GET_DATA" 
export const GET_USER_PROFILE = "GET_USER_PROFILE"
export const USER_LOGOUT = "USER_LOGOUT"
export const DATA_POSITION = "DATA_POSITION"
export const GET_ALL_USERS = "GET_ALL_USERS"
export const DELETE_USER = "DELETE_USER"
export const CHANGE_USER_TYPE = "CHANGE_USER_TYPE"
export const CLEAR_ALERTS_STATE = "CLEAR_ALERTS_STATE"
export const GET_CONVOCATIONS = "GET_CONVOCATIONS";

export const login_success = (dataUser) => {
  return {
    type: LOGIN_SUCCESS,
    payload: dataUser,
  };
};

export const login_officer = (email, password) => {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL_BASE}/authAccess/login`, {
        email,
        password,
      });
      // console.log(response);
      if (response.status === 200) {
        const loginUser = await response.data;
        localStorage.setItem("userAuth", JSON.stringify(loginUser));
        localStorage.setItem("userLoged", "true");
        dispatch(dispatch(login_success(response.data.dataUser)));
      }
      //accede a la data segun el usuario logeado
      const response_user = await axios.get(
        `${URL_BASE}/officers/userData?email=${email}`
      );
      // console.log(response_user);
      dispatch({
        type: GET_DATA,
        payload: response_user.data,
      });
      return { success: true };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        window.alert(error.response.data.error);
      }
      return { success: false };
    }
  };
};
export function logOutUser() {
  localStorage.removeItem("userAuth"); //al cerrar la sesion elimina su almacenamiento
  localStorage.setItem("userLoged", "false");
  return {
    type: USER_LOGOUT,
  };
}

export function getAllUsers() {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${URL_BASE}/officers`);
        return dispatch({
          type: GET_ALL_USERS,
          payload: response.data,
        });
      } catch (error) {
        return error.message;
      }
    };
  }

export function deleteUser(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`${URL_BASE}/officers/userDelete?id=${id}`);
      if (response.status === 200) {
        return dispatch({
          type: DELETE_USER,
          payload: response.data,
        });
      } else {
        return dispatch({
          type: DELETE_USER,
          payload: "Ocurrio un problema",
        });
      }
    } catch (error) {
      return error.message;
    }
  };
}

export function changeUserType(id) {
    return async function (dispatch) {
      try {
        const response = await axios.put(`${URL_BASE}/officers/changetype`, { id });
        console.log(response);
        if (response.status === 200) {
          return dispatch({
            type: CHANGE_USER_TYPE,
            payload: "Tipo de usuario cambiado",
          });
        } else {
          return dispatch({
            type: CHANGE_USER_TYPE,
            payload: "Error al cambiar tipo de usuario",
          });
        }
      } catch (error) {
        return error.message;
      }
    };
  }

  export const getAllConvocations = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${URL_BASE}/convocations`);
        console.log(response.data);
        return dispatch({
          type: GET_CONVOCATIONS,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

// export function allPositions(){
//     return async function(dispatch){
//         try {
//             const response = await axios.get(`${URL_BASE}/positions`)
//             // console.log(response.data);
//             return dispatch({
//                 type: DATA_POSITION,
//                 payload: response.data
//             })
//         } catch (error) {
//             throw new Error(error.message)
//         }
//     }
// }

// export const getUserProfile = (id) => {
//   return async function (dispatch) {
//     try {
//       const response = await axios.get(`http://localhost:3015/officers/${id}`);
//       console.log(response);
//       return dispatch({
//         type: GET_USER_PROFILE,
//         payload: response.data,
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };




// export default register_officer = async(payload) => {
//     return async function (dispatch) {
//         try {
//             const response = await axios.post(`${URL_BASE}/officers`, payload);
//             return response;
//             dispatch({
//                 type: POST_OFFICER
//             })
//         } catch (error) {
//             console.error('Error al cargar funcionario');
//         }
//       };
// }

export function clearAlerts() {
    return {
      type: CLEAR_ALERTS_STATE,
    };
}
