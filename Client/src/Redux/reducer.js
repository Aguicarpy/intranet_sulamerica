import {
    LOGIN_SUCCESS,
    GET_DATA,
    GET_USER_PROFILE,
    USER_LOGOUT,
    DATA_POSITION,
  } from './actions';
  
  const userLogedIn = localStorage.getItem("userLoged") === "false";
  let initialState = {
    dataUser: {},
    // dataPositions: {},
    // getUserProfile: {},
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
      // case DATA_POSITION:
      //   return {
      //     ...state,
      //     dataPositions: action.payload
      //   }
      default:
        return {
          ...state,
        };
    }
  };
  
  export default rootReducer;
  