# Bitácora de desarrollo y verificación

## Alcance de esta bitácora

Esta bitácora registra la revisión de la versión actual del proyecto, ubicado en `sesion 1/cafe-origen-analitica1`. La estructura existente usa `Db_ventas` como `Map`, módulos ES (`import`/`export`) y funciones que consultan ese mapa. Por tanto, las trazas y resultados de esta bitácora describen esa implementación; no se presentan como si ya existieran los archivos o las funciones parametrizadas que pide el enunciado.

## Exploración y diccionario de datos

La fuente actual contiene 12 ventas en `Db_ventas`. La clave numérica de cada entrada del `Map` identifica la venta; los campos siguientes pertenecen al objeto de esa venta.

| Propiedad | Tipo observado | Significado |
|---|---|---|
| Clave de `Db_ventas` | `number` entero | Identificador de la venta en el mapa. |
| `FechaVenta` | `string` | Fecha de la venta, actualmente representada como `AAAA-MM-DD`. |
| `IdCliente` | `string` | Código del cliente, por ejemplo `C01`. Puede repetirse en ventas distintas. |
| `Producto` | `string` | Nombre del producto vendido. |
| `Ciudad` | `string` | Ciudad donde se registró la venta. |
| `Cantidad` | `number` entero | Unidades incluidas en la venta. |
| `montoVenta` | `number` | Monto total almacenado para la transacción, en pesos. |
| `PrecioXunidad` | `number` | Precio unitario almacenado, en pesos. |

El catálogo `productos` es otro `Map`: sus claves son códigos de producto y sus valores son objetos con `nombre` (`string`) y `valor` (`number`). `Ciudades_Coverturas` es un arreglo de nombres de ciudad (`string`).

## Casos borde y decisiones de calidad

### 1. Descuadre de monto en la venta 1

**Evidencia:** `2 × 18000 = 36000`, pero `montoVenta` almacena `42000`.

**Decisión:** conservar el registro fuente y señalar el descuadre; no modificar el monto sin confirmar la transacción original.

### 2. Descuadre de monto en la venta 2

**Evidencia:** `1 × 13000 = 13000`, pero `montoVenta` almacena `26000`.

**Decisión:** conservar el registro fuente y no asumir si el error está en la cantidad, el precio o el monto.

### 3. Descuadre de monto en la venta 5

**Evidencia:** `3 × 18000 = 54000`, pero `montoVenta` almacena `45000`.

**Decisión:** conservar el dato original hasta validarlo con la fuente. Las ventas 4, 8, 9, 10 y 12 también presentan diferencias del mismo tipo.

Los indicadores actuales que suman `montoVenta` describen el monto registrado. Calcular `Cantidad × PrecioXunidad` es otra métrica y no debe sustituirlo silenciosamente.

### 4. Variaciones de mayúsculas o espacios en ciudades

**Evidencia:** en las 12 ventas actuales no se observa una variante como `"Bogotá "` o `"medellín "`. Sin embargo, las funciones actuales comparan los nombres de forma exacta, de modo que una venta futura con espacios sobrantes o distinta capitalización no coincidiría con el nombre canónico.

**Decisión:** normalizar para comparar usando `trim().toLowerCase()` y conservar una etiqueta canónica para mostrar. No se afirma que el dato malformado esté presente en esta muestra.

### 5. Cantidades inválidas

**Evidencia:** las 12 cantidades de la muestra son enteros positivos; su suma es 23. El ingreso manual también vuelve a pedir una cantidad cuando no es un entero positivo. No se encontró una cantidad inválida en los registros iniciales.

**Decisión:** rechazar cantidades iguales a cero, negativas, decimales o no numéricas en cualquier entrada nueva. Para un conjunto vacío, la suma de unidades debe ser `0`, no `NaN`.

### 6. Clientes repetidos y formato de identificador

**Evidencia:** aparecen varias ventas de clientes como `C01`, `C02` y `C03`. La repetición es compatible con que un cliente realice varias compras y no demuestra que la venta esté duplicada.

**Decisión:** conservar cada transacción y permitir que el ID de cliente se repita. Mantener el formato de dos dígitos (`C01`, `C02`, …) para evitar tratar `C1` y `C01` como identificadores diferentes.

## Plan de indicadores en pseudocódigo

El siguiente plan describe el comportamiento requerido para funciones parametrizadas que reciben una colección `ventas`. No implica que todas esas funciones existan ya en la versión revisada.

### `valorVenta(venta)`

```text
devolver venta.Cantidad multiplicada por venta.PrecioXunidad
```

### `totalVendido(ventas)`

```text
iniciar total en 0
para cada venta en ventas:
    sumar valorVenta(venta) a total
devolver total
```

### `unidadesVendidas(ventas)`

```text
iniciar unidades en 0
para cada venta en ventas:
    sumar venta.Cantidad a unidades
devolver unidades
```

### `ventaMayor(ventas)`

```text
iniciar mayor en null
para cada venta válida en ventas:
    calcular valorVenta(venta)
    si mayor es null o el valor actual supera el valor de mayor:
        guardar la venta completa en mayor
devolver mayor
```

Si no hay ventas válidas, devolver `null` o un mensaje explícito; no inventar un registro.

### `ticketPromedio(ventas)`

```text
iniciar total en 0 e iniciar contador en 0
para cada venta en ventas:
    si venta.Cantidad es mayor que 0:
        sumar valorVenta(venta) a total
        aumentar contador en 1
si contador es 0:
    devolver 0 o informar que no hay ventas válidas
devolver total dividido por contador
```

### `ventasPorCiudad(ventas, ciudad)`

```text
normalizar ciudad solicitada con trim y minúsculas
iniciar total en 0
para cada venta en ventas:
    normalizar venta.Ciudad
    si coincide con la ciudad solicitada:
        sumar el valor definido para la venta al total
devolver total
```

### Agrupaciones y ranking con métodos de arreglos

```text
totalVendidoM:
    sumar con reduce y acumulador inicial 0

unidadesVendidasM:
    sumar Cantidad con reduce y acumulador inicial 0

ventasPorCiudadM:
    filtrar por ciudad normalizada y sumar las coincidencias

totalPorCiudad:
    recorrer las ventas, normalizar la clave de ciudad y acumular el total
    devolver un objeto con una entrada por ciudad canónica

unidadesPorProducto:
    recorrer las ventas y acumular Cantidad por nombre de producto

topProductosPorValor:
    acumular el valor por producto
    convertir los totales a filas
    ordenar una copia de las filas de mayor a menor
    devolver solo las primeras k filas con slice
```

## Trazas manuales y comprobación

### Traza 1: acumulador de `montoVenta`

Esta traza reproduce el criterio de `GananciasTotales()` actual, que suma el campo guardado `montoVenta`.

| Venta | `montoVenta` | Acumulado |
|---:|---:|---:|
| 1 | 42.000 | 42.000 |
| 2 | 26.000 | 68.000 |
| 3 | 95.000 | 163.000 |
| 4 | 42.000 | 205.000 |
| 5 | 45.000 | 250.000 |
| 6 | 26.000 | 276.000 |
| 7 | 120.000 | 396.000 |
| 8 | 42.000 | 438.000 |
| 9 | 45.000 | 483.000 |
| 10 | 42.000 | 525.000 |
| 11 | 95.000 | 620.000 |
| 12 | 26.000 | **646.000** |

### Traza 2: contador/acumulador de unidades

| Venta | `Cantidad` | Acumulado |
|---:|---:|---:|
| 1 | 2 | 2 |
| 2 | 1 | 3 |
| 3 | 1 | 4 |
| 4 | 1 | 5 |
| 5 | 3 | 8 |
| 6 | 2 | 10 |
| 7 | 1 | 11 |
| 8 | 2 | 13 |
| 9 | 2 | 15 |
| 10 | 4 | 19 |
| 11 | 1 | 20 |
| 12 | 3 | **23** |

### Resultado contrastado con los datos actuales

Se importaron los datos del módulo actual y se recalcularon los agregados en un proceso de Node.js, sin editar archivos.

| Indicador con los campos actuales | Resultado |
|---|---:|
| Registros | 12 |
| Suma de `montoVenta` almacenado | $646.000 |
| Unidades | 23 |
| Promedio de `montoVenta` entre 12 ventas | $53.833,33 |
| Total calculado como `Cantidad × PrecioXunidad` | $640.000 |

La suma de la fórmula `Cantidad × PrecioXunidad` no coincide con la suma de `montoVenta` debido a las inconsistencias registradas arriba. El valor de aceptación de `$985.000` indicado en el enunciado no se obtiene con los 12 registros que actualmente están en `Db_datosDic.js`; no se altera la muestra para forzar ese resultado.

