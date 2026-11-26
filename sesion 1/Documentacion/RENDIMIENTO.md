# Rendimiento y complejidad

## Alcance de las mediciones disponibles

La transcripción `Pruebas ultima.txt` contiene una ejecución del reporte después
de añadir 10.000 ventas generadas al `Db_ventas` inicial, que ya tenía 12 ventas.
Por tanto, el tamaño procesado por esa corrida fue **10.012 ventas**, no 10.000
exactas.

En esa ejecución aparece `Filter: 3.099s`. Ese cronómetro pertenece a
`ClientesRecurrentesWhitset()` y mide solo esa función, no el tiempo total de
`ReportSol()`. La transcripción no registra un temporizador alrededor del
reporte completo ni identifica dos implementaciones comparables como v0.1 y
v1.0. Tampoco contiene una corrida de 100.000 ventas. Para no presentar una
medición parcial como si fuera el tiempo total, esos resultados se marcan como
no disponibles:

| Versión del reporte | Ventas | Tiempo total reportado |
|---|---:|---:|
| v0.1 | 10.000 | No disponible en la transcripción |
| v1.0 | 10.000 | No disponible en la transcripción |
| v0.1 | 100.000 | No disponible; no aparece la ejecución |
| v1.0 | 100.000 | No disponible; no aparece la ejecución |

Dato medido que sí está en el registro:

| Ejecución identificable | Ventas procesadas | Medición parcial |
|---|---:|---:|
| Reporte interactivo tras generar 10.000 ventas | 10.012 (12 iniciales + 10.000 generadas) | `ClientesRecurrentesWhitset()`: 3,099 s |

La opción 2 del menú de ingreso automático genera ventas adicionales; no
reemplaza las 12 ventas iniciales. La transcripción muestra además una primera
ejecución que se interrumpió con `ReferenceError: sortingForreport is not
defined` y una ejecución posterior que sí continuó. Esa corrida fallida no se
considera una medición válida del reporte completo.

## Cómo obtener una medición comparable

La medición debe rodear la llamada completa a `ReportSol()` con
`console.time()`/`console.timeEnd()` o medir el proceso desde la terminal. Hay
que ejecutar cada versión con la misma cantidad total de ventas, la misma
máquina, una generación comparable y la misma política de impresión de tablas.
Debe anotarse si la cantidad indicada incluye o excluye las 12 ventas iniciales.

El repositorio actual no contiene `src/reporte.js` ni una opción CLI que acepte
`node src/reporte.js 100000`; la ejecución existente se realiza desde el menú
interactivo de `sesion 1/indexAegis.js`. Por ello, ese comando de ejemplo no se
registra como ejecutable ni como fuente de las mediciones.

La medición de 100.000 debe realizarse solo después de controlar el costo de
`ClientesRecurrentesWhitset()`: por cada venta ejecuta un `filter` sobre todas
las ventas. Esto provoca crecimiento cuadrático y puede volver muy lenta la
ejecución cuando n aumenta.

## Complejidad de las funciones

Notación: `n` = ventas, `C` = ciudades, `P` = productos, `U` = clientes
distintos, `D` = días representados y `d` = fechas distintas. En el catálogo
actual `C` y `P` son constantes. El espacio auxiliar excluye los datos globales
ya existentes (`Db_ventas`, `productos` y las ciudades).

| Función | Tiempo | Espacio auxiliar | Motivo principal |
|---|---:|---:|---|
| `GananciasTotales` | O(n) | O(1) | Una pasada y acumulador. |
| `MapGananciasTotales` | O(n) | O(n) | Copia las ventas a un arreglo y las reduce. |
| `TotalItemsBendidos` | O(n) | O(1) | Una pasada y acumulador. |
| `MapTotalItemsBendidos` | O(n) | O(n) | Crea un arreglo de ventas para el `reduce`. |
| `MayorVenta` | O(n) | O(1) | Busca el máximo en una pasada. |
| `PrecioPromedioVenta` | O(n) | O(n) | Guarda un registro por venta en un `Map` y crea su arreglo de salida. |
| `TotalVentasXciudad` | O(Cn) = O(n) | O(1) | Recorre las ventas por cada ciudad; `C` es fijo. |
| `MaPTotalVentasXciudad` | O(Cn) = O(n) | O(n) | Crea copias y arreglos filtrados por ciudad. |
| `unidadesPorProducto` | O(Pn) = O(n) | O(n) | Filtra todas las ventas una vez por producto; `P` es fijo. |
| `sortlog`, `sortingForreport` | O(Pn + P² log P) = O(n) | O(n) | Filtran las ventas por producto y ordenan los productos. |
| `OrderFecha` | O(n) | O(n) | Agrupa ventas, crea arreglos por fecha y aplana la salida. |
| `PrimeraVenta` | O(n) | O(n) | Convierte las ventas a arreglo y aplica `filter`. |
| `ClientesDuplicados` | O(n d), peor caso O(n²) | O(n) | Por cada grupo repetido puede filtrar de nuevo las n ventas. |
| `FuncionSinProposito` | O(n) | O(n) | Normaliza las ventas en un arreglo, filtra y reduce. |
| `totalVenta1Cicle` | O(n) | O(1) | Una pasada de las ventas y acumuladores. |
| `ClientesRecurrentesWhitset` | O(n²) | O(n) | Ejecuta un `filter` de n ventas dentro del recorrido de n ventas. |
| `VentasPorCleinte` | O(nU), peor caso O(n²) | O(n) | Filtra todas las ventas por cada cliente del conjunto. |
| `ComboRegalo` | O(P²) | O(1) | Compara pares de productos; el catálogo es fijo. |
| `ProductoEstrellaXciudad` | O(CPn) = O(n) | O(n) | Filtra ventas por ciudad y producto; C y P son fijos. |
| `FirtCliOrd` | O(nU), peor caso O(n²) | O(n) | Filtra el arreglo completo por cada cliente hasta hallar uno nuevo. |
| `mejorSemanaBruta` | O(n + d log d + Dk) | O(n + D) | Agrupa, ordena fechas, crea días y suma ventanas de k días. |
| `mejorSemana` | O(n + d log d + D) | O(n + D) | Agrupa, ordena y avanza la ventana restando/sumando un día. |
| `parMasCercano` | O(P log P) | O(P) | Ordena los precios y luego usa dos punteros. |
| `Alllist` | O(n) | O(n) | Crea un arreglo que representa el histórico completo. |
| `ReportSol` | O(n²) | O(n) | Compone varias funciones; domina el filtro repetido de clientes. |

`mejorSemanaBruta` y `mejorSemana` también ordenan las fechas distintas. Si `k`
se fija en siete, recorrer las ventanas en la versión bruta cuesta O(D), pero
la ordenación conserva el término O(d log d). La ventana deslizante evita
recalcular los siete valores al avanzar.

`ReportSol()` actualmente invoca `unidadesPorProducto()` dos veces. También
invoca `ClientesRecurrentesWhitset()`, que es el cuello de botella cuadrático,
y `ComboRegalo()`, que solicita una entrada por consola. Esos detalles deben
considerarse al diseñar un modo de reporte no interactivo y al comparar las
versiones.
