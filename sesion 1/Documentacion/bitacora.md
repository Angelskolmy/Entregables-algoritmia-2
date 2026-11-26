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

### primeraVenta (versión con Array.from + filter por índice)

**Predicción y justificación con el código:** `Array.from` copia las n ventas a
un arreglo (n visitas) y `filter` ejecuta su función una vez por cada elemento
(n visitas más). Después solo se lee la posición 0. Con la regla de conteo
(1 por iteración) son ≈ 2n operaciones, y la copia ocupa memoria proporcional a n.

| n real | operaciones esperadas (≈ 2n, por código, sin medir con contador) |
|---:|---:|
| 112 | 224 |
| 1.012 | 2.024 |
| 10.012 | 20.024 |
| 100.012 | 200.024 |

**Observación:** con 100.012 registros la función respondió en menos de 2
segundos. El tiempo percibido no determina la clasificación: Big O mide cómo
crece el número de operaciones, no cuánto tarda hoy.

### Comparación de las cuatro funciones

| Función | Operaciones | Si n × 10 | Clasificación |
|---|---|---|---|
| totalVendido | n (medido) | × 10 | O(n) |
| ventaMayor | n + k (medido) | × 10 | O(n) |
| totalPorCiudad | 4n + 4 (medido) | × 10 | O(n) |
| primeraVenta | ≈ 2n (por código) | × 10 | O(n) |

Las cuatro funciones crecen en proporción a n. En esta versión del motor no hay
una función de costo constante que sirva de contraste.

### Clasificación Big O de primeraVenta
**O(n) en tiempo y O(n) en memoria.** Justificación: dos recorridos completos
(`Array.from` y `filter`) y un arreglo intermedio de n elementos. Solo la lectura
final de la posición 0 es O(1), pero el resto de la función domina el costo.

### Desviación respecto al enunciado
El MiniReto 5 pide una función de complejidad constante para contrastar con las
lineales (por ejemplo, `primeraVenta` con acceso directo al primer elemento). Se
decidió mantener la versión actual, que devuelve la venta correcta pero es O(n).
Por eso la comparación no incluye un caso O(1). Una versión de acceso directo
(sin copiar ni filtrar la colección) sería O(1) y cubriría ese punto.

## MiniReto 6: Traza y complejidad de `ClientesDuplicados`

### Qué se cuenta

La función primero convierte las ventas a un arreglo y las agrupa por `IdCliente`
con `Object.groupBy`. Para cada cliente repetido, vuelve a recorrer todo
`MaterialBase` con `filter` para contar sus ventas. La parte costosa es esa
repetición del recorrido completo.

En la traza cuento las comparaciones explícitas de igualdad dentro del callback
de `filter` (`venta.IdCliente == Euclid.id`). No cuento las operaciones internas
de `Object.groupBy`, porque no están escritas como comparaciones en el código de
la función.

### Traza manual con 5 ventas

Entrada de ejemplo:

| Venta | `IdCliente` |
|---:|---|
| 1 | C01 |
| 2 | C02 |
| 3 | C01 |
| 4 | C03 |
| 5 | C02 |

`Object.groupBy` produce tres grupos: C01 (ventas 1 y 3), C02 (ventas 2 y 5) y
C03 (venta 4). Solo C01 y C02 cumplen `tesoro.length > 1`, así que se ejecuta un
`filter` completo para cada uno:

| Venta recorrida | Comparación con C01 | Comparación con C02 |
|---:|---|---|
| 1 (C01) | C01 == C01: sí | C01 == C02: no |
| 2 (C02) | C02 == C01: no | C02 == C02: sí |
| 3 (C01) | C01 == C01: sí | C01 == C02: no |
| 4 (C03) | C03 == C01: no | C03 == C02: no |
| 5 (C02) | C02 == C01: no | C02 == C02: sí |
| **Comparaciones del `filter`** | **5** | **5** |

Resultado: el filtro compara 5 ventas para C01 y otras 5 para C02: **10
comparaciones de `IdCliente`**. Además, el ciclo de grupos evalúa tres veces
`tesoro.length > 1` (una por cada grupo). Si se cuentan también esas pruebas, son
13 comparaciones explícitas en este ejemplo, sin contar trabajo interno de
`Object.groupBy`.

### Generalización

