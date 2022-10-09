import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styles from "../../styles/Home.module.css"
export default function Reportes(){
    const router = useRouter();

    return(
        <div>
            <h1>Detalles del reporte</h1>
            {/*esta es una propiedad de router
            te permite hacer una consulta del nombre del archivo
            y ponertelo en el texto. Ej /report/4, mostraria un 4*/}
            <p>Reporte numero: {router.query.report}</p>
            <button className={styles.botonesInicio}><Link href={"/dashBoard"}>Regresar</Link></button>
        </div>
    );
}