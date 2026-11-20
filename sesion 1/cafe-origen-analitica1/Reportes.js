import {
    prompts,
    productos, 
    Ciudades_Coverturas,
    Db_ventas, 
    Ingreso_Automatico,   
    Ingreso_Manual,    

    

} from "./Db_datosDic.js" 

import{
    Alllist
} from "./Explorar.js" 

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
       sortingForreport
} from "./Analitica.js" 

import{ 

    comparador_TotalVendido,
    comparador_Totaitems,
    comparador_VentForcity,

} from "./Comparacion.js" 


export function ReportSol(){

    console.log("------------------------------------resumen general de ventas--------------------------------")  

    Alllist()

    console.log("---------------------------------------------------------------------------------------------")  



    console.log("-------------Unidades por producto-----------------------------------------------------------") 

    unidadesPorProducto() 

    console.log("---------------------------------------------------------------------------------------------") 


    console.log("-------------Ventas por ciudad---------------------------------------------------------------") 

    TotalVentasXciudad()

    console.log("---------------------------------------------------------------------------------------------") 


    console.log("-------------unidades por producto------------------------------------------------------------") 

    unidadesPorProducto()

    console.log("----------------------------------------------------------------------------------------------")  

    console.log("-------------top 3 productos mas vendidos-----------------------------------------------------") 

    sortingForreport()

    console.log("----------------------------------------------------------------------------------------------") 

}