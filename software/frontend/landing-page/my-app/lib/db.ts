import mysql from "mysql2/promise";

export async function kuery(query:any, values = [] ) {
  const dbconnection = await mysql.createConnection({
    host:'54.209.83.225',
    database:'redGaia',
    user:'root',
    port:3306,
    password:'*f25jh739f'
  });
  try {
    const [results] = await dbconnection.execute(query, values);
    console.log(results);
    dbconnection.end();
    return results;
  } catch (error:any) {
    console.log('hola')
    throw Error(error.message);
  }
}

