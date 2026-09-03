# Certificados Ley — vista previa

Prototipo interno, **no productivo**, para mostrarle a otras personas cómo se ve el detalle de
un certificado ley tal como lo devuelve `GET /api/v1/certificados/{numeroCertificado}` del
backend `sirc`. Sirve para juntar feedback y ajustar el formato antes de encarar algo definitivo.

No llama a ninguna API en vivo: busca contra ejemplos JSON guardados localmente en
`public/ejemplos/`, así no depende de red, CORS ni tokens.

## Uso

```bash
npm install
npm run dev       # desarrollo, http://localhost:5173
npm run build     # genera ./dist, listo para copiar a un servidor estático
```

Al buscar un número de certificado, la página busca `public/ejemplos/{numero}.json`. Primero
muestra un resumen (número, trámite, fechas, escribano, inmueble, cantidad de titulares) y con
"Mostrar más detalles" despliega el detalle completo (motivos, notificación interna, inmueble
completo, tablas de titulares/no titulares).

## Cómo agregar o reemplazar un ejemplo

1. Copiar la respuesta real (o armar una a mano) como `public/ejemplos/{numeroCertificado}.json`,
   respetando la forma de `CertificadoDetalleDTO` (ver `src/types.ts`, espejo de los DTOs Java).
2. Agregar una entrada en `public/ejemplos/index.json` (`{ "numero": "...", "etiqueta": "..." }`)
   para que aparezca como chip de acceso rápido debajo del buscador — no es obligatorio, un
   ejemplo sin entrada ahí igual se encuentra si se escribe el número a mano.
3. Los campos que un certificado real no tenga cargados simplemente no aparecen en el JSON
   (`@JsonInclude(NON_NULL)` en el backend) — no hace falta poner `null` explícito.

Ya hay 4 ejemplos reales cargados (`3198665`, `3255435`, `3255719`, `3255927`), tomados de
respuestas reales de la API para cubrir distintos casos: propiedad horizontal vs. común, titular
con inhibiciones, múltiples motivos, no titular y cotitularidad PF/PJ.

## Nota sobre los datos

Los ejemplos incluyen nombres, documentos y CUIT de personas reales: tratar `public/ejemplos/`
como contenido sensible al compartir el proyecto o desplegarlo (repartir el acceso solo a quien
corresponda).
