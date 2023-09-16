import styles from './NavBar.module.css';
import logo from '../../../assets/logoSulAmerica.png';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../Redux/actions"
import { useEffect } from 'react';

const NavBar = () => {
    const userProfile = useSelector(state => state.dataUser);
    const location = useLocation();
    const dispatch = useDispatch()
    const {id} = useParams()
    
    // const {id} = useParams()
    console.log(userProfile);
    const HandleLogOut = (e)=>{
        e.preventDefault();
        dispatch(logOutUser())
        window.location.href = "/"
      }
    // useEffect(()=>{
    //     dispatch(getUserProfile(id))
    // },[id])
    // Verificar si el usuario está autenticado y si tiene un ID válido en su perfil
    // if (userProfile && userProfile.id) {
    //     const userId = userProfile.id;

        return (
            <div className={styles.navbar}>
                <img src={logo} className={styles.logo} alt="Logo"></img>
                <ul>
                    <li><a href="/">PÁGINA PRINCIPAL</a></li>
                    <Link to={`/perfil/${userProfile.id}`}>
                        <li>ÁREA PERSONAL</li>
                    </Link>
                    <li><a href="/postulaciones">CONVOCATORIAS</a></li>
                </ul>
                <button onClick={HandleLogOut}>SALIR</button>
            </div>
        );
    // } else {
    //     // Si no se encuentra información del usuario, puedes mostrar un mensaje de carga o manejarlo según tu lógica
    //     return <div>Cargando...</div>;
    // }
};

export default NavBar;

