import mysql from "mysql2/promise";

export async function kuery(query:any, values = [] ) {
  const dbconnection = await mysql.createConnection({
    host:'localhost',
    database:'prueba_gaia',
    user:'root',
    port:3306,
    password:'toor'
  });
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
 * 
 * host:'54.209.83.225',
    database:'redGaia',
    user:'juanma',
    port:3306,
    password:'sistemas1'
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