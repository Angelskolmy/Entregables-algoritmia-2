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
- ¿Qué producto se vende más en cada ciudad?
- ¿Cuál es el total bruto de la mejor semana consecutiva?
- ¿Cuántas ventas y cuánto dinero están asociados a cada cliente?
- ¿Qué ventas están registradas para cada fecha?
- ¿Coinciden los resultados calculados con ciclos y con métodos de arreglos?

La opción 11, **Reporte**, reúne varias consultas en una salida de consola.
Algunas consultas del menú piden información adicional de manera interactiva.

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
- `RENDIMIENTO.md`: complejidad temporal y espacial, mediciones disponibles y limitaciones.
- `bitacora.md`: trazas, pruebas y decisiones del desarrollo.

## Nota sobre los datos

Las 12 ventas iniciales se mantienen en memoria y sus montos corresponden a
`Cantidad × PrecioXunidad` con los precios vigentes del catálogo al momento de
la actualización. Los ingresos automáticos agregan registros en memoria y
calculan el monto con el precio actual del producto. No se usa una base de datos
persistente: al reiniciar el programa se recuperan los datos precargados.

## Rendimiento

Las mediciones y el análisis Big O se encuentran en
[RENDIMIENTO.md](./RENDIMIENTO.md). La transcripción de consola disponible
registra una medición interna de `ClientesRecurrentesWhitset()` al procesar
10.012 ventas; no contiene una medición del tiempo total del reporte ni una
ejecución de 100.000 ventas.

La ejecución por argumento, por ejemplo `node src/reporte.js 100000`, todavía
no forma parte de la estructura actual. El reporte disponible se ejecuta desde
la opción 11 del menú interactivo.
