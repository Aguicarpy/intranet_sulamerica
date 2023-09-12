import { LOGIN_SUCCESS, GET_DATA } from './actions'
const userLogedIn = localStorage.getItem("userLoged") === "false";
let initialState = {
    dataUser : {},
    loginUser: userLogedIn
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginUser: true,
                dataUser: action.payload
            }
        case GET_DATA:
            return {
                ...state,
                loginUser: true,
                dataUser: action.payload,
            }
        default:
            return{
                ...state
            };
    }   
}


export default rootReducer;
