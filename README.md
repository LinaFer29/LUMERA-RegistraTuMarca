# LÚMERA — Misión: Registra tu marca

Experiencia web educativa e interactiva sobre propiedad intelectual y marcas, desarrollada para la asignatura Legislación Multimedia. El usuario acompaña a la marca colombiana de velas y productos de ambientación LÚMERA a través de decisiones sobre distintividad, clasificación, antecedentes, riesgo de confusión, procedimiento y mantenimiento.

## Proyecto

- React + Vite + TypeScript
- CSS moderno, responsive y sin framework visual
- Sitio estático, sin backend, autenticación, base de datos ni APIs obligatorias
- Progreso local mediante `localStorage`
- Contenido educativo separado de la lógica de React en archivos JSON

## Instalación

Requiere Node.js 18 o superior.

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal.

## Build de producción

```bash
npm run build
npm run preview
```

El build se genera en `dist/` y puede servirse como sitio estático.

## Cómo editar contenido

El contenido principal está en `src/data/game.json`. Los componentes solo interpretan esta información, por lo que es posible cambiar la experiencia sin modificar la lógica de React.

### Cambiar preguntas y respuestas

Cada pregunta contiene:

- `id`: identificador único.
- `type`: `single`, `multiple`, `boolean` o `scenario`.
- `question`, `context` y `eyebrow`: textos visibles.
- `options`: opciones con un `id` y `text`.
- `correctAnswers`: ids correctos. En preguntas `multiple` deben aparecer todos los ids correctos.
- `hint`, `retryMessage`, `successTitle` y `explanation`: feedback pedagógico.
- `sourceIds`: referencias que se muestran en “Ver fundamento”.

Para crear una pregunta nueva, copia una pregunta existente dentro del arreglo `questions`, cambia su `id` y actualiza sus opciones y respuestas correctas.

### Agregar o modificar una misión

Cada objeto de `missions` necesita `id`, `number`, `title`, `kicker`, `description`, `icon`, `completionTitle`, `completionMessage` y `questions`. Para añadir una misión, agrega un objeto con esa estructura al arreglo. El progreso, el indicador superior y la navegación se adaptan automáticamente al número de misiones.

### Editar fuentes

Las referencias viven en `src/data/sources.json`. Cambia `name`, `organization`, `article`, `url` y `description`. El `id` de cada fuente debe coincidir con los valores usados en `sourceIds` dentro de las preguntas.

## Despliegue

### GitHub Pages

1. Ejecuta `npm run build`.
2. Publica la carpeta `dist/` con GitHub Pages usando una acción de despliegue o la configuración de Pages.
3. Si el proyecto se sirve desde una subruta, configura `base` en `vite.config.ts` con el nombre del repositorio y vuelve a compilar.

### Netlify

Conecta el repositorio y usa:

- Build command: `npm run build`
- Publish directory: `dist`

### Vercel

Importa el repositorio. Vercel detectará Vite; como alternativa usa:

- Build command: `npm run build`
- Output directory: `dist`

## Estructura principal

```text
src/
  components/       # UI reutilizable
  data/             # contenido educativo editable
  hooks/            # progreso y persistencia
  types/            # contratos TypeScript
  App.tsx           # composición y flujo de la misión
  styles.css        # identidad visual y responsive
```

## Nota académica

Recurso educativo desarrollado con fines académicos. La información presentada simplifica algunos conceptos para facilitar su comprensión y no constituye asesoría jurídica.