Sea `n` el número de ventas, `g` el número de clientes distintos y `d` el número
de clientes con más de una venta. El `filter` examina las `n` ventas una vez por
cada cliente repetido, por lo que realiza `n × d` comparaciones de IDs. Sumando
la condición `tesoro.length > 1`, hay además `g` pruebas:

```text
comparaciones explícitas = n × d + g
```

En el peor caso, `d` crece proporcionalmente a `n` (por ejemplo, muchos clientes
con dos ventas cada uno). Entonces el término dominante es cuadrático:
**O(n²)**. Si no hay clientes repetidos, `d = 0` y no se ejecutan los filtros
internos; el trabajo restante es lineal.

### Costo oculto de `recurrentes.includes`

`Array.includes` no consulta una tabla de acceso constante: busca el elemento
recorriendo el arreglo y, si no lo encuentra, puede revisar todos sus elementos.
Una llamada sobre un arreglo de longitud `r` cuesta hasta O(r).

Si `recurrentes.includes(...)` se ejecuta dentro de un ciclo de `n` ventas y el
arreglo `recurrentes` puede crecer hasta tener O(n) elementos, el costo acumulado
en el peor caso es O(n²). Por ejemplo, si en cada vuelta se busca un valor que no
está en el arreglo y su longitud aumenta, el total de elementos examinados puede
ser `0 + 1 + 2 + ... + (n - 1)`, que equivale a `n(n - 1) / 2`. Si `includes`
se llama una sola vez, o si el arreglo tiene un tamaño máximo constante, este
costo no produce por sí solo un ciclo cuadrático.

**Nota sobre el código revisado:** la versión actual de `ClientesDuplicados` en
`Analitica.js` no contiene `recurrentes.includes`; su costo cuadrático ya se
explica por los filtros repetidos de `MaterialBase`. Por tanto, el análisis de
`includes` describe el costo que tendría si esa búsqueda aparece en otra versión
o en otro ciclo; no se suma como operación observada en esta versión.

### Mediciones controladas

Se midió `ClientesDuplicados()` en Node.js 22.18.0 con exactamente `n` ventas
sintéticas en `Db_ventas`, asignando dos ventas a cada ID de cliente. Los datos se
prepararon antes de iniciar el temporizador. Se mantuvieron los
`console.time("Filter")` y `console.timeEnd("Filter")` de la función, y se
silenció `console.table` durante estas pruebas para que el renderizado de miles
de filas no dominara la medición. Cada tamaño se cargó por separado en el mismo
proceso aislado; estos datos no se guardaron en el proyecto.

| Ventas (`n`) | Tiempo medido |
|---:|---:|
| 1.000 | 9,960 ms |
| 2.000 | 22,982 ms |
| 4.000 | 79,302 ms |
| 8.000 | 244,770 ms |
| 16.000 | 678,720 ms |

Al duplicar `n`, los factores observados fueron aproximadamente ×2,31, ×3,45,
×3,09 y ×2,77. No dan exactamente ×4: los tiempos pequeños varían por
calentamiento del motor, planificación del sistema y otros costos fijos. El
conteo de operaciones explica el crecimiento cuadrático; el cronómetro es una
medición de una sola ejecución, no una prueba exacta de la complejidad.

Con el patrón de dos ventas por cliente, hay aproximadamente `d = n/2` clientes
repetidos; por tanto, el filtro realiza `n²/2` comparaciones de IDs:

| `n` | Comparaciones de ID estimadas (`n²/2`) |
|---:|---:|
| 1.000 | 500.000 |
| 2.000 | 2.000.000 |
| 4.000 | 8.000.000 |
| 8.000 | 32.000.000 |
| 16.000 | 128.000.000 |

### Estimaciones para tamaños mayores

Extrapolando desde 16.000 con crecimiento cuadrático:

```text
tiempo(100.000) ≈ 678,720 ms × (100.000 / 16.000)² ≈ 26,51 s
tiempo(1.000.000) ≈ 678,720 ms × (1.000.000 / 16.000)² ≈ 44 min 11 s
```

