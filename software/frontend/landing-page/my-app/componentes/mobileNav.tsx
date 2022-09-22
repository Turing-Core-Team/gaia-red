import { useRef } from 'react';
import { markAsUntransferable } from 'worker_threads';
import styles from '../styles/Home.module.css';

const MobileNav = () =>{
    //const menu = useRef<HTMLDivElement>(null);
    const menu =useRef<HTMLUListElement>(null);
    
    let abierto:boolean = false;
    const mostrarMenu= () => {
   
        if(menu.current !== null && !abierto){
            menu.current.style.display = "block";
            abierto=true;
        }
        else if(menu.current !== null && abierto){
            menu.current.style.display="none";
            abierto = false;
        }
    }

    const cerrarMenu = () =>{
        if(menu.current!==null && abierto){
            menu.current.style.display="none";
            abierto = false;
        }
    }

    const irEquipo = () => {
        window.location.href = "#Equipo";
        cerrarMenu();
    }
    const irInicio = () => {
        window.location.href = "#top";
        cerrarMenu();
    }
    const irContacto = () => {
        window.location.href = "#Contacto";
        cerrarMenu();
    }

    const irApoyo = () => {
        window.location.href = "#Apoyo";
        cerrarMenu();
    }
    const irSomos = () => {
        window.location.href = "#Quienes";
        cerrarMenu();
    }

    const irDashBoard = () => {
        alert("funcionalidad aún en desarrollo :)")
        cerrarMenu();
    }
    return(
        <div className={styles.navMobile} >
            <button onClick={mostrarMenu} className={styles.iconMenu}></button>
            <ul className={styles.listaMobile} ref={menu}>
            <li><button className={styles.botonesMenu} onClick={irInicio}>Inicio</button> </li>
                <li><button className={styles.botonesMenu} onClick={irSomos}>Somos</button></li>
                <li><button className={styles.botonesMenu} onClick={irEquipo}>Equipo</button></li>
                <li><button className={styles.botonesMenu} onClick={irApoyo}>Apoyos</button></li>
                <li><button className={styles.botonesMenu} onClick={irContacto}>Contacto</button></li>
                <li><button className={styles.botonesMenu} onClick={irDashBoard}>Dashboard </button></li>
            </ul>
        </div>

    );
}

export default MobileNav;