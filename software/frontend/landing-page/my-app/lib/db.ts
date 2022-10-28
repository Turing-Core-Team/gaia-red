import mysql from "mysql2/promise";

export async function kuery(query:any, values = [] ) {
  const dbconnection = await mysql.createConnection({
    host:'localhost',
    database:'gaia-prueba',
    user:'root',
    port:3306,
    password:'toor'
  });
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error:any) {
    throw Error(error.message);
  }
}

