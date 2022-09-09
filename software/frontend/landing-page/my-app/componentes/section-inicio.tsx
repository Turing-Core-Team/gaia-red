import React from "react";
import styles from "../styles/Home.module.css"

const SectionInicio = (props:any) =>{
//recibe un titulo

    return(
       
        <div className={styles.seccionInicio}>
            {props.children}
        </div>
        
    );
}


export default SectionInicio;