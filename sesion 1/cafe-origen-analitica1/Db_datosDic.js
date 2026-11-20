import PromptSync from  "prompt-sync";

export const prompts= PromptSync(); 

export let productos = new Map([

  ["HU01", { 
    nombre: "Origen Huila 500 g",   
    valor: 18000 }],

  ["NA02", { 
    nombre: "Origen Nariño 250 g",  
    valor: 13000 }],

  ["SI03", { 
    nombre: "Origen Sierra 500 g",  
    valor: 18000 }],

  ["PF04", { 
    nombre: "Prensa francesa",      
    valor: 95000 }],

  ["MM05", { nombre: "Molino manual",        
    valor: 120000 }]
]); 

export let Ciudades_Coverturas= ['Medellín','Bogotá','Cali','Pereira']

export let Db_ventas= new Map([

    [1,{FechaVenta:"2026-09-01", 
       IdCliente:"C01", 
       Producto:"Origen Huila 500 g", 
       Ciudad:"Medellín", 
       Cantidad:2, 
       montoVenta:42000, 
       PrecioXunidad:18000 
    }],


    [2,{FechaVenta:"2026-09-01", 
       IdCliente:"C02", 
       Producto:"Origen Nariño 250 g", 
       Ciudad:"Bogotá", 
       Cantidad:1, 
       montoVenta: 26000, 
       PrecioXunidad:13000
    }],
    
    [3,{FechaVenta:"2026-09-02", 
        IdCliente:"C03", 
        Producto:"Prensa francesa", 
        Ciudad:"Cali", 
        Cantidad:1, 
        montoVenta:95000, 
        PrecioXunidad:95000
    }],
    
    [4,{FechaVenta:"2026-09-02", 
        IdCliente:"C01", 
        Producto:"Origen Huila 500 g", 
        Ciudad:"Medellín", 
        Cantidad:1, 
        montoVenta:42000, 
        PrecioXunidad:18000

    }],
    
    [5,{FechaVenta:"2026-09-03", 
        IdCliente:"C04", 
        Producto:"Origen Sierra 500 g", 
        Ciudad:"Medellín", 
        Cantidad:3 , 
        montoVenta:45000, 
        PrecioXunidad:18000

    }],
    
    [6,{FechaVenta:"2026-09-03", 
        IdCliente:"C05", 
        Producto:"Origen Nariño 250 g", 
        Ciudad:"Bogotá", 
        Cantidad:2, 
        montoVenta:26000 , 
        PrecioXunidad:13000

    }],
    
    [7,{FechaVenta:"2026-09-04", 
        IdCliente:"C02", 
        Producto:"Molino manual", 
        Ciudad:"Bogotá", 
        Cantidad:1,
         montoVenta:120000, 
         PrecioXunidad:120000

    }], 

    [8,{FechaVenta:"2026-09-04", 
        IdCliente:"C06", 
        Producto:"Origen Huila 500 g", 
        Ciudad:"Cali", 
        Cantidad:2, 
        montoVenta:42000, 
        PrecioXunidad:18000

    }],
    
    [9,{FechaVenta:"2026-09-05", 
        IdCliente:"C03", 
        Producto:"Origen Sierra 500 g", 
        Ciudad:"Cali", 
        Cantidad:2, 
        montoVenta:45000, 
        PrecioXunidad:18000

    }],
    
    [10,{FechaVenta:"2026-09-05", 
        IdCliente:"C07", 
        Producto:"Origen Huila 500 g", 
        Ciudad:"Pereira", 
        Cantidad:4, 
        montoVenta:42000, 
        PrecioXunidad:18000

    }],
    
    [11,{FechaVenta:"2026-09-06", 
        IdCliente:"C01", 
        Producto:"Prensa francesa", 
        Ciudad:"Medellín", 
        Cantidad:1, 
        montoVenta:95000, 
        PrecioXunidad:95000

    }],
    
    [12,{FechaVenta:"2026-09-06", 
        IdCliente:"C08", 
        Producto:"Origen Nariño 250 g", 
        Ciudad:"Bogotá", 
        Cantidad:3, 
        montoVenta:26000, 
        PrecioXunidad:13000

    }]

]);

function generadorDates(){ 

    let InitRangoDate= new Date("2020-01-01") 
    let EndrangeDate= new Date("2040-12-31")

    let finaldate= new Date( 
        InitRangoDate.getTime()+ Math.random()*(EndrangeDate.getTime() - InitRangoDate.getTime())
    ) 

    return finaldate.toISOString().slice(0, 10);

}

