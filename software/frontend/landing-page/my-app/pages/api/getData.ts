import {kuery} from '../../lib/db';

//primero debemos crear la conexión
//con la db
export default async function handler(req:any,res:any){
        try{
            //intentamos hacer nuestra query
            const query:string = 'SELECT * FROM registros';
            const values:string[] = [];
            //esta parte ejecuta nuestra consulta por medio de una funcion asincrona
            const data = await kuery(query,[]) ;
            console.log(data);
            res.status(200).json({reportes: data});
            //terminamos la conexión por seguridad
            //mostramos en el frontend los valores

        } catch(error:any)
        {
            res.status(500).json({error: error.message});
        }

}