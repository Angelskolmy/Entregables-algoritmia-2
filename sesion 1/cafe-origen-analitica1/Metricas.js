import {
    prompts,
    productos, 
    Ciudades_Coverturas,
    Db_ventas
} from "./Db_datosDic.js"   



export function MetricaTotalVendido(){ 

    let CantOperaciones1= 0
    let Anglahad= 0  
    let rolok1=null

    for ( let[Uro, boros] of Db_ventas.entries()){ 

        Anglahad+= boros.montoVenta 
        CantOperaciones1+=1

    }  

    rolok1=[{Estad: "Ganacias totales", Monto: Anglahad}]

    return CantOperaciones1

} 

export function MetricaVentaMayor(){ 

    let CanonMax= null   

    let Metrica2= 0

    for (let[identificador, Guts] of Db_ventas.entries()){  

        Metrica2+= 1


        if(CanonMax === null || Guts.montoVenta> CanonMax.Guts.montoVenta){ 

            Metrica2+= 1

            CanonMax= { identificador, Guts}

        } 
        

    }   

    return Metrica2

    
}

export function MetricaTotalPorciudad(){

    let Metrica3=0
    let DiccionarioVentas= new Map()

    for(let Anacron in Ciudades_Coverturas){  

        Metrica3+=1

        let TotalCiudad=0  
        let Covert = Ciudades_Coverturas[Anacron]

        for (let[Bullet, charger] of Db_ventas.entries()){ 

            Metrica3+=1

            if( Covert == charger.Ciudad){  

                
                TotalCiudad+=charger.montoVenta
                
            }
        } 
    
        let idkang= RandomId22()

        DiccionarioVentas.set(idkang,{ 

            Zona_de_Cobertura:Covert, 
            GanaciasxCiudad:"$"+TotalCiudad.toLocaleString("es-CO")
        })

    }  

    const listarall= Array.from(DiccionarioVentas, ([Identifier, divrol]) => ({

        idkang: Identifier, 
        ...divrol

    }))     

    

    return Metrica3

} 

function RandomId22(){

    const Numeros= "0123456789"; 
    const characters= "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id= ""; 

    for(let alfanumeric1=0; alfanumeric1<3; alfanumeric1++){ 

        id+= characters[Math.floor(Math.random() * characters.length)]

    } 

    for(let alfanumeric2=0; alfanumeric2<3; alfanumeric2++){ 

        id+= Numeros[Math.floor(Math.random()*Numeros.length)]

    } 

    return id
}  