import {
    prompts,
    productos, 
    Ciudades_Coverturas,
    Db_ventas,  
    ClientesDall
} from "./Db_datosDic.js"  


export function GananciasTotales(){ 
    
    let Anglahad= 0  
    let rolok1=null

    for ( let[Uro, boros] of Db_ventas.entries()){ 

        Anglahad+= boros.montoVenta

    }  

    rolok1=[{Estad: "Ganacias totales", Monto: Anglahad}]

    console.table([{...rolok1[0], Monto: `$${Anglahad}`}]) 

    return rolok1

}  

export function MapGananciasTotales(){  

    let conversion= Array.from(Db_ventas.values()); 
    let rolok2

    let ToGOal= conversion.reduce((lank, kard) => { 
        return lank + kard.montoVenta; 
    }, 0) 

    let cantToTProds= conversion.reduce((Alque, max) => 
    {
        return Alque + max.Cantidad;
    },0) 

    rolok2= [{Estad: "Ganacias totales", Cantidad_itemVendidos: cantToTProds, Promedio_ganacia: ToGOal}]

    console.table(rolok2) 

    return rolok2
}

export function TotalItemsBendidos (){ 

    let focalor=0 
    let rolo= null

    for(let [Rak,shas] of Db_ventas.entries()){ 

        focalor+= shas.Cantidad
    } 

    rolo= [{Estad2: "Total de intems Vendidos", Cantidad: focalor}]

    console.table(rolo) 

    return rolo
}  

export function MapTotalItemsBendidos(){
    
    let rolo2= null
    let antesesax =Array.from(Db_ventas.values())  

    let contunterloger= antesesax.reduce((Ante, sax) => {
        return Ante + sax.Cantidad;
    },0) 

    rolo2= [{Estad3:"Cantidad de productos ventidos", Cantidad: contunterloger,}]

    console.table(rolo2) 

    return rolo2

}

export function  MayorVenta(){ 

    let CanonMax= null  

    for (let[identificador, Guts] of Db_ventas.entries()){ 

        if(CanonMax === null || Guts.montoVenta> CanonMax.Guts.montoVenta){

            CanonMax= { identificador, Guts}

        } 
        

    }  

    console.table([  

        {Indice: CanonMax.identificador, Title:"Mayor venta"  ,ValorVenta: "$"+CanonMax.Guts.montoVenta.toLocaleString("es-CO") }

    ])

} 

export function PrecioPromedioVenta(){ 

    let Tyraxes= new Map()
    let ContuerLock= 0  
    let OutTotal=0  
    let Id_Reporte=0

    for (let[Nost, feratu] of Db_ventas.entries()){ 

        ContuerLock+=1  

        OutTotal+= feratu.montoVenta 
        let Absoltitle= feratu.FechaVenta
        Id_Reporte= RandomId()

        Tyraxes.set(Id_Reporte,{

            Producto_venta: feratu.Producto,
            Fecha_de_Venta: Absoltitle,  
            Monto_x_Venta: feratu.montoVenta
        })

    } 

    let PromedioVenta= OutTotal/ContuerLock  

    const Reporters = Array.from(Tyraxes, ([Titilest, Contenttless]) => ({ 

        Id_Reporte: Titilest, 
        ...Contenttless

    })) 


    console.table(Reporters)

    console.table([

        {
            Title: "Monto de venta Promedio", 
            Promedio: "$"+PromedioVenta.toLocaleString("es-CO")
        }

    ])

} 


export function TotalVentasXciudad(){ 
    
    let DiccionarioVentas= new Map()

    for(let Anacron in Ciudades_Coverturas){ 

        let TotalCiudad=0  
        let Covert = Ciudades_Coverturas[Anacron]

        for (let[Bullet, charger] of Db_ventas.entries()){

            if( Covert == charger.Ciudad){ 

                TotalCiudad+=charger.montoVenta
                
            }
        } 
  
        let idkang= RandomId()

        DiccionarioVentas.set(idkang,{ 

            Zona_de_Cobertura:Covert, 
            GanaciasxCiudad:"$"+TotalCiudad.toLocaleString("es-CO")
        })

    }  

    const listarall= Array.from(DiccionarioVentas, ([Identifier, divrol]) => ({

        idkang: Identifier, 
        ...divrol

    }))     

    console.table(listarall) 

    return listarall
    
}  

