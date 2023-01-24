import React, { useRef } from "react";
import { Bar } from 'react-chartjs-2';
import Navbar from "../componentes/NavBar";
import { useEffect,useState } from "react";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import Article_dash from "../componentes/frame_dash";
import Infodash from "../componentes/div_infodash";
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { CategoryScale } from "chart.js";
import { defaults } from "chart.js";
import MobileNav from "../componentes/mobileNav";
import Link from "next/link";

//esto se utiliza pq según entiendo al usar chart.js con react
/*v4 of this library, just like Chart.js v3,
 is tree-shakable. It means that you need to import 
 and register the controllers,
 elements, scales, and plugins you want to use. */



const DashBoard = () => {
   
    //crear variable global dataResponse
    //ella guarda lo que traemos de getData.ts
    const [dataResponse,setdataResponse] = useState<any[]>([]);
    const [dataTemp,setdataTemp] = useState<number[]>([-1]);
    const [dataHR,setdataHR] = useState<number[]>([-1]);
    const [dataD,setdataD] = useState<number[]>([-1]);
    
    //traer datos de la db y guardarlos con useeffect
    async function actualizarDatos(data:any) {
        let count:number 
        let arr:number[] = [-1];
        let arr2:number[] = [-1];
        let arr3:number[] = [-1];
        data.map((reporte:any)=>{
            console.log('ejecutando')
            if(reporte.nombre=='Distancia'){
                if(arr[0]==-1) arr[0] =reporte.valor;
                else arr.push(parseInt(reporte.valor))
            }
            else if(reporte.nombre=='HR'){
                if(arr2[0]==-1) arr2[0] =reporte.valor;
                else arr2.push(parseInt(reporte.valor))
            }
            else if(reporte.nombre=='Temperatura'){
                if(arr3[0]==-1) arr3[0] =reporte.valor;
                else arr3.push(parseInt(reporte.valor))
            }
            //pendiente, cambiar de string a number para las graficas

        });
        //borrando datos vacios:
        arr.map((element)=>{
            if(element==-1)  arr[arr.indexOf(element)]= -1
        })
        arr2.map((element)=>{
            if(element==-1)  arr2[arr2.indexOf(element)]= -1
        })
        arr3.map((element)=>{
            if(element==-1)  arr3[arr3.indexOf(element)]= -1
        })
        console.log('tu tu tu hermana')
        setdataD(arr);
        setdataHR(arr2);
        setdataTemp(arr3);
        //actualizamos la consulta
     
        
    
    }
    async function getPageData(){
        const apiUrlEndpoint = './api/getData';
        const response = await fetch(apiUrlEndpoint)
        const res = await response.json();
        setdataResponse(res.reportes);
    }
    useEffect(
        ()=>{
            getPageData()
        },[]
    );
        //como hacemos para que se actualice al instante?
     async function actualizarPagina(data:any){
        await getPageData();
        setTimeout(() => {
           actualizarDatos(data) 
        },200);
    }
   
   
    
    
    console.log(dataResponse);
    console.log('tipo de datos:')
    console.log(typeof dataResponse)
    console.log('arreglo dst:')
    console.log(dataD);
    console.log('arreglo t')
    console.log(dataTemp);
    console.log('arreglo hum:')
    console.log(dataHR);
    

        

    Chart.register(CategoryScale);
    defaults.font.family = 'avenirlight', 'sans';
    defaults.font.weight = '800';
    const dataBarra = {

        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
            label: 'Grafico de Distancia',
            data: dataD,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    const data = {
        labels: ['1', '2', '3', '4', '5', '6', '7'],
        datasets: [
            {
                //para cada linea se crea un dataSet
                label: 'Temperatura',
                
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
                data: dataTemp
            },

            {
                //para cada linea se crea un dataSet
                label: 'Humedad Relativa',
                
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgb(250,128,114)',
                borderColor: 'rgb(250,128,114)',
                data: dataHR
            }
        ]
    };


// val_inicial = [1,2,3]
//console.log(dataResponse[0])
/*Inicio componentes: */
    return (
        
        <div className={styles.container}>
            <Head>
                <title>DashBoard</title>
                <meta name="dashboard gaiared" content="visualizacion de datos" />
                <link rel="icon" href="/monitor.ico" />
            </Head>
            <Navbar></Navbar>
            <MobileNav></MobileNav>
            <main className={styles.main}>

                <Article_dash>
                    <article className={styles.flexRow} >
                        <section className={styles.dashInfo} >
                            <h2 className={styles.SubtitulosD}>DashBoard de la estación 1 de gaiaRed</h2>
                            <br></br>
                            <p className={styles.textoComunD}>Desde aquí podrás ver las principales métricas que nuestros sensores han recolectado</p>
                        </section>
                      { /*  <img src={'/bogota.jpg'} className={styles.fotoControlador}></img> */}
                    </article>
                    {/*pq no se actualiza el dataResponse? */}
                    <section className={styles.flexRow1}>
                            <Infodash {...[dataTemp[dataTemp.length-1].toString()+' C°', '/temperature.png', "Temperatura (C°)", '1']}></Infodash>
                            <Infodash {...[dataHR[dataHR.length-1].toString()+'%', '/humedad.png', "H.Relativa (%)", '2']}></Infodash>
                            <Infodash {...[dataD[dataD.length-1].toString(), '/brillo.png', "Brillo (on/off)", '4']}></Infodash> 
                            <button  className={styles.botonDash} onClick={()=>
                           
                                actualizarPagina(dataResponse)
                               
                            
                            }>actualizar</button>

                    </section>
                    
                    
                    <div className={styles.flexRow}>
                        <section className={styles.dashInfo} >
                            <h3 className={styles.SubtitulosD}>Gráficos asociados a los reportes</h3>
                            <br></br>
                            <p className={styles.textoComunD}>Histograma, Humedad Relativa y temperatura en 24h. Eje x: valores Eje y: numero reporte</p>
                        </section>
                    </div>
                    
                    <section className={styles.flexRow}>
                        
                    { /*
                    <div className={styles.fotoGrafico}>
                            <Bar
                                data={dataBarra}
                                width='400px'
                                height='400px'
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false
                                }}
                            />
                            lo borramos pq ya no es necesario
                             </div>
                            */
}
                        
                        <div className={styles.fotoGrafico}>
                            
                            <Line
                                data={data}
                                width='400px'
                                height='400px'
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false
                                }}
                            />
                        </div>



                    </section>

                    {/*Espacio para gráficos en el futuro */}

                </Article_dash>


            </main>
            <footer className={styles.footer}>

                { /*Un proyecto de {' '}*/}
                <span className='fotospeque'>
                    { /*  <Image src="/turinglogo.png" alt="Logo turing" width={120} height={40} /> */}
                    <br></br>
                    <a href="https://iconos8.es/icons" title="ui iconos">Iconos obtenidos de iconos8.es</a>
                </span>

            </footer>
        </div>


    );
}

export default DashBoard;