# Café Origen: análisis de ventas

Proyecto de consola en JavaScript para explorar y calcular indicadores a partir de ventas de ejemplo de Café Origen. Los datos se mantienen en memoria durante la ejecución; no se guardan en una base de datos.

## Requisitos

- Node.js 22 o superior.
- npm.

El proyecto usa módulos ES (`import`/`export`) y `prompt-sync` para leer las opciones del menú.

## Cómo ejecutarlo

Desde la raíz del repositorio:

```powershell
npm install
node ".\sesion 1\indexAegis.js"
```

También se puede ejecutar desde la carpeta `sesion 1`:

```powershell
node .\indexAegis.js
```

Sigue las opciones que aparecen en el menú. La opción `0` termina el programa.

## Preguntas que responde

El menú permite consultar, entre otros indicadores:

- ¿Cuáles son los registros del histórico de ventas?
- ¿Cuál es el monto total vendido y cuántas unidades se vendieron?
- ¿Cuál fue la venta individual de mayor monto y cuál es el promedio por venta?
- ¿Cuánto se vendió en cada ciudad?
- ¿Cuántas unidades se vendieron de cada producto?
- ¿Qué productos acumularon el mayor monto de ventas?
- ¿Qué ventas están registradas para cada fecha?
- ¿Coinciden los resultados calculados con ciclos y con métodos de arreglos?

La opción de reporte reúne varias de estas consultas en una salida de consola.

## Estructura actual

```text
sesion 1/
  indexAegis.js
  cafe-origen-analitica1/
    Db_datosDic.js
    Analitica.js
    Explorar.js
    Comparacion.js
    Reportes.js
```

- `Db_datosDic.js`: catálogo de productos, ciudades y ventas de ejemplo; también contiene los ingresos manual y automático.
- `Analitica.js`: cálculos y agrupaciones de ventas.
- `Explorar.js`: listado del histórico.
- `Comparacion.js`: comparación de resultados entre implementaciones.
- `Reportes.js`: composición de varias consultas.
- `indexAegis.js`: menú interactivo.

## Nota sobre los datos

El análisis usa el campo `montoVenta` guardado en cada registro. En algunos datos de ejemplo este monto no coincide con `Cantidad × PrecioXunidad`; por ello, los totales reflejan el monto almacenado y no una corrección automática de los registros.