export  function MaPTotalVentasXciudad(){ 


    let DictMapVentasxProd= new Map()  
    let idReport

    for ( let renekton of Ciudades_Coverturas) {   

        idReport=RandomId()

        let utilitsArray= Array.from(Db_ventas.values())

        let GroupCioudad= utilitsArray.filter( utilitsArray => utilitsArray.Ciudad === renekton) 

        let AbsolutMonto= GroupCioudad.reduce((placi,dusax) => { 

            return placi+ dusax.montoVenta;
        },0)

        DictMapVentasxProd.set(idReport,{

            Id_reporte:idReport, 
            CiudadxCovertura: renekton,
            GananciasxCiudad: AbsolutMonto

        })


    } 


    const Anubis = Array.from(DictMapVentasxProd,  ([Anka, lagon]) => ({

        idReport: Anka, 
        ...lagon


    })

    ) 

    console.table(Anubis) 

    return Anubis


} 

export function unidadesPorProducto(){

    let anpharos= new Map()  

    let Fusaron

    let conversolang= Array.from(Db_ventas.values()) 

    for(let[loc,ust] of productos.entries()){  

        Fusaron= RandomId()

        let roac= conversolang.filter(conversolang => conversolang.Producto === ust.nombre) 
        let loren= roac.reduce((arthur, morgan) => { 

            return arthur + morgan.Cantidad
        },0) 

        anpharos.set(Fusaron,{

            Id_Reporte:Fusaron, 
            Producto:ust.nombre, 
            CantidadDELproducto:loren

        })

        

    }

    const Ra = Array.from(anpharos,  ([Rek, sai]) => ({

        Fusaron: Rek, 
        ...sai
    })

    )  

    console.table(Ra)



} 

export function sortlog(){ 


    const anloros= structuredClone(Db_ventas)    
    let conversorAbsolutee= Array.from(anloros.values()) 

    let finalCOmp= new Map()  

    let orderyulok= null

    for(let[ret,glo] of productos){  

        let iduniquer= RandomId()


        let filtroProd= conversorAbsolutee.filter(conversorAbsolutee => conversorAbsolutee.Producto === glo.nombre) 

        let AnforosTOt= filtroProd.reduce((retu, kio) => { 

            return retu + kio.montoVenta
        },0)  



        finalCOmp.set(iduniquer,{ 

            Producto:glo.nombre, 
            MOntosumado:AnforosTOt,
        })  

        let futcover= Array.from(finalCOmp.values())

        orderyulok= futcover.sort( 
            (Dart1, Dart2)=> Dart2.MOntosumado - Dart1.MOntosumado
        )

    } 

    console.table(orderyulok)


}


