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
export const GET_OFFICER_BY_NAME = "GET_OFFICER_BY_NAME"
export const DELETE_USER = "DELETE_USER"
export const CHANGE_USER_TYPE = "CHANGE_USER_TYPE"
export const CLEAR_ALERTS_STATE = "CLEAR_ALERTS_STATE"
export const GET_CONVOCATIONS = "GET_CONVOCATIONS";
export const POST_OFFICER_SUCCESS = "POST_OFFICER_SUCCESS";
export const POST_OFFICER_FAILURE = "POST_OFFICER_FAILURE";
export const POST_CONVOCATION_SUCCESS = "POST_CONVOCATION_SUCCESS"
export const POST_CONVOCATION_FAILURE = "POST_CONVOCATION_FAILURE"
export const SEND_APPLY_JOB = "SEND_APPLY_JOB"
export const GET_ALL_APPLY_WORK = "GET_ALL_APPLY_WORK"

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

export function postOfficer(user) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL_BASE}/officers`, user);

      // Si el servidor devuelve un código de estado 201 (creado), muestra el mensaje de éxito
      if (response.status === 201) {
        dispatch({
          type: POST_OFFICER_SUCCESS, //para setear userCreated en true y redireccionar a la view login
          payload: "Nuevo Funcionario Registrado"
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        dispatch({
          type: POST_OFFICER_FAILURE, // para setear userCreated en false y mantenerme en la view de registro
          payload: "Ya existe un funcionario asociado a ese email"
        });
      } 
    }
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

  export function searchOfficer(email) {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${URL_BASE}/officers?email=${email}`);
        return dispatch({
          type: GET_OFFICER_BY_NAME,
          payload: response.data,
        });
      } catch (error) {
        return error.message;
      }
    };
  }

  export const getAllConvocations = () => {
    return async function (dispatch) {
      try {
        const response = await axios.get(`${URL_BASE}/convocations`);
        return dispatch({
          type: GET_CONVOCATIONS,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };
  
  export function postConvocation(convocation) {
    return async function (dispatch) {
      try {
        const response = await axios.post(`${URL_BASE}/convocations`, convocation);
        if (response.status === 201) {
          dispatch({
            type: POST_CONVOCATION_SUCCESS,
            payload: "Convocatoria creada con éxito" 
          });
        }
      } catch (error) {
        if (error.response && error.response.status === 409) {
          dispatch({
            type: POST_CONVOCATION_FAILURE, 
            payload: "Fallo al crear la convocatoria, revise los campos"
          });
          window.alert(error.response.data.error); 
        } else {
          window.alert(error.message);
        }
      }
    };
  }
  

export function allPositions(){
    return async function(dispatch){
        try {
            const response = await axios.get(`${URL_BASE}/positions`)
            // console.log(response.data);
            return dispatch({
                type: DATA_POSITION,
                payload: response.data
            })
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export function sendApplyJob(officerId, convocationId) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`${URL_BASE}/convocations/applyjob`,{ officerId, convocationId });
      return dispatch({
        type: SEND_APPLY_JOB,
        payload: response.data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  };
}

export function allApplyWork() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`${URL_BASE}/convocations/applyjob`);
      return dispatch({
        type: GET_ALL_APPLY_WORK,
        payload: response.data,
      });
    } catch (error) {
      return error.message;
    }
  };
}

export function clearAlerts() {
    return {
      type: CLEAR_ALERTS_STATE,
    };
}
