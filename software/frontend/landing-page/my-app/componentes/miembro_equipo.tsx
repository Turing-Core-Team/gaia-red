
import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css"

const Miembro = (props:string[]) =>{
    let nombre:string = props[0];
    let cargo:string = props[1];
    let ruta:string = props[2];
    return (
        <article className={styles.ArtMiembro}>
            <img src={ruta} className={styles.imagenEquipo}></img>
            <span className={styles.nombreMiembro}>
                <p>{nombre}</p> <p>{cargo}</p>
                 </span>
        </article>
    );
}

export default Miembro;