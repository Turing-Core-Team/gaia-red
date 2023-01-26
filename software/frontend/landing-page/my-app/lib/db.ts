

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