function RandomId(){

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


export function sortingForreport(){ 

    const anloros= structuredClone(Db_ventas)    
    let conversorAbsolutee= Array.from(anloros.values()) 

    let finalCOmp= new Map()  

    let orderyulok= null

    for(let[ret,glo] of productos){  

        let iduniquer= RandomId()


        let filtroProd= conversorAbsolutee.filter(conversorAbsolutee => conversorAbsolutee.Producto === glo.nombre) 

        let AnforosTOt= filtroProd.reduce((retu, kio) => { 

            return retu + kio.montoVenta
        },0)  



        finalCOmp.set(iduniquer,{ 

            Producto:glo.nombre, 
            MOntosumado:AnforosTOt,
        })  

        let futcover= Array.from(finalCOmp.values())

        orderyulok= futcover.sort( 
            (Dart1, Dart2)=> Dart2.MOntosumado - Dart1.MOntosumado
        )

    } 

        console.table(orderyulok.slice(0,3))
} 

export function OrderFecha (){ 


    let placityu= Map.groupBy(
        Db_ventas.values(), 
        Registro => Registro.FechaVenta
    )  

    let lors= Array.from(placityu, ([fecha, contenf]) => 

        contenf.map(contenf => ({

            Idregister: fecha, 
            ...contenf


        }))
    ).flat() 
    

    console.table(lors)


} 

export function PrimeraVenta(){ 

    let Vult= Array.from(Db_ventas.values()) 

    let PrimeraVenta= Vult.filter((sail,cords) => cords === 0) 

    let result= {
        FechaVenta: PrimeraVenta[0].FechaVenta, 
        IdCliente: PrimeraVenta[0].IdCliente, 
        Producto: PrimeraVenta[0].Producto, 
        Ciudad: PrimeraVenta[0].Ciudad,
        Cantidad: PrimeraVenta[0].Cantidad, 
        montoVenta: PrimeraVenta[0].montoVenta, 
        PrecioXunidad: PrimeraVenta[0].PrecioXunidad,
    }

    console.table(result)


}



export function ClientesDuplicados(){   

    console.time("Filter") 

    let sintId= RandomId()

    let DictResultReal= new Map() 
    let ClientesRepetidos= new Map()

    let MaterialBase= Array.from(Db_ventas.values()) 

    let SezgoInder= Object.groupBy(MaterialBase, MaterialBase=> MaterialBase.IdCliente) 

    for (let[contraseña, tesoro] of Object.entries(SezgoInder)){  

        let idReport44= RandomId() 

        if (tesoro.length>1){

            ClientesRepetidos.set(idReport44,{ 

                id: contraseña

            })

        }

    }  


    for (let[Keter, Euclid] of  ClientesRepetidos.entries()){ 

        let filtraciones = MaterialBase.filter(shuvnigurat => shuvnigurat.IdCliente == Euclid.id) 

        let Cantidad= filtraciones.length 

        DictResultReal.set(Keter,{ 

            IdCliente: Euclid.id,
            Cantidad_Ventas_Asociadas: Cantidad,

        })
    }

    let imop= Array.from(DictResultReal, ([LLave, cipher]) => ({ 

        ClaveRegistro: LLave, 
        ...cipher

    })) 

    console.table(imop)

    console.timeEnd("Filter")

} 

export function FuncionSinProposito(){   

    let matrizResuklt= new Map() 

    let firstConter=0 

    let ALetsCLav= RandomId()

    let matrialBas22= Array.from(Db_ventas.values()) 

    let clonicas= matrialBas22.map(ciudadNorm =>({ 
        ...ciudadNorm, 

        Ciudad: ciudadNorm.Ciudad.trim().toUpperCase()
    })) 

    for (let Zelda of Ciudades_Coverturas){   

        firstConter+=1

        console.log("N°- ",firstConter," ", Zelda)

    }  

    let ingresoOpCiudad

    while(true){
        ingresoOpCiudad= Number(prompts("ingrese ciudad a filtrar ")) 

        if (ingresoOpCiudad <=0 || !Number.isInteger(ingresoOpCiudad)){ 
            console.log("opcion inexsitente") 
            continue
        } 

        break
    } 

    let ciudadDeseada

    if(ingresoOpCiudad == 1){
        ciudadDeseada= "MEDELLÍN"
    } 
    else if(ingresoOpCiudad == 2){ 
        ciudadDeseada= "BOGOTÁ"
    } 
    else if(ingresoOpCiudad == 3){ 
        ciudadDeseada= "CALI"
    }
    else if(ingresoOpCiudad ==4){ 
        ciudadDeseada= "PEREIRA"
    } 


    let juzagarHist= clonicas.filter(clonicas => clonicas.Ciudad == ciudadDeseada)  

    let CantVentas= juzagarHist.length

    let TotalCiudad= juzagarHist.reduce((Biz,Muto)=>{

        return Biz+ Muto.montoVenta
    },0) 

    matrizResuklt.set(ALetsCLav,{ 
        Ciudad:juzagarHist[0].Ciudad, 
        GananciaSTotales:TotalCiudad, 
        Total_Ventas_Asociadas:CantVentas
    }) 

    let conversorPrintnes= Array.from(matrizResuklt,([Godwin, radan]) => ({ 

        NumeroRegistro:Godwin, 
        ...radan
    })) 

    console.table(conversorPrintnes)

} 

export function totalVenta1Cicle(){  

    let reportRay= new Map()

    console.log(` 
        
        seleccione numero de ciudad deseada  
        
        1-Medellin  
        2-Bogota
        3-Cali
        4-Pereira
        
        
    `) 

    let oprTVci 

    while(true){ 

        oprTVci= Number(prompts("ingrese opcion deseada ")) 

        if(oprTVci<=0 || oprTVci>4 || !Number.isInteger(oprTVci)){ 
            console.log("opcion inexitente ") 
            continue
        } 

        break

    } 

    let relacomp

    if(oprTVci == 1){

        relacomp= Ciudades_Coverturas[0]
    }
    else if(oprTVci == 2){
        relacomp= Ciudades_Coverturas[1]
    } 
    else if(oprTVci == 3){
        relacomp= Ciudades_Coverturas[2]
    }
    else if(oprTVci == 4){
        relacomp= Ciudades_Coverturas[3]
    } 

    let conterro1= 0 
    let conterrot2=0
    let IdRelalog

    for(let [yumi, yunara] of Db_ventas.entries()){ 

        if(yunara.Ciudad == relacomp){

            conterro1+=yunara.montoVenta 
            conterrot2+=yunara.Cantidad 
            IdRelalog= yumi

        } 

    }  


    reportRay.set(IdRelalog,{ 

        GananciasTotales:conterro1, 
        VentasAsociadas: conterrot2

    }) 

    let rtles= Array.from(reportRay,([volibear, hornn]) => ({ 

        idRegistes:volibear,
        ...hornn

    })) 

    console.table(rtles)

}

export function ClientesRecurrentesWhitset(){ 

    console.time("Filter")

    let MapCLientesVisto= new Map()  
    let MapClienteRecurrente= new Map()
    
    let ClientesVistos= new Set() 
    let ClientesRecurrentes= new Set()  

    let ConvMaterialBase= Array.from(Db_ventas.values())

    for( let [ruler, Vesel] of Db_ventas.entries()){ 
        
        let filtro= ConvMaterialBase.filter(Azatot => Azatot.IdCliente == Vesel.IdCliente) 

        let cantUserespec= filtro.length 

        if( cantUserespec >= 2){

            ClientesRecurrentes.add(filtro[0].IdCliente) 
            ClientesDall.add(filtro[0].IdCliente)

        } 
        else{ 
            ClientesVistos.add(filtro[0].IdCliente) 
            ClientesDall.add(filtro[0].IdCliente)

        }

    }  

    for(let RestCL1 of ClientesVistos){ 

        let idReget1= RandomId() 

        MapCLientesVisto.set(idReget1,{ 

            Id_Del_Usuario:RestCL1

        })

    } 

    for(let RestCL2 of ClientesRecurrentes){ 

        let idReget2 = RandomId() 

        MapClienteRecurrente.set(idReget2,{

            Id_Del_Usuario:RestCL2

        })
    } 

    let ImprVistos= Array.from(MapCLientesVisto,([Pantheon, Cogmaw]) => ({ 

        S_Registros: Pantheon, 
        ...Cogmaw

    })) 

    let ImorRecurrentes= Array.from(MapClienteRecurrente,([Tracer, Eco]) => ({

        S_Registros: Tracer, 
        ...Eco

    })) 


    console.log("Clientes Recurrentes Registrados") 
    console.table(ImorRecurrentes) 

    console.log("Cleintes Vistos Registrados") 
    console.table(ImprVistos)  

    console.timeEnd("Filter")
} 


export function VentasPorCleinte(){ 

    let RootResultClient= new Map() 

    let conversorsRaz= Array.from(Db_ventas.values())  

    for (let ofrod of ClientesDall){ 

        let tiznad= conversorsRaz.filter(anakara => anakara.IdCliente == ofrod) 

        let montventCli= tiznad.reduce((Bar,bosa) =>{ 

            return Bar + bosa.montoVenta

        },0) 

        let ventasoc= tiznad.length 

        RootResultClient.set(tiznad[0].IdCliente,{ 

            N_ventasAsociadas:ventasoc, 
            Monto_comprado:montventCli,

        })

    } 

    let yiti = Array.from(RootResultClient,([Sakarner, Chogat]) => ({ 

        Idregister: Sakarner, 
        ...Chogat

    }) ) 

    console.table(yiti)
}

export function ComboRegalo(){ 

    let Rusm1= 0  
    let Nomb1= 0  
    let IdOne=0

    let Rusm2=0 
    let Nomb2=0     
    let IdSecond=0 

    let cunt=0 

    let operant12 
    while(true){ 
        operant12= Number(prompts("dese ven combo de 1. 87000/ 2. 61000/ 3. 10000/ ")) 

        if ( operant12 !== 1 && operant12 !== 2 && operant12 !== 3){ 
            console.log("opcion numerica invalida o inexistente") 
            continue
        } 

        break
    }  
    
    let operant

    if(operant12 == 1){
        operant= 87000
    } 

    else if(operant12 == 2){ 
        operant= 61000
    } 

    else if(operant12 == 3){ 
        operant= 10000
    }


    for(let[Kaiser, vlad] of productos.entries()){  

        cunt+=1
        
        Rusm1= vlad.valor
        Nomb1= vlad.nombre  
        IdOne= Kaiser

        for(let[Atrox, kayn] of productos.entries()){  

            cunt+=1
    
            Rusm2= kayn.valor 
            Nomb2= kayn.nombre  
            IdSecond= Atrox
        }   



        if (Rusm1 === Rusm2){
            continue
        }

        let dobleCheck= Rusm1 + Rusm2 

        if(dobleCheck == operant){
            console.table({ 

                IdProducto: IdOne,
                Nombre: Nomb1, 
                Valor_x_Unidad: Rusm1,

            }) 
            console.table({ 
                IdProducto: IdSecond, 
                Nombre: Nomb2, 
                Valor_x_Unidad: Rusm2,

            }) 

            break
        } 

        if( dobleCheck !== operant && cunt>=12){ 
            console.log("Precio para cupon impsible") 
            break
        }

    } 
}

export function ProductoEstrellaXciudad(){ 

    let FiltroPordcuto= null 
    let DictEstelar= new Map()
    let RayDictVn= Array.from(Db_ventas.values()) 
    let CantVV=null  
    

    for (let focalor of Ciudades_Coverturas){   

        let DictProdEstellar= new Map()  
        let RandomDID= RandomId()

        let FiltroPorciudad = RayDictVn.filter(Ram => Ram.Ciudad == focalor)
        
        for(let[Fult, tuker] of productos.entries()){

            FiltroPordcuto= FiltroPorciudad.filter(Turnes => Turnes.Producto == tuker.nombre)  
            CantVV= FiltroPordcuto.length   

            DictProdEstellar.set(Fult,{ 

            Item:tuker.nombre, 
            Frecuencia:CantVV, 
            Ciudad:focalor,

        }) 

        }   


        let Kabla= Array.from(DictProdEstellar.values()) 

        let ordeCon= Kabla.sort((kifa, kefo)=> 
           kefo.Frecuencia - kifa.Frecuencia
        )  

        DictEstelar.set(RandomDID,{

            Ciudad: ordeCon[0].Ciudad, 
            ProductoIt: ordeCon[0].Item, 
            Cantidad:ordeCon[0].Frecuencia,

        })     

    } 

    let imperrr= Array.from(DictEstelar,([Codigo, contenido]) => ({ 
        IDRg: Codigo, 
        ...contenido

    })) 

    console.table(imperrr)

} 

export function FirtCliOrd(){ 

    let cobe= Array.from(Db_ventas.values())  
    let Resultado= 0

    for(let Krakis of ClientesDall){ 

        let turing= cobe.filter(turing => turing.IdCliente == Krakis) 

        if( turing.length <2 && turing.length>0 ){ 

            Resultado= {

                IdCliente: Krakis, 
                ventas_Asopciadas: turing.length, 

            } 

            break
        } 
    } 

    console.table(Resultado)


} 


export function mejorSemanaBruta() {

    let k = 7
    let ventas = Array.from(Db_ventas.values())
    let gananciasPorFecha = new Map()

    if (ventas.length === 0) {
        console.log("No hay ventas para calcular")
        return
    }

    for (let venta of ventas) {
        let gananciaFecha = gananciasPorFecha.get(venta.FechaVenta)

        if (gananciaFecha === undefined) {
            gananciaFecha = 0
        }

        gananciasPorFecha.set(
            venta.FechaVenta,
            gananciaFecha + venta.montoVenta
        )
    }

    let fechas = Array.from(gananciasPorFecha.keys()).sort()
    let dias = []

    let fechaInicial = new Date(fechas[0] + "T00:00:00Z")
    let fechaFinal = new Date(fechas[fechas.length - 1] + "T00:00:00Z")

    for (
        let fechaActual = new Date(fechaInicial);
        fechaActual <= fechaFinal;
        fechaActual.setUTCDate(fechaActual.getUTCDate() + 1)
    ) {
        let fechaTexto = fechaActual.toISOString().slice(0, 10)
        let totalDia = gananciasPorFecha.get(fechaTexto)

        if (totalDia === undefined) {
            totalDia = 0
        }

        dias.push({
            Fecha: fechaTexto,
            Ganancia: totalDia
        })
    }

    while (dias.length < k) {
        let ultimaFecha = new Date(
            dias[dias.length - 1].Fecha + "T00:00:00Z"
        )

        ultimaFecha.setUTCDate(ultimaFecha.getUTCDate() + 1)

        dias.push({
            Fecha: ultimaFecha.toISOString().slice(0, 10),
            Ganancia: 0
        })
    }

    let mejorSuma = -1
    let inicioMejor = 0

    for (let inicio = 0; inicio <= dias.length - k; inicio++) {

        let sumaBloque = 0

        for (let dia = 0; dia < k; dia++) {
            sumaBloque += dias[inicio + dia].Ganancia
        }

        if (sumaBloque > mejorSuma) {
            mejorSuma = sumaBloque
            inicioMejor = inicio
        }
    }

    console.table([{
        Desde: dias[inicioMejor].Fecha,
        Hasta: dias[inicioMejor + k - 1].Fecha,
        GananciasBrutas: mejorSuma
    }])
} 

export function mejorSemana() {

    let k = 7
    let ventas = Array.from(Db_ventas.values())
    let gananciasPorFecha = new Map()

    if (ventas.length === 0) {
        console.log("No hay ventas para calcular")
        return null
    }

    for (let venta of ventas) {
        let totalFecha = gananciasPorFecha.get(venta.FechaVenta)

        if (totalFecha === undefined) {
            totalFecha = 0
        }

        gananciasPorFecha.set(
            venta.FechaVenta,
            totalFecha + venta.montoVenta
        )
    }

    let fechas = Array.from(gananciasPorFecha.keys()).sort()
    let dias = []

    let fechaInicial = new Date(fechas[0] + "T00:00:00Z")
    let fechaFinal = new Date(fechas[fechas.length - 1] + "T00:00:00Z")

    for (
        let fechaActual = new Date(fechaInicial);
        fechaActual <= fechaFinal;
        fechaActual.setUTCDate(fechaActual.getUTCDate() + 1)
    ) {
        let fecha = fechaActual.toISOString().slice(0, 10)
        let totalDia = gananciasPorFecha.get(fecha)

        if (totalDia === undefined) {
            totalDia = 0
        }

        dias.push({
            Fecha: fecha,
            Ganancia: totalDia
        })
    }

    while (dias.length < k) {
        let ultimaFecha = new Date(
            dias[dias.length - 1].Fecha + "T00:00:00Z"
        )

        ultimaFecha.setUTCDate(ultimaFecha.getUTCDate() + 1)

        dias.push({
            Fecha: ultimaFecha.toISOString().slice(0, 10),
            Ganancia: 0
        })
    }

    let sumaVentana = 0

    for (let dia = 0; dia < k; dia++) {
        sumaVentana += dias[dia].Ganancia
    }

    let mejorSuma = sumaVentana
    let inicioMejor = 0

    for (let inicio = 1; inicio <= dias.length - k; inicio++) {
        sumaVentana += dias[inicio + k - 1].Ganancia
        sumaVentana -= dias[inicio - 1].Ganancia

        if (sumaVentana > mejorSuma) {
            mejorSuma = sumaVentana
            inicioMejor = inicio
        }
    }

    let resultado = {
        DiaInicio: dias[inicioMejor].Fecha,
        DiaFin: dias[inicioMejor + k - 1].Fecha,
        GananciasBrutas: mejorSuma
    }

    console.table([resultado])
    return resultado
}  


export function parMasCercano() {

    let presupuesto = Number(prompts("Ingrese su presupuesto máximo: "))

    while (!Number.isFinite(presupuesto) || presupuesto < 0) {
        console.log("Ingrese un presupuesto válido")
        presupuesto = Number(prompts("Ingrese su presupuesto máximo: "))
    }

    let precios = Array.from(productos, ([codigo, producto]) => ({
        Codigo: codigo,
        Nombre: producto.nombre,
        Precio: producto.valor
    }))

    precios.sort((producto1, producto2) => producto1.Precio - producto2.Precio)

    if (precios.length < 2) {
        console.log("Se necesitan al menos dos productos")
        return null
    }

    let izquierda = 0
    let derecha = precios.length - 1
    let mejorSuma = -1
    let mejorPar = null

    while (izquierda < derecha) {

        let sumaActual = precios[izquierda].Precio + precios[derecha].Precio

        if (sumaActual <= presupuesto) {

            if (sumaActual > mejorSuma) {
                mejorSuma = sumaActual
                mejorPar = {
                    Producto1: precios[izquierda].Nombre,
                    Precio1: precios[izquierda].Precio,
                    Producto2: precios[derecha].Nombre,
                    Precio2: precios[derecha].Precio,
                    Total: sumaActual
                }
            }

            izquierda += 1
        }
        else {
            derecha -= 1
        }
    }

    if (mejorPar === null) {
        console.log("No hay dos productos que se ajusten al presupuesto")
        return null
    }

    console.table([mejorPar])
    return mejorPar
}