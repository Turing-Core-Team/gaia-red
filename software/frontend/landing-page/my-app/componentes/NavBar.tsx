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

    
    return (
        <>
        <nav className={styles.navb}>
                <Image src="/logo_gaia.png" height={49} width={38} layout="fixed"></Image>
                <h3 className={styles.gaiaText}>Gaia Red</h3>
                <button className={styles.navButtons} onClick={irInicio}>Inicio</button> 
               <button className={styles.navButtons} onClick={irEquipo}>Equipo</button>
               <button className={styles.navButtons} onClick={irQuienes}>Quiénes somos</button>
               <button className={styles.navButtons} onClick={irApoyo}>Apoyos</button>
               <button className={styles.navButtons} onClick={irContacto}>Contacto</button>

        </nav>
        </>
    );
}

export default Navbar;