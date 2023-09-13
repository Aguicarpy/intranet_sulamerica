import styles from './Footer.module.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer style={styles.footer}>
            <div>
                <ul>
                    <Link to='https://www.sulamerica.com.py'>
                        <li>Sitio web</li>
                    </Link>
                    <li><a href="/perfil"></a></li>
                </ul>
            </div>
            <p>Derechos de autor © 2023 Tu Empresa</p>
        </footer>
    )
}


export default Footer;