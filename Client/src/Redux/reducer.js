import { LOGIN_SUCCESS, GET_DATA, GET_USER_PROFILE, USER_LOGOUT, DATA_POSITION, GET_ALL_USERS,
  DELETE_USER, CHANGE_USER_TYPE, GET_OFFICER_BY_NAME, CLEAR_ALERTS_STATE, GET_CONVOCATIONS,POST_OFFICER_SUCCESS, POST_OFFICER_FAILURE,
  GET_ALL_APPLY_WORK, POST_CONVOCATION_SUCCESS, POST_CONVOCATION_FAILURE} from './actions';
  
  const userLogedIn = localStorage.getItem("userLoged") === "false";
  let initialState = {
    allUsers: [],
    dataUser: {},
    allApplyWorks: [],
    getConvocations: [],
    alerts: "",
    dataPositions: [],
    loginUser: userLogedIn,
    userCreated: false,
    convocationCreated: false,
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
      case GET_OFFICER_BY_NAME:
      return {
        ...state,
        allUsers: action.payload,
      };
      case GET_CONVOCATIONS:
      return {
        ...state,
        // loginUser: true,
        getConvocations: action.payload,
      };
      case POST_OFFICER_SUCCESS:
      return {
        ...state,
        userCreated: true, //al ser creado con exito seteo en true el estado
        alerts: action.payload
      };
      case POST_OFFICER_FAILURE:
      return {
        ...state, // al haber error seteo en false el estado
        userCreated: false,
        alerts: action.payload
      };
      case POST_CONVOCATION_SUCCESS:
      return {
        ...state,
        convocationCreated: true,
        alerts: action.payload 
      };
      case POST_CONVOCATION_FAILURE:
      return {
        ...state, 
        convocationCreated: false,
        alerts: action.payload 
      };
      case DATA_POSITION:
        return {
          ...state,
          dataPositions: action.payload
        }

      case CLEAR_ALERTS_STATE: {
        return {
          ...state,
          alerts: "",
        };
      }
      case GET_ALL_APPLY_WORK: {
        return {
          ...state,
          allApplyWorks: action.payload
        }
      }
      default:
        return {
          ...state,
        };
    }
  };
  
  export default rootReducer;
  

