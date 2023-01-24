

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
 *  const mysql = require('mysql2')
const connection = mysql.createConnection('mysql://ulnx0fsv0dxtqkiz7yep:pscale_pw_zl0cx0imVKO0xbI0l2s0Wxhoy8Sytc0Bqrnv4FmOWql@us-east.connect.psdb.cloud/gaia-red?ssl={"rejectUnauthorized":true}')

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
