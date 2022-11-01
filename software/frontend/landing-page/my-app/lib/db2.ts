import { createPool } from "mysql2";

export async function connect() {
    const connection = await createPool({
        host:'54.209.83.225',
    database:'redGaia',
    user:'juanma',
    port:3306,
    password:'sistemas1'
    })
}