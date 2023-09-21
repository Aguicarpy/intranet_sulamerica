import styles from './Footer.module.css'
import { Link } from 'react-router-dom';

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div>
                <ul>
                    <Link to='https://www.sulamerica.com.py'>
                        <li>Sitio web</li>
                    </Link>
                    <li><a href="/perfil"></a></li>
                </ul>
            </div>
            <p>Intranet Sul América © 2023</p>
        </footer>
    )
}


export default Footer;