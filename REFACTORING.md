# Refactorización: Simulación de API Real

## 📋 Resumen de Cambios

Este proyecto ha sido refactorizado para simular el comportamiento de un producto real, mejorando la experiencia UX sin necesidad de un backend real.

## 🎯 Objetivos Alcanzados

### 1. **StorageService** - Capa de Abstracción de Datos
✅ **Ubicación:** `src/services/storageService.ts`

**Características:**
- Encapsula todo acceso a `localStorage`
- Simula comportamiento asíncrono con Promises
- Delays artificiales de 500-1000ms para simular latencia de red
- Manejo de errores aleatorios (10% de probabilidad)
- Funciones disponibles:
  - `getPosts()` - Obtener todos los posts
  - `getPostById(id)` - Obtener un post específico
  - `createPost(post)` - Crear nuevo post
  - `updatePost(id, data)` - Actualizar post existente
  - `deletePost(id)` - Eliminar post
  - `toggleLikePost(id, increment)` - Dar/quitar like

### 2. **Loading States** - Estados de Carga
✅ Implementado en múltiples componentes

**SkeletonPost** (`src/components/SkeletonPost.astro`):
- Skeleton loader animado para posts
- Muestra estructura visual mientras carga
- Animación de pulse suave

**Spinner** (`src/components/Spinner.astro`):
- Componente reutilizable para indicadores de carga
- Props: `size` (sm/md/lg), `color`
- Usado en botones y acciones en progreso

### 3. **CreatePostModal** - Modal con Loading State
✅ **Refactorizado:** `src/components/CreatePostModal.astro`

**Mejoras:**
- Botón muestra spinner mientras publica
- Se deshabilita durante el envío
- Manejo de errores con feedback al usuario
- Usa `storageService.createPost()` con delay simulado
- UI optimista: el post aparece inmediatamente

### 4. **Feed Principal** - Carga Dinámica
✅ **Refactorizado:** `src/pages/index.astro`

**Flujo de Carga:**
1. Se muestran 3 skeleton loaders inicialmente
2. Se cargan posts desde `storageService` (500-1000ms delay)
3. Skeletons se ocultan cuando terminan de cargar
4. Si hay error, se muestra mensaje con botón para recargar

### 5. **Client Initialization** - Hydration del Cliente
✅ **Nuevo archivo:** `src/lib/clientInit.ts`

**Funcionalidades:**
- Inicializa localStorage con datos por defecto
- Carga y renderiza posts dinámicamente
- Maneja event listeners (likes, etc.)
- Renderizado de posts en HTML
- Integración con `storageService`

## 🏗️ Arquitectura

```
src/
├── services/
│   └── storageService.ts          # Capa de abstracción de datos
├── components/
│   ├── SkeletonPost.astro         # Skeleton loader para posts
│   ├── Spinner.astro              # Indicador de carga reutilizable
│   └── CreatePostModal.astro       # Modal con loading states
├── lib/
│   └── clientInit.ts              # Inicialización y hydration del cliente
└── pages/
    └── index.astro                # Feed principal con skeleton loaders
```

## 🎨 Experiencia de Usuario

### Crear Post
1. Usuario abre modal y escribe post
2. Click en "Post" → botón muestra spinner
3. Delay de 500-1000ms (simula envío a servidor)
4. Post aparece inmediatamente en el feed (UI optimista)
5. Si hay error (10% probabilidad), se muestra alerta

### Cargar Feed
1. Página muestra 3 skeleton loaders
2. Carga posts desde localStorage (500-1000ms delay)
3. Skeletons desaparecen cuando carga termina
4. Posts se muestran con animación fade-in

### Dar Like
1. Click en botón like → cambio instantáneo (UI optimista)
2. Llamada a `storageService.toggleLikePost()` en background
3. Si falla (10% probabilidad), se revierte el cambio

## 🔧 Características Técnicas

### Delays Simulados
```typescript
const MIN_DELAY = 500;  // 500ms
const MAX_DELAY = 1000; // 1000ms
```

### Simulación de Errores
```typescript
const ERROR_PROBABILITY = 0.1; // 10% de probabilidad
```

### UI Optimista
- Los cambios se muestran inmediatamente
- Si la operación falla, se revierten los cambios
- Mejor percepción de velocidad

## 📦 Sin Dependencias Externas

✅ Todo implementado con:
- TypeScript nativo
- Astro components
- CSS puro (Tailwind)
- localStorage API
- Promises nativas

## 🚀 Cómo Usar

### Desarrollo
```bash
npm run dev
# o
pnpm dev
```

### Producción
```bash
npm run build
npm run preview
```

## 🎯 Beneficios

1. **Experiencia realista:** Simula completamente una API real
2. **Mejor UX:** Loading states claros en toda la aplicación
3. **Código limpio:** Separación de responsabilidades
4. **Modular:** Componentes reutilizables
5. **Escalable:** Fácil migrar a API real en el futuro

## 🔄 Migración a API Real

Cuando estés listo para usar un backend real, solo necesitas:

1. Reemplazar `storageService.ts` con llamadas `fetch()` reales
2. Mantener las mismas interfaces/tipos
3. Los componentes UI no necesitan cambios
4. El loading state ya está implementado

```typescript
// Ejemplo de migración
export async function getPosts(): Promise<Post[]> {
  const response = await fetch('/api/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}
```

## 📝 Notas

- Los datos persisten en localStorage entre recargas
- Primera visita: se cargan datos por defecto desde `data.ts`
- Errores simulados ayudan a probar el manejo de errores
- UI optimista mejora la percepción de velocidad

---

**¿Preguntas o mejoras?** Abre un issue o PR 🚀
