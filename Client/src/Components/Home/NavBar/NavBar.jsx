import styles from './NavBar.module.css'
import logo from '../../../assets/logoSulAmerica.png'
import { Link, useParams } from 'react-router-dom'

const NavBar = () => {
    const { id } = useParams()
    return(
        <div className={styles.navbar}>
        
        <img src={logo} className={styles.logo}></img>
            <ul>
                <li><a href="/">PÁGINA PRINCIPAL</a></li>
                <Link to={`/officers/${id}`}>
                    <li>ÁREA PERSONAL</li>
                </Link>
                <li><a href="/postulaciones">CONVOCATORIAS</a></li>
            </ul>
      
        </div>
    )
}

export default NavBar;