import React from "react";
import styles from '../styles/Home.module.css';
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {

    const irEquipo = () =>{
            window.location.href = "#Equipo";
      }
      const irInicio = () =>{
        window.location.href = "#top";
    }
    const irQuienes = () =>{
        window.location.href = "#Quienes";
    }
    const irContacto = () =>{
        window.location.href = "#Contacto";
    }

    const irApoyo = () =>{
        window.location.href = "#Apoyo";
    }
    //Desde la implementación de next.Link ya no se utilizan estas funciones
    // poner / nos remite al archivo principal

    
    return (
        <>
        <nav className={styles.navb}>
                <Image src="/logo_gaia.png" height={49} width={38} layout="fixed"></Image>
                <h3 className={styles.gaiaText}>Gaia Red</h3>
                <button className={styles.navButtons}><Link href={"/#top"}>Inicio</Link></button> 
               <button className={styles.navButtons} ><Link href={"/#Equipo"}>Equipo</Link></button>
               <button className={styles.navButtons} ><Link href={"/#Quienes"}>Quiénes somos</Link></button>
               <button className={styles.navButtons} ><Link href={"/#Apoyo"}>Apoyos</Link></button>
               <button className={styles.navButtons} ><Link href={"/#Contacto"}>Contacto</Link></button>
               <button className={styles.navButtons} > <Link href={"/dashBoard"}>
               Dashboard
               </Link></button>

        </nav>
        </>
    );
}

export default Navbar;