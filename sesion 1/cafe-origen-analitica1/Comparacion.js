import {
    prompts,
    productos, 
    Ciudades_Coverturas,
    Db_ventas, 
    Ingreso_Automatico,   
    Ingreso_Manual,   
    

} from "./Db_datosDic.js" 


import{GananciasTotales, 
       TotalItemsBendidos, 
       MayorVenta, 
       PrecioPromedioVenta, 
       TotalVentasXciudad, 
       MapGananciasTotales, 
       MapTotalItemsBendidos, 
       MaPTotalVentasXciudad, 
       unidadesPorProducto, 
       sortlog,
       OrderFecha
} from "./Analitica.js"


export function comparador_TotalVendido(){ 

    let CicleVersion = GananciasTotales() 
    let MapVersion= MapGananciasTotales() 

    if(CicleVersion[0].Monto == MapVersion[0].Promedio_ganaciaXventa){ 

        console.log("Mismo monto de ganancias totales calculado  en 2 versiones")
        console.log("OK")

    }
    else{ 
        console.log("Resultado de calculo diferente")
        console.log("DIFERENT")
    }



} 

export function comparador_Totaitems(){


    let CicleVersion = TotalItemsBendidos()
    let MapVersion=  MapTotalItemsBendidos()  

    if(CicleVersion[0].Cantidad == MapVersion[0].Cantidad){ 

        console.log("Misma cantidad de ganancias totales calculado  en 2 versiones")
        console.log("OK")

    }
    else{ 
        console.log("Resultado de calculo diferente")
        console.log("DIFERENT")
    }


} 


export function comparador_VentForcity(){ 

    let CicleVersion = TotalVentasXciudad()
    let MapVersion=  MaPTotalVentasXciudad()  

    let condicional= 

        CicleVersion.length === MapVersion.length && CicleVersion.every(
            (fila,indi)=> fila.GanaciasxCiudad === MapVersion[indi].GanaciasxCiudad
        );


    if(CicleVersion){ 

        console.log("Misma cantidad de ganancias por ciuidad calculado calculado  en 2 versiones")
        console.log("OK")

    }
    else{ 
        console.log("Resultado de calculo diferente")
        console.log("DIFERENT")
    }

}