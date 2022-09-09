import React from "react";
import styles from '../styles/Home.module.css';
import Image from "next/image";
import { type } from "os";


const Layout = (props:any) =>{
    return(
        /* <Image src={"/../public/fondo_inicio.png"}
        className={styles.fotoFondo} 
    width={"300"} height={"500"}/> */ 

    <section className={styles.fotoFondo}>
        
        {props.children}
    </section>
            
          
    );
}

export default Layout;