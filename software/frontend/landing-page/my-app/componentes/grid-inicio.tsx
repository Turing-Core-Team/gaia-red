import React from "react";
import styles from "../styles/Home.module.css";

const Grid = (props:any) =>{
    return(
        <>
        <article className={styles.grid4}>
            {props.children}
        </article>
        </>
    );
}

export default Grid;