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
       OrderFecha,
       PrimeraVenta,
       ClientesDuplicados,
       FuncionSinProposito, 
       totalVenta1Cicle, 
       ClientesRecurrentesWhitset, 
       VentasPorCleinte, 
       ComboRegalo, 
       ProductoEstrellaXciudad, 
       FirtCliOrd, 
       mejorSemanaBruta, 
       mejorSemana, 
       parMasCercano
} from "./cafe-origen-analitica1/Analitica.js" 

import{ 

    comparador_TotalVendido,
    comparador_Totaitems,
    comparador_VentForcity,

} from "./cafe-origen-analitica1/Comparacion.js" 

import{ 
    ReportSol
} from "./cafe-origen-analitica1/Reportes.js" 

import { 
MetricaTotalVendido, 
MetricaVentaMayor,
MetricaTotalPorciudad
} from './cafe-origen-analitica1/Metricas.js';

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

        .13 comparacion Big o funciones instrumentalisadas 

        .14 Primera venta Funcion 0(N)  

        .15 funcion Comparativa 

        .16 venta x ciudad cadena 

        .17 totalVentas 1 ciudad 

        .18 Clientes registrados 

        .19 Ventas por cliente 

        .20 Combo regalio 

        .21 Producto estrella de cada ciudad 

        .22 Primer cliente seugn historial 

        .23 Semana Con mayor gancia bruta  

        .24 Presupuesto maximo

        .0 Salir del Motor
        `)

    let varAgis
    while (true){   

        varAgis= Number(prompts("ingrese numero de opcion deseado ")) 

        if(varAgis <0 || !Number.isInteger(varAgis) || varAgis>24){ 
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

        continue
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

    else if(varAgis == 13){ 
       
        let opcionINg5= Number(prompts("que metricas big(0) desea ver 1.TotalVentas 2.TotalItems 3.VentasxCiudad  "))

        while(opcionINg5 !== 1 && opcionINg5 !== 2 && opcionINg5!== 3){ 
            console.log("numero de opcion invalido o inexistente") 
            opcionINg5= Number(prompts("que metricas big(0) desea ver 1.TotalVendido 2.MayorVenta 3.VentasxCiudad  "))
        }  

        if(opcionINg5 == 1){
            let Result1= MetricaTotalVendido() 
            console.log(Result1)
        } 

        else if(opcionINg5 == 2){ 
           let Result2= MetricaVentaMayor() 
           console.log(Result2)
        } 

        else if(opcionINg5 == 3){ 
           let Result3= MetricaTotalPorciudad() 
           console.log(Result3)
        }

        continue
    } 

    else if(varAgis == 14){ 
        PrimeraVenta()
        continue
    } 

    else if(varAgis == 15){ 
        ClientesDuplicados()
        continue
    } 

    else if(varAgis == 16){ 
        FuncionSinProposito()
        continue
    } 

    else if(varAgis == 17){ 
        totalVenta1Cicle()
        continue
    } 

    else if(varAgis == 18){ 
        ClientesRecurrentesWhitset()
        continue
    } 

    else if(varAgis == 19){ 
        VentasPorCleinte()
        continue
    } 

    else if(varAgis == 20){ 
        ComboRegalo()
        continue
    } 

    else if(varAgis == 21){ 
        ProductoEstrellaXciudad()
        continue
    } 

    else if(varAgis == 22){ 
        FirtCliOrd()
        continue
    } 

    else if(varAgis == 23){   

        let yaropci 

        while(true){ 
            yaropci= Number(prompts("Numero de Opcion deseada /1.Mejor semana BruteForce /2. Mejor Semana Ventan deslisante/ ")) 

            if(yaropci !== 1 && yaropci !== 2){ 
                console.log("opcion invalida o inexistente") 
                continue
            } 

            break
        } 

        if(yaropci == 1){ 
            mejorSemanaBruta()
        } 
        else if(yaropci == 2){ 
            mejorSemana()
        }
        continue
    } 

    else if(varAgis == 24){ 
        parMasCercano()
        continue
    } 
    
    else if(varAgis == 0){
        console.log("salio del programa")
        break
    } 





}
