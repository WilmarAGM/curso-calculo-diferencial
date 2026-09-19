# Cálculo Diferencial — Primer Parcial (App PWA)

App web (Vite + React + TypeScript) con notas de clase interactivas para el Primer Parcial de
Cálculo Diferencial (UNAL Medellín), siguiendo el programa oficial (Semanas 1–5) más un módulo
bonus de "Ingenio". Incluye teoría enriquecida, ejemplos resueltos paso a paso y ejercicios
propuestos con solución paso a paso — todos auditados contra exámenes, solucionarios y
entrenamientos reales del curso.

## Desarrollo

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm run build
npm run preview   # sirve dist/ localmente para probar
```

## Instalar en el móvil (PWA)

El Service Worker solo funciona sobre HTTP(S) (no `file://`). Para instalarla en tu celular:

1. Sube la carpeta `dist/` (tras `npm run build`) a cualquier hosting estático (GitHub Pages,
   Netlify, Vercel, Cloudflare Pages, o incluso `npx serve dist` en tu red local).
2. Abre la URL en Chrome/Safari del móvil.
3. Aparecerá el botón **"⬇ Instalar app"** en la barra superior (Android/Chrome) o usa
   "Compartir → Agregar a pantalla de inicio" (iOS/Safari).
4. Una vez instalada, funciona **sin conexión** (todo el contenido queda cacheado).

## Estructura de contenido

- `src/data/weeks/week1.ts` … `week5.ts`: teoría + ejemplos + ejercicios por semana del programa.
- `src/data/weeks/bonus.ts`: módulo de síntesis/ingenio (área acumulada, linearización log, etc.).
- `src/data/types.ts`: tipos de las estructuras de contenido.

Para agregar o editar contenido, basta con editar los arreglos `theory`, `examples` y `exercises`
de cada semana — el texto admite LaTeX inline (`$...$`) y en bloque (`$$...$$`), además de
`**negrita**` estilo Markdown.
