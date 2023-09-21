import { LOGIN_SUCCESS, GET_DATA, GET_USER_PROFILE, USER_LOGOUT, DATA_POSITION, GET_ALL_USERS,
  DELETE_USER, CHANGE_USER_TYPE, CLEAR_ALERTS_STATE, GET_CONVOCATIONS,} from './Actions';
  
  const userLogedIn = localStorage.getItem("userLoged") === "false";
  let initialState = {
    dataUser: {},
    allUsers: [],
    getConvocations: [],
    alerts: "",
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
      case GET_ALL_USERS: {
        return {
          ...state,
          allUsers: action.payload,
          };
        }
      case DELETE_USER: {
        return {
          ...state,
          alerts: action.payload,
        };
      }
      case CHANGE_USER_TYPE: {
        return {
          ...state,
          alerts: action.payload,
        };
      }
      case GET_CONVOCATIONS:
      return {
        ...state,
        // loginUser: true,
        getConvocations: action.payload,
      };






      // case DATA_POSITION:
      //   return {
      //     ...state,
      //     dataPositions: action.payload
      //   }

      case CLEAR_ALERTS_STATE: {
        return {
          ...state,
          alerts: "",
        };
      }
      default:
        return {
          ...state,
        };
    }
  };
  
  export default rootReducer;
  