Totales de `montoVenta` por ciudad comprobados con los registros actuales: Medellín $224.000, Bogotá $198.000, Cali $182.000 y Pereira $42.000. Unidades por producto: Huila 9, Nariño 6, Sierra 5, Prensa francesa 2 y Molino manual 1.

## Preguntas sobre las colecciones

| Función o indicador | ¿Qué recorro? | ¿Qué filtro? | ¿Qué transformo? | ¿Qué acumulo? | ¿Cómo agrupo? |
|---|---|---|---|---|---|
| Total vendido | Todas las ventas | Ninguna, salvo definir validez | Cada venta a un valor calculado | Monto total | No agrupa |
| Unidades vendidas | Todas las ventas | Ninguna | Extrae `Cantidad` | Unidades | No agrupa |
| Venta mayor | Todas las ventas válidas | Cantidad mayor que 0 | Venta a valor comparable | Máximo y registro completo | No agrupa |
| Ticket promedio | Todas las ventas válidas | Cantidad mayor que 0 | Venta a valor calculado | Monto y contador | No agrupa |
| Ventas por ciudad | Todas las ventas | Ciudad normalizada coincidente | Ciudad a clave canónica | Monto de coincidencias | Por ciudad |
| Total por ciudad | Todas las ventas | Ninguno | Ciudad a clave normalizada | Monto por clave | Diccionario de ciudades |
| Unidades por producto | Todas las ventas | Ninguno | Producto a clave de agrupación | Cantidad por producto | Diccionario de productos |
| Top productos | Todas las ventas y luego los productos agrupados | Selecciona los primeros `k` después de ordenar | Totales a filas ordenables | Monto por producto | Por producto; orden descendente |

## Errores reportados y depuración

### Bogotá aparece como dos grupos

- **Síntoma:** se reportó que Bogotá aparecía dos veces.
- **Entrada que lo produciría:** dos etiquetas equivalentes con escritura distinta, por ejemplo `"Bogotá"` y `"Bogotá "`. Esa variante no está en los 12 registros actuales.
- **Hipótesis:** agrupar por el texto original sin quitar espacios ni normalizar mayúsculas crea claves distintas.
- **Prueba realizada:** se inspeccionaron las ciudades de la muestra y los totales de la versión actual. La muestra contiene los cuatro nombres canónicos y el cálculo actual produjo cuatro filas; el problema no se reprodujo con estos datos. La comparación de `TotalVentasXciudad()` es exacta y no normaliza, por lo que una variante podría quedar fuera del total de su ciudad.
- **Causa:** falta una clave de agrupación normalizada para entradas equivalentes.
- **Corrección decidida:** usar `trim().toLowerCase()` al comparar/agrupar y conservar el nombre canónico para mostrar. Esta corrección queda como decisión documentada; no se modificó código en esta tarea.

### Ticket promedio da `NaN` cuando no hay ventas

- **Síntoma:** el promedio aparece como `$NaN` con una colección vacía.
- **Entrada que lo produce:** cero ventas. La función actual no recibe una fecha ni filtra ventas por día; la prueba vacía se hizo limpiando el `Map` solo dentro de un proceso de Node aislado.
- **Hipótesis:** el acumulado y el contador quedan en cero, provocando `0 / 0`.
- **Prueba realizada:** se vació `Db_ventas` en un proceso temporal y se ejecutó `PrecioPromedioVenta()`. La tabla mostró `$NaN`. El proceso terminó y el archivo de datos no fue modificado.
- **Causa:** `PrecioPromedioVenta()` divide `OutTotal` entre `ContuerLock` sin tratar el caso de cero ventas.
- **Corrección decidida:** comprobar el contador antes de dividir y devolver cero o mostrar “No hay ventas válidas”. El requisito de ventas por día también requiere una función `ventasDelDia(ventas, fecha)`, que no está presente en esta versión.

## Estado frente a los requisitos

La versión actual sí contiene datos de 12 ventas, consultas con ciclos y métodos, tablas de consola, agregaciones por ciudad/producto, ordenamiento de productos y un menú. Sin embargo, la revisión del código muestra diferencias pendientes respecto al entregable descrito:

- No existe la estructura `src/`; los archivos están en `sesion 1/cafe-origen-analitica1/`.
- Las ventas están en un `Map` llamado `Db_ventas`, no en un arreglo exportado como `ventas` con `module.exports`.
- Se usan módulos ES, no `require`/`module.exports`.
- Los indicadores consultan variables importadas y no todos reciben `ventas` como parámetro; no son todos funciones puras.
- No están implementadas las seis funciones parametrizadas requeridas (`valorVenta`, `totalVendido`, `unidadesVendidas`, `ventaMayor`, `ticketPromedio` y `ventasPorCiudad`).
- No se encontraron `verificar.js`, `reporte.js` ni `ventasDelDia(ventas, fecha)`.
- El reporte actual no muestra un resumen diario con y sin ventas.
- La suma actual de `montoVenta` es $646.000, no los $985.000 del criterio de aceptación; revisar la muestra antes de afirmar cumplimiento.

