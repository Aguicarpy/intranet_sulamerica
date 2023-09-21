import styles from './NavBar.module.css';
import logo from '../../../assets/logoSulAmerica.png';
import { Link, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../../../Redux/actions"
import { useEffect } from 'react';

const NavBar = () => {
  const userProfile = useSelector((state) => state.dataUser);
  const dispatch = useDispatch();
  const { id } = useParams();

  const handleLogOut = () => {
    dispatch(logOutUser());
    window.location.href = '/';
  };

  return (
  <div className={styles.navbar}>
  <img src={logo} className={styles.logo} alt="Logo" />
  <ul className={styles.navList}>
    <li>
      <Link to="/inicio">PÁGINA PRINCIPAL</Link>
    </li>

    {userProfile && userProfile.id && (
    <li>
      <Link to={`/perfil/${userProfile.id}`}>ÁREA PERSONAL</Link>
    </li>
    )}
    <li>
    <Link to='/postulaciones'>CONVOCATORIAS</Link>
    </li>
    <li>
    <Link to='/admin-dashboard'>REGISTRO</Link>
    </li>
    </ul>
    <button className={styles.logoutButton} onClick={handleLogOut}>SALIR</button>
    </div>
    )
};

export default NavBar;