El archivo de consola compartido `pruebas 100000.txt` registra `Filter:
39.561s` para la prueba de 100.000. Esa medición completa, que incluye la
impresión de la tabla, es menor que el límite de dos minutos; por eso cumple el
criterio para ejecutar 100.000. No se repitió esa ejecución. Usando ese tiempo
observado como referencia, una extrapolación cuadrática a 1.000.000 es
`39,561 s × 100 ≈ 65 min 56 s`. La diferencia frente a 44 min 11 s se debe a
que la medición de consola incluye impresión y otras variaciones del entorno.
No se ejecutó 1.000.000: la estimación supera ampliamente dos minutos.

Los otros tiempos del archivo `pruebas1246816bigo.txt` no se asignan a los cinco
tamaños solicitados, porque el registro contiene reinicios y varias selecciones
de generación de datos y no deja inequívoco el tamaño exacto de cada medición.

## Comparación de `totalPorCiudad`: ciclos y métodos encadenados

Las dos versiones equivalentes son `TotalVentasXciudad()` y
`MaPTotalVentasXciudad()` de `Analitica.js`. La primera usa un recorrido con
`for` por cada ciudad y la segunda convierte `Db_ventas` a arreglo y encadena
`filter` y `reduce`.

### Prueba con 10.000 ventas

Se realizó una prueba aislada por consola en Node.js 22.18.0 sin modificar el
código del proyecto. Primero se vació `Db_ventas` y se agregaron exactamente
10.000 ventas sintéticas. Los montos fueron `1, 2, 3, ..., 10000` y las cuatro
ciudades se asignaron de forma rotatoria.

La versión con ciclos hizo:

```text
Medellín: 12.497.500
Bogotá:   12.500.000
Cali:     12.502.500
Pereira:  12.505.000
```

La versión de arreglo hizo exactamente los mismos totales. La comprobación
directa en consola devolvió `iguales: true`. Ambas también tienen el mismo
resultado esperado por sumas matemáticas:

```text
(1 + 5 + 9 + ... + 9997) = 12.497.500
(2 + 6 + 10 + ... + 9998) = 12.500.000
(3 + 7 + 11 + ... + 9999) = 12.502.500
(4 + 8 + 12 + ... + 10000) = 12.505.000
```

### Recorridos y arreglos creados

Sea `n` el número de ventas y `c = 4` el número fijo de ciudades.

| Versión | Recorridos completos de datos | Arreglos nuevos | Tiempo | Espacio auxiliar |
|---|---|---|---|---|
| `TotalVentasXciudad` | 4 recorridos de `Db_ventas` | Ninguno para las ventas | O(cn) = O(n) | O(1), además del mapa de cuatro resultados |
| `MaPTotalVentasXciudad` | 4 `Array.from`; 4 `filter`; 4 `reduce` | 4 copias de todas las ventas y hasta 4 arreglos filtrados, creados uno por ciudad | O(cn) = O(n) | O(n) durante los arreglos temporales |

En la versión de métodos, `Array.from(Db_ventas.values())` recorre el `Map` una
vez y crea un arreglo de `n` ventas. Después `filter` recorre ese arreglo y crea
otro arreglo con las ventas de una ciudad. `reduce` recorre ese arreglo filtrado
sin crear otro arreglo. Como el ciclo se repite cuatro veces, el flujo completo
hace aproximadamente ocho recorridos completos de tamaño `n` (cuatro copias más
cuatro filtros) y queda dominado por `n`.

Aunque el recorrido con ciclos hace solamente una pasada por venta por cada
ciudad y la cadena ejecuta varios recorridos, las cuatro operaciones no cambian
la clasificación: `4n + constante` se simplifica eliminando la constante y el
factor 4. Por eso las dos versiones son **O(n)** en tiempo.

En cuanto al espacio, el recorrido con ciclos mantiene variables escalares y
un resultado de tamaño constante para las cuatro ciudades: **O(1) auxiliar**.
La versión encadenada puede mantener una copia de las `n` ventas y un arreglo
filtrado de hasta `n` elementos; por tanto, su espacio auxiliar es **O(n)**.
La cantidad de ciudades también puede considerarse fija en este proyecto.

### Complejidad espacial de las funciones del motor

Se clasificó la memoria adicional que construye cada función, sin contar
`Db_ventas`, `productos` ni `Ciudades_Coverturas` como memoria creada por ella.

| Función | Clasificación espacial | Justificación |
|---|---|---|
| `GananciasTotales` | O(1) | Solo acumulador y arreglo de salida pequeño. |
| `MapGananciasTotales` | O(n) | `Array.from(Db_ventas.values())` crea un arreglo de todas las ventas. |
| `TotalItemsBendidos` | O(1) | Solo acumula una cantidad en escalar. |
| `MapTotalItemsBendidos` | O(n) | Crea un arreglo completo de ventas antes del `reduce`. |
| `MayorVenta` | O(1) | Guarda solo la mejor venta encontrada. |
| `PrecioPromedioVenta` | O(n) | Construye un `Map` y una salida con una fila por venta. |
| `TotalVentasXciudad` | O(1) auxiliar | Solo escalares y una tabla resultado con las cuatro ciudades. |
| `MaPTotalVentasXciudad` | O(n) | Guarda copias temporales y arreglos filtrados proporcionales a `n`. |
| `unidadesPorProducto` | O(n) | Los filtros construyen arreglos por producto y la salida tiene datos proporcionales a los resultados; hay cinco productos fijos. |
| `sortlog` / `sortingForreport` | O(n) | `structuredClone` y `Array.from` duplican las ventas; luego el arreglo ordenado usa memoria del tamaño de los productos. |
| `OrderFecha` | O(n) | Agrupa todas las ventas y crea arreglos y una salida plana con tamaño proporcional a `n`. |
| `PrimeraVenta` | O(n) | `Array.from` y `filter` crean o conservan datos proporcionales a `n`. |
| `ClientesDuplicados` | O(n) | Los mapas, el arreglo base y los grupos contienen referencias proporcionales al número de ventas/clientes. |
| `FuncionSinProposito` | O(n) | El `map` crea un arreglo normalizado y `filter` otro arreglo antes de reducir. |
| `totalVenta1Cicle` | O(1) auxiliar | Solo acumula dos totales y una clave, además de guardar el reporte pequeño. |
| `Alllist` | O(n) | Construye explícitamente un arreglo con todas las ventas. |

`topProductosPorValor` corresponde en este proyecto a `sortlog()` y
`sortingForreport()`: ambos hacen una copia profunda del `Map` y una copia a
arreglo de las ventas. En el peor caso necesitan `n` posiciones para la copia
del arreglo y para los grupos de trabajo, por lo que su complejidad espacial es
**O(n)**. Además, `filter` dentro del ciclo de productos puede crear hasta n
elementos por producto. Como el número de productos es constante en este motor,
ese trabajo sigue siendo lineal y no pasa a O(n²).

`totalPorCiudad` corresponde a `TotalVentasXciudad()` y
`MaPTotalVentasXciudad()`. En el proyecto hay cuatro ciudades: `c` puede tratarse
como constante, así que ambas tienen tiempo O(n). Sin embargo, difieren en
memoria: la versión con ciclos usa memoria auxiliar constante y la versión
encadenada usa memoria adicional proporcional a las ventas.

### Decisión para `totalCiudad`

La versión que se conservará como comparación legible es
`MaPTotalVentasXciudad()` y la versión de menor consumo es
`TotalVentasXciudad()`. Para este motor, se decide conservar el **uso con ciclos
como implementación principal de `totalPorCiudad`**, porque ambas producen el
mismo resultado y sus tiempos son O(n), pero la versión con ciclos evita copiar
`n` ventas varias veces y usa memoria auxiliar O(1).

La versión encadenada queda como comparación didáctica y alternativa de
legibilidad: expresa claramente conversión, filtrado y reducción, y demuestra
cómo varios recorridos constantes siguen siendo lineales. El criterio de
decisión no cambia código en esta redacción: no se realiza el cambio hasta
confirmar la ruta final del motor.

## Opción 19: tabla vacía en ventas por cliente

Se comprobó la secuencia ejecutando primero la opción 18, **Clientes
registrados**, y luego la opción 19, **Ventas por cliente**. La opción 19
imprimió correctamente estos resultados:

| Cliente | Ventas asociadas | Monto comprado |
|---|---:|---:|
| C01 | 3 | 179.000 |
| C02 | 2 | 146.000 |
| C03 | 2 | 140.000 |
| C04 | 1 | 45.000 |
| C05 | 1 | 26.000 |
| C06 | 1 | 42.000 |
| C07 | 1 | 42.000 |
| C08 | 1 | 26.000 |

La función `VentasPorCleinte()` recorre el conjunto global `ClientesDall` para
crear una fila por cada ID. La opción 18 llama a `ClientesRecurrentesWhitset()`,
que recorre `Db_ventas` y agrega los IDs al conjunto con
`ClientesDall.add(...)`. Por eso la opción 19 encuentra los clientes cuando se
ejecuta después de la opción 18.

La tabla vacía con solo encabezados ocurriría si se inicia un proceso nuevo y se
elige directamente la opción 19, sin ejecutar antes la opción 18: `ClientesDall`
empieza vacío, el ciclo no procesa IDs y el arreglo entregado a `console.table`
queda vacío. Si se reinicia el proceso de Node.js, el conjunto vuelve a su
estado inicial y la opción 18 debe ejecutarse de nuevo. La dependencia es de
orden entre las opciones, no un fallo de `console.table`. No se cambió el código
del motor.

## Comparación de `mejorSemanaBruta` y `mejorSemana`

Ambas funciones buscan el bloque de siete días consecutivos con mayor suma de
ganancias brutas (`montoVenta`). La primera vuelve a sumar los siete días desde
cero para cada posición. La segunda calcula la primera suma y, al avanzar,
resta el valor que sale de la ventana y suma el que entra.

### Traza de las tres primeras posiciones

Para ilustrar el movimiento con datos reproducibles, se usaron los primeros
nueve valores del arreglo pseudoaleatorio generado para la prueba de 100.000
días:

```text
días: [9712, 4609, 5377, 8562, 5987, 820, 7548, 37, 1014, ...]
k = 7
```

```text
Posición 1 (días 1–7): [9712, 4609, 5377, 8562, 5987, 820, 7548]
Total = 42.615

Posición 2 (días 2–8):       [4609, 5377, 8562, 5987, 820, 7548, 37]
Total = 42.615 - 9712 + 37 = 32.940
        sale 9712; entra 37

Posición 3 (días 3–9):              [5377, 8562, 5987, 820, 7548, 37, 1014]
Total = 32.940 - 4609 + 1014 = 29.345
        sale 4609; entra 1014
```

La fuerza bruta obtiene cada total recorriendo nuevamente los siete elementos.
La ventana deslizante conserva la suma anterior y solo actualiza los dos
elementos que cambian.

### Comprobación con las ventas de septiembre

Se agruparon las ventas precargadas de `Db_ventas` por fecha y se completó el
día sin registros con $0, según la decisión documentada para esta prueba:

| Fecha | Ganancia bruta del día |
|---|---:|
| 2026-09-01 | $110.000 |
| 2026-09-02 | $137.000 |
| 2026-09-03 | $187.000 |
| 2026-09-04 | $204.000 |
| 2026-09-05 | $258.000 |
| 2026-09-06 | $173.000 |
| 2026-09-07 | $0 |

El arreglo tiene exactamente siete días, así que hay una ventana posible. Las
dos versiones devolvieron el mismo inicio (posición 1, 2026-09-01) y el mismo
total: **$1.069.000**. La preparación de los totales diarios se hizo antes de
comparar los algoritmos de ventana.

### Comprobación con 100.000 días pseudoaleatorios

Se generaron 100.000 valores enteros entre 0 y 10.000 con un generador
pseudoaleatorio reproducible (semilla `0xC0FFEE`), usando `k = 7`. Ambas
versiones encontraron el mismo resultado: total máximo **64.724**, con inicio
en el índice 67.767 (día 67.768 contando desde 1). Por lo tanto, coincidieron
tanto en el total como en la posición inicial.

### Comparación de tiempos

Medición aislada en Node.js 22.18.0. Se comparó únicamente el cálculo de las
ventanas, con los mismos datos ya generados y cinco ejecuciones de calentamiento.
Se tomaron 15 muestras de 10 ejecuciones por algoritmo y se reporta la mediana
por ejecución; la generación aleatoria y la agrupación de ventas no forman parte
de estos tiempos.

| Datos | Fuerza bruta | Ventana deslizante | Relación |
|---|---:|---:|---:|
| 100.000 días, `k = 7` | 2,029 ms | 0,458 ms | Deslizante ≈ 4,43 veces más rápida |

