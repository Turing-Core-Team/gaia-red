
import React, { Children } from "react";
import styles from '../styles/Home.module.css'


const Article_dash = (props:any) =>{
    return(
        
        <article className={styles.cuadroResumen}>
            {props.children}
        </article>
        
    );
}

export default Article_dash;

