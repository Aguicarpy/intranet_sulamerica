import {
  LOGIN_SUCCESS,
  GET_DATA,
  GET_USER_PROFILE,
  USER_LOGOUT,
  GET_CONVOCATIONS,
  // Otras importaciones
} from "./actions";

const userLogedIn = localStorage.getItem("userLoged") === "false";
let initialState = {
  dataUser: {},
  getConvocations: [],
  loginUser: userLogedIn,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginUser: true,
        dataUser: action.payload,
      };
    case GET_DATA:
      return {
        ...state,
        loginUser: true,
        dataUser: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        loginUser: false,
        dataUser: {},
      };
    case GET_USER_PROFILE:
      return {
        ...state,
        loginUser: true,
        dataUser: action.payload,
      };
    case GET_CONVOCATIONS:
      return {
        ...state,
        // loginUser: true,
        getConvocations: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