export function Ingreso_Manual(){ 
 
    let Cantingreso
    while(true){  
        
        Cantingreso= Number(prompts("ingrese cantidad de registros deseados "))

        if(Cantingreso<=0 || !Number.isInteger(Cantingreso)){ 

            console.log("dato ingresado ",Cantingreso," invalido, debeser entero y mayor a 0") 

            continue
        } 

        break

    } 

    for(let bucladorIng = 0; bucladorIng< Cantingreso; bucladorIng++){  

        let lasid
        for(const [contenId , contenOG] of Db_ventas.entries()){ 
            lasid= contenId
        }  

        let newIDVeta= lasid + 1

         
        let idCLiennte1
        while (true){  

            idCLiennte1= Number(prompts(" ingrese numero del cliente ")) 
            
            if(idCLiennte1<=0 || !Number.isInteger(idCLiennte1)){ 

                console.log("dato invalido, numero de cleiente debe ser entero y mayor de 0") 
                continue 
            } 
            break

        } 

        let idCleinte2= "C"+ String(idCLiennte1).padStart(2,"0"); 

        let fechaVenta= generadorDates()    

        let cont1=0

        for(let opcid of Ciudades_Coverturas){ 

            cont1+=1

            console.log("Opcion N° ",cont1,"- ",opcid)

        } 

        let opciudad= Number(prompts("opcion de ciudad donde se genero la venta ")) 

        while (opciudad<=0 || !Number.isInteger(opciudad) || opciudad>4){ 

            console.log("ingreso invalida opcion de ciudad no existe") 
            opciudad= Number(prompts("opcion de ciudad donde se genero la venta "))
        } 

        let cuiudadVenta
        
        if(opciudad == 1){ 
            cuiudadVenta = Ciudades_Coverturas[0];
        }else if(opciudad == 2){ 
            cuiudadVenta = Ciudades_Coverturas[1];
        }else if(opciudad == 3)
        {
            cuiudadVenta = Ciudades_Coverturas[2];
        }else if(opciudad == 4){
            cuiudadVenta = Ciudades_Coverturas[3];
        } 

        let contadorProd=0
        for( let [distintivo, inerlock] of productos.entries()){  
            contadorProd+=1
            console.log("N°-",contadorProd," ", inerlock.nombre)
        } 

        let ProductoDeseado1= Number(prompts("ingrese el numero de producto deseado "))

        while (ProductoDeseado1<=0 || !Number.isInteger(ProductoDeseado1) || ProductoDeseado1>5){  
            console.log("opcion invalida")
            ProductoDeseado1= Number(prompts("ingrese el numero de producto deseado "))
        }   

        let ProdBusq

        if(ProductoDeseado1 == 1){ 
            ProdBusq="HU01"
        }
        else if(ProductoDeseado1 == 2){
            ProdBusq="NA02"
        } 
        else if(ProductoDeseado1 == 3){
            ProdBusq="SI03"
        }
        else if(ProductoDeseado1 == 4){
            ProdBusq="PF04"
        }
        else if(ProductoDeseado1 == 5){
            ProdBusq="MM05"
        }

        let productName 
        let precioProd 

        for(let[indice,contenido] of productos.entries()){ 

            if(indice === ProdBusq ){

                productName= contenido.nombre 
                precioProd= contenido.valor 
                break
            }
        } 

        let cantidadXprod 

        while(true){ 

            cantidadXprod= Number(prompts("ingrese cantidad del produto ")) 

            if(cantidadXprod<=0 || !Number.isInteger(cantidadXprod)){
                console.log("ingreso invalido solo enteros mayores a 0") 
                continue
            } 

            break
        } 

        let monto= precioProd * cantidadXprod 

        Db_ventas.set(newIDVeta,{
            FechaVenta:fechaVenta, 
            IdCliente:idCleinte2, 
            Producto:productName, 
            Ciudad:cuiudadVenta,
            Cantidad:cantidadXprod,
            montoVenta:monto, 
            PrecioXunidad:precioProd,
        })

    }

} 

export function Ingreso_Automatico(){ 
    
    let VarBulceVent 

    while (true){ 

        VarBulceVent= Number(prompts("ingrese N de ingresos de deseados ")) 

        if (VarBulceVent<=0 || !Number.isInteger(VarBulceVent)){ 
            console.log("Ingreso invalido solo enteros mayores a 0") 
            continue
        } 

        break
    } 

    for( let Anacronic = 0; Anacronic< VarBulceVent; Anacronic++){ 


        let Ankalagon
        for(const[id33,contei33] of Db_ventas.entries()){ 
            Ankalagon= id33
        } 

        let Idventa= Ankalagon + 1 

        let fechaVenta2= generadorDates() 

        let NumericPart= Math.floor(Math.random()*99)+1; 
        let Previspart= String(NumericPart).padStart(2,"0") 
        let IdCliente="C" + Previspart 

        let CiudadVenta1 = Ciudades_Coverturas[
            Math.floor(Math.random()* Ciudades_Coverturas.length)
        ] 

        let ranDKey = Array.from(productos.keys())[
            Math.floor(Math.random()*productos.size)
        ] 

        let interior 
        let landa
        
        for(let[cipher,treasure] of productos.entries()){

            if(cipher == ranDKey){ 

                interior= treasure.nombre 
                landa= treasure.valor
            }
        } 

        let Cantidad = Math.floor(Math.random()*99)+1 

        let Monto= landa*Cantidad 

        Db_ventas.set(Idventa,{

            FechaVenta:fechaVenta2, 
            IdCliente:IdCliente,
            Producto:interior, 
            Ciudad:CiudadVenta1, 
            Cantidad:Cantidad, 
            montoVenta:Monto,
            PrecioXunidad:landa,
        })
    }

}