Con `n` días y tamaño `k`, la fuerza bruta realiza O((n − k + 1) × k), que se
expresa como O(nk). La ventana deslizante suma una primera ventana y luego hace
una suma y una resta por posición: su tiempo es O(n), con O(1) espacio auxiliar
para el cálculo. Los tiempos son de una medición local y pueden variar entre
ejecuciones, pero ambas versiones produjeron el mismo resultado.

## Actualización de precios en las ventas precargadas

Se compararon los `PrecioXunidad` de los objetos precargados de `Db_ventas` con
el valor vigente de cada producto en el `Map` `productos`. Para los tres cafés,
los precios actuales del catálogo son:

| Producto | Precio vigente |
|---|---:|
| Origen Huila 500 g | $42.000 |
| Origen Nariño 250 g | $26.000 |
| Origen Sierra 500 g | $45.000 |

Se actualizaron únicamente los campos `PrecioXunidad` y `montoVenta` en los
registros cuyo precio unitario no coincidía. Para calcular el nuevo monto se
conservó la cantidad original y se aplicó:

```text
montoVenta = PrecioXunidad × Cantidad
```

| Clave de venta | Producto | Cantidad | Precio anterior → vigente | Monto anterior → recalculado |
|---:|---|---:|---:|---:|
| 1 | Origen Huila 500 g | 2 | $18.000 → $42.000 | $42.000 → $84.000 |
| 4 | Origen Huila 500 g | 1 | $18.000 → $42.000 | $42.000 → $42.000 |
| 5 | Origen Sierra 500 g | 3 | $18.000 → $45.000 | $45.000 → $135.000 |
| 6 | Origen Nariño 250 g | 2 | $13.000 → $26.000 | $26.000 → $52.000 |
| 8 | Origen Huila 500 g | 2 | $18.000 → $42.000 | $42.000 → $84.000 |
| 9 | Origen Sierra 500 g | 2 | $18.000 → $45.000 | $45.000 → $90.000 |
| 10 | Origen Huila 500 g | 4 | $18.000 → $42.000 | $42.000 → $168.000 |
| 12 | Origen Nariño 250 g | 3 | $13.000 → $26.000 | $26.000 → $78.000 |

Los registros 2, 3, 7 y 11 no requirieron cambios: sus precios unitarios ya
coincidían con el valor de su producto en el catálogo. Se conservaron las doce
ventas, sus claves, productos, cantidades y demás propiedades; no se añadieron
ni eliminaron objetos.

El cambio aumenta el total de las ventas precargadas en $416.000: $216.000
corresponden a Huila, $65.000 a Nariño y $135.000 a Sierra. Así, el total de
`montoVenta` pasa de $1.069.000 a **$1.485.000**. Este ajuste hace coherentes los
montos históricos precargados con los precios vigentes del catálogo; los totales
de reportes anteriores a la actualización reflejan los valores antiguos.

## Evidencia de reporte y rendimiento

Se revisó la transcripción de consola `Pruebas ultima.txt`. En ella se eligió
la generación automática de 10.000 ventas; como las 12 ventas precargadas no se
reemplazan, el reporte posterior procesó **10.012 ventas**. La salida contiene
una medición `Filter: 3.099s`, correspondiente al `console.time` interno de
`ClientesRecurrentesWhitset()`. No es el tiempo total de `ReportSol()`.

La transcripción muestra una primera ejecución del reporte interrumpida por
`ReferenceError: sortingForreport is not defined` y una ejecución posterior que
sí continuó. No se usó la ejecución interrumpida como medición de rendimiento.
El registro no contiene un cronómetro total del reporte, tiempos identificados
como versiones v0.1 y v1.0, ni una ejecución con 100.000 ventas. Por esa razón
no se atribuyen valores de rendimiento a esos casos. La medición disponible y
las complejidades de las funciones actuales se documentan en
`RENDIMIENTO.md`.

El requisito propone una ejecución por argumento, por ejemplo
`node src/reporte.js 100000`, pero el proyecto actual solo expone el menú
interactivo de `indexAegis.js`; no existe ese archivo o modo CLI en la
estructura revisada. Tampoco se registró una comparación reproducible entre
v0.1 y v1.0. Estas limitaciones quedan señaladas para no presentar como
completadas funciones o pruebas que no aparecen en el código ni en la
transcripción disponible.