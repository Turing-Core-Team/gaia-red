import React from "react";
import Link from 'next/link';
import styles from '../styles/Home.module.css'


const Infodiv= (props:string[]) => {
    let numero = props[0];
    let titulo = props[1];
    let texto = props[2];
    
    return(
        <>
    <div className={styles.cajitaBonita}>
        <span className={styles.letrasGrandes}><h1>{numero}.</h1><p>{titulo}</p></span>
        <p>{texto}</p>
        
    </div>

        </>
    );
}

export default Infodiv;