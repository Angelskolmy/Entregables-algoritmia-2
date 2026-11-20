import {
    prompts,
    productos, 
    Ciudades_Coverturas,
    Db_ventas, 
    
} from "./Db_datosDic.js" 


export function Alllist(){ 

    const Histoprial= Array.from( Db_ventas, ([RokId, Hardcontent])=> ({ 

        newIDVeta: RokId, 

        ...Hardcontent

    })
    )
   
    console.table(Histoprial)
   
}