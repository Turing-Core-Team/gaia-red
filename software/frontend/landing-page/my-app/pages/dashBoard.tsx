import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../componentes/NavBar";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import Article_dash from "../componentes/frame_dash";
import Infodash from "../componentes/div_infodash";

const DashBoard = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>DashBoard</title>
                <meta name="dashboard gaiared" content="visualizacion de datos" />
                <link rel="icon" href="/monitor.ico" />
            </Head>
            <Navbar></Navbar>
            <main className={styles.main}>

            <Article_dash>
                    <article className={styles.flexFoto} >
                        <section className={styles.dashInfo} >
                            <h2 className={styles.SubtitulosD}>DashBoard de la estación 1 de gaiaRed</h2>
                            <br></br>
                            <p className={styles.textoComunD}>Desde aquí podrás ver las principales métricas que nuestros sensores han recolectado</p>
                        </section>
                        <img src={'/bogota.jpg'} className={styles.fotoControlador}></img>
                    </article>
                    <section className={styles.flexRow}>
                        <Infodash {...['20 C°','/temperature.png',"Temperatura (C°)"]}></Infodash>
                        <Infodash {...['40%','/humedad.png',"Humedad Relativa (%)"]}></Infodash>
                        <Infodash {...['2cm','/distancia.png',"Distancia (cm)"]}></Infodash>
                        <Infodash {...['ON','/brillo.png',"Brillo (on/off)"]}></Infodash>
                        
                    </section>

                    {/*Espacio para gráficos en el futuro */}
                    {
                        /*
                             <div className={styles.grid4}>
                        <div className={styles.flexFoto}>
                            <p> grid 1</p>
                        </div>
                        <p> grid 2</p>
                        <p> grid 3</p>
                        <p> grid 5</p>
                    </div>
                         */
                    }
                   
                </Article_dash>


            </main>
            <footer className={styles.footer}>
        
                    { /*Un proyecto de {' '}*/}
                    <span className='fotospeque'>
                        { /*  <Image src="/turinglogo.png" alt="Logo turing" width={120} height={40} /> */}
                        <br></br>
                        <a href="https://www.flaticon.es/iconos-gratis/ui" title="ui iconos">Ui iconos creados por SBTS2018 - Flaticon</a>
                    </span>

            </footer>
        </div>


    );
}

export default DashBoard;