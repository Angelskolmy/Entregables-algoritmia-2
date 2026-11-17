import {
    prompts,
    productos, 
    Ciudades_Coverturas,
    Db_ventas
} from "./Db_datosDic.js" 


function Alllist(){ 

    console.table(

        Array.from(Db_ventas,([CipherKeys, infocontent])=>([

            CipherKeys, 
            ...infocontent

        ]))
    );
}