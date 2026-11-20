import {
    prompts,
    productos, 
    Ciudades_Coverturas,
    Db_ventas, 
    Ingreso_Automatico,   
    Ingreso_Manual,    

    

} from "./cafe-origen-analitica1/Db_datosDic.js" 

import{
    Alllist
} from "./cafe-origen-analitica1/Explorar.js" 

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
} from "./cafe-origen-analitica1/Analitica.js" 

import{ 

    comparador_TotalVendido,
    comparador_Totaitems,
    comparador_VentForcity,

} from "./cafe-origen-analitica1/Comparacion.js" 

import{ 
    ReportSol
} from "./cafe-origen-analitica1/Reportes.js"

while(true){ 

    console.log(`
        
        .1-  Listar historico de ventas

        .2- Ingrsar ventas manual o automaticamente

        .3- Total ventas

        .4- Total Items

        .5- Mayor Venta

        .6- Promedio Ventas

        .7- ganacias totales por ciudad

        .8-  unidades por producto

        .9- producto con mayor ganancia 

        .10- comparacion 

        .11- Reporte 

        .12- Venta por fecha
        `)

    let varAgis
    while (true){   

        varAgis= Number(prompts("ingrese numero de opcion deseado ")) 

        if(varAgis <0 || !Number.isInteger(varAgis) || varAgis>12){ 
            console.log("dato invalido opcion no exite")
            continue
        } 

        break

    } 

    if(varAgis == 1){  

        Alllist()
        continue
    } 
    else if(varAgis == 2){ 

        let opcionINg= Number(prompts(" numero de opcion 1.automaticament o 2. manuamente ")) 
        while(opcionINg != 1 && opcionINg != 2){
            console.log("opcion invalida") 
            opcionINg= Number(prompts(" numero de opcion 1.automaticament o 2. manuamente ")) 
        } 

        if(opcionINg == 2){ 
            Ingreso_Manual()
        } 
        else{
            Ingreso_Automatico()
        }
        continue
    }
    else if(varAgis ==3){   

        let opcionINg2= Number(prompts(" numero de opcion 1.con ciclos o 2.metodos map ")) 

        while (opcionINg2 !== 1 && opcionINg2 !== 2){ 

            console.log("opcion invalida")
            opcionINg2= Number(prompts(" numero de opcion 1.con ciclos o 2.metodos map "))
        }

        if(opcionINg2 == 1){ 
            GananciasTotales()
        }
        else if(opcionINg2 == 2){ 
            MapGananciasTotales()
        }
        
        continue
    }
    else if(varAgis == 4){  

        let opcionINg3= Number(prompts(" numero de opcion 1.con ciclos o 2.metodos map ")) 

        while (opcionINg3 !== 1 && opcionINg3 !== 2){ 

            console.log("opcion invalida")
            opcionINg3= Number(prompts(" numero de opcion 1.con ciclos o 2.metodos map "))
        }

        if(opcionINg3 == 1){ 
            TotalItemsBendidos() 

        }
        else if(opcionINg3 == 2){ 
            MapTotalItemsBendidos()
        }
        
        continue
    }
    else if(varAgis == 5){ 
        MayorVenta()
        continue
    }
    else if(varAgis == 6){ 
        PrecioPromedioVenta()
        continue
    }
    else if(varAgis == 7){  

        let opcionINg4 = Number(prompts(" numero de opcion 1.con ciclos o 2.metodos map ")) 

         while (opcionINg4 !== 1 && opcionINg4 !== 2){ 

            console.log("opcion invalida")
            opcionINg4= Number(prompts(" numero de opcion 1.con ciclos o 2.metodos map "))
        } 

        if(opcionINg4 == 1){ 
            TotalVentasXciudad() 

        }
        else if(opcionINg4 == 2){ 
            MaPTotalVentasXciudad()
        }
    }

    else if(varAgis == 8){ 
        unidadesPorProducto()
        continue
    }
    else if(varAgis == 9){ 
         sortlog()
        continue
    } 
    else if(varAgis == 10){ 
         
        let opRecor3= Number(prompts("desea comparar 1.TotalVentas 2.TotalItems 3.VentasxCiudad ")) 
         

        while ( opRecor3 !==1 && opRecor3 !== 2 && opRecor3 !== 3){
            console.log("ingreso invalido") 
            opRecor3= Number(prompts("desea comparar 1.TotalVentas 2.TotalItems 3.VentasxCiudad "))
        }   

        if(opRecor3 == 1){ 
            comparador_TotalVendido()
        }
        else if(opRecor3 == 2){ 
            comparador_Totaitems()
        } 

        else if(opRecor3 == 3){ 
            comparador_VentForcity()
        }

        continue
    } 

    else if(varAgis == 11){ 
        ReportSol ()
        continue
    } 

    else if(varAgis == 12){ 
        OrderFecha()
        continue
    }
    
    else if(varAgis == 0){
        console.log("salio del programa")
        break
    }


}
