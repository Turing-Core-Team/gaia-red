import React from "react";
import Link from 'next/link';
import styles from '../styles/Home.module.css'


const Infodash = (props: string[]) => {
    let numero = props[0];
    let titulo = props[1];
    let texto = props[2];
    let reporte = props[3];
   

    return (
        <>
            <div className={styles.cuadroInfo}>
                <div className={styles.flexFoto}>

                    <div className={styles.flexCol}>
                        <img className={styles.iconoDs} src={titulo}></img>
                        <h2>{numero}</h2>
                        <p>{texto}</p>
                        
                    </div>
                  



                </div>
            </div>

        </>
    );
}

export default Infodash;