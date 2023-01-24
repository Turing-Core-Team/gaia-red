

require('dotenv').config()
const mysql = require('mysql2/promise')



export async function kuery(query:any, values = [] ) {
  const dbconnection = await mysql.createConnection(process.env.DATABASE_URL);
  //conexión con PlanetScale
  try {
    const [results] = await dbconnection.execute(query, values);
    //console.log(results);
    dbconnection.end();
    return results;
  } catch (error:any) {
    console.log('hola')
    throw Error(error.message);
  }
}

/**
 * 
 *  host: "us-east.connect.psdb.cloud",
    database: "gaia-red",
    user: "h7zj4t85121vvutk857l",
    password: "pscale_pw_xO8bTlouQMC9sWYQQqDEQbJrln242pv2Dg1e5lbTxMZ",
 *
 * 
 * 
 */

    /**
     *  host:'localhost',
    database:'prueba_gaia',
    user:'root',
    port:3306,
    password:'toor'
     */