No se declara aquí que los requisitos pendientes estén implementados, ni que se haya realizado un commit o push. 


## MiniReto 5: Predicciones, mediciones y clasificación Big O

**Regla de conteo:** se suma 1 por cada iteración de un ciclo. La comparación que
se evalúa en cada iteración no se cuenta aparte, porque siempre ocurre con ella.
No se cuentan sumas, asignaciones, contadores dentro de un `if` ni el incremento
del propio contador. Las constantes no cambian la clasificación Big O, solo el
número que aparece en la tabla.

**Definición de n:** n es la cantidad de ventas que hay en `Db_ventas` al medir:
las 12 del Día 1 más las generadas. Por eso los valores reales son 112, 1.012,
10.012 y 100.012. Cada medición se hizo reiniciando el programa, sin acumular
datos entre corridas.

**Nota sobre los datos:** la cantidad por venta se genera entre 1 y 99 (no entre
1 y 5) para que los montos no queden cíclicos en la venta mayor. Con 5 productos
y 4 precios distintos, el monto máximo igual puede repetirse con n grande.

### Predicción (escrita antes de medir)

| Función | Operaciones esperadas | Si n × 10 |
|---|---|---|
| totalVendido | n | × 10 |
| ventaMayor | n | × 10 |
| totalPorCiudad | 4n + 4 | × 10 aprox. |
| primeraVenta | constante | no crece |

### Justificación con el código
- **totalVendido:** un solo ciclo que visita cada venta una vez para sumar su
  monto. Operaciones = n.
- **ventaMayor:** un solo ciclo; la comparación con el máximo ocurre en cada
  vuelta y no se cuenta aparte. Operaciones = n.
- **totalPorCiudad:** dos ciclos anidados. El externo recorre las 4 ciudades
  (constante) y el interno recorre las n ventas. Total 4n + 4; se eliminan
  constantes y términos menores.

### Resultados medidos (formato: medido (esperado))

| n real | totalVendido | ventaMayor | totalPorCiudad |
|---:|---:|---:|---:|
| 112 | 112 (112) | 122 (112) | 452 (452) |
| 1.012 | 1.012 (1.012) | 1.017 (1.012) | 4.052 (4.052) |
| 10.012 | 10.012 (10.012) | 10.020 (10.012) | 40.052 (40.052) |
| 100.012 | 100.012 (100.012) | 100.025 (100.012) | 400.052 (400.052) |

Crecimiento al multiplicar n por 10:

| Función | 1.er paso | 2.º paso | 3.er paso |
|---|---:|---:|---:|
| totalVendido | × 9,04 | × 9,89 | × 9,99 |
| ventaMayor | × 8,34 | × 9,85 | × 9,98 |
| totalPorCiudad | × 8,96 | × 9,89 | × 9,99 |

### Comparación con la predicción
- **totalVendido:** coincide exacto con n.
- **totalPorCiudad:** coincide exacto con 4n + 4.
- **ventaMayor:** no coincide. Marcó n + k con k = 10, 5, 8 y 13. Causa: el
  contador dentro del `if` suma 1 cada vez que se reemplaza el máximo, lo que va
  contra la regla de contar solo iteraciones. k depende del orden aleatorio de
  los datos y por eso varía entre corridas.
- El primer salto da cerca de × 9 y no × 10 porque cada n incluye 12 ventas base.
  A medida que n crece, el factor se acerca a × 10.

### Clasificación Big O
- **totalVendido: O(n).** Un ciclo, una visita por venta; medido n exacto.
- **ventaMayor: O(n).** Un ciclo con la comparación en cada vuelta; medido n + k,
  con k pequeño que crece muy despacio. El desvío no cambia la clasificación.
- **totalPorCiudad: O(n).** Ciclo externo de 4 ciudades (O(1)) y ciclo interno de
  n ventas (O(n)); medido 4n + 4. No es O(n²) porque el ciclo externo no crece
  con n.
- **primeraVenta: O(1).** Pendiente de medir; debe mantenerse constante al crecer n.
