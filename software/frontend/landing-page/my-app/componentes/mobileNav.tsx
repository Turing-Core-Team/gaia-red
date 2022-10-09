import Link from 'next/link';
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

   /*
   Estas funciones ya no se usan por que fueron reemplazadas con next.Link

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
   
   */
    return(
        <div className={styles.navMobile} >
            <button onClick={mostrarMenu} className={styles.iconMenu}></button>
            <ul className={styles.listaMobile} ref={menu}>
            <li> <Link href={"/#top"}><p className={styles.textoLink}>Inicio</p></Link> </li> 
            <li>  <Link href={"/#Equipo"}><p className={styles.textoLink}>Equipo</p></Link></li>
            <li>  <Link href={"/#Quienes"}><p className={styles.textoLink}>Somos</p></Link></li>
            <li>  <Link href={"/#Apoyo"}><p className={styles.textoLink}>Apoyos</p></Link></li>
            <li> <Link href={"/#Contacto"}><p className={styles.textoLink}>Contacto</p></Link></li>
            <li>   <Link href={"/dashBoard"}>
            <p className={styles.textoLink}>Dashboard </p>
               </Link></li>

            </ul>
        </div>

    );
}

export default MobileNav;