import axios from 'axios';
const URL_BASE = 'http://localhost:3015';
export const POST_OFFICER = "POST_OFFICER"
export const LOG_USER = "LOG_USER"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const GET_DATA = "GET_DATA" 
export const GET_USER_PROFILE = "GET_USER_PROFILE"
export const USER_LOGOUT = "USER_LOGOUT"

export const login_success = (dataUser) => {
    return {
        type: LOGIN_SUCCESS,
        payload: dataUser
    }
}

export const login_officer = (email, password) => {
    return async function(dispatch) {
        try {
            const response = await axios.post(`${URL_BASE}/authAccess/login`, { email, password });
            // console.log(response);
            if(response.status === 200){
                const loginUser = await response.data
                localStorage.setItem('userAuth', JSON.stringify(loginUser))
                localStorage.setItem("userLoged", "true");
                dispatch(dispatch(login_success(response.data.dataUser)))
            }
            //accede a la data segun el usuario logeado
            const response_user = await axios.get(`${URL_BASE}/officers/userData?email=${email}`)
            dispatch({
                type: GET_DATA,
                payload: response_user.data,
            })
            return { success: true}
        } catch (error) {
            if (error.response && error.response.status === 400) {
                window.alert(error.response.data.error);
              }
              return { success: false }; 
        }  
    }
}
export function logOutUser() {
  localStorage.removeItem("userAuth"); //al cerrar la sesion elimina su almacenamiento
  localStorage.setItem("userLoged", "false");
    return {
    type: USER_LOGOUT,
  };
}

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
