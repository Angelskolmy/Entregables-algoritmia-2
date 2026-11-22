import {
    prompts,
    productos, 
    Ciudades_Coverturas,
    Db_ventas
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



