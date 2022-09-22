import styles from '../styles/Home.module.css';

const MobileNav = () =>{

    const mostrarMenu= () => {
        alert("hola mundo");
    }
    return(
        <nav className={styles.navMobile}>
            <button onClick={mostrarMenu} className={styles.iconMenu}></button>
            <ul>
                <li><button>Somos</button></li>
                <li><button>Dashboard</button></li>
            </ul>
        </nav>

    );
}

export default MobileNav;