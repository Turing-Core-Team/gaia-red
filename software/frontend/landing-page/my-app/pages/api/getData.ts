import mysql2 from 'mysql2/promise';

//primero debemos crear la conexión
//con la db
export default async function handler(req:any,res:any){
    const dbConnection = await mysql2.createConnection(
        {
            host:'localhost',
            database:'gaia-prueba',
            user:'root',
            port:3306,
            password:'toor'
        }
    );
        try{
            //intentamos hacer nuestra query
            const query:string = 'SELECT reporte_id,temp_val,humedad_val,brillo_val FROM reporte JOIN brillo ON brillo_id=reporte_id_brillo JOIN humedad ON humedad_id=reporte_id_hum JOIN temperatura ON temp_id = reporte_id_temp';
            const values:string[] = [];
            //esta parte ejecuta nuestra consulta por medio de una funcion asincrona
            const [results] = await dbConnection.execute(query,values);
            console.log(results);
            //terminamos la conexión por seguridad
            dbConnection.end();
            //mostramos en el frontend los valores
            res.status(200).json({results:results});

        } catch(error:any)
        {
            res.status(500).json({error: error.message});
        }

}