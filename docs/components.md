# LinkedIn-lite: Documentación Completa de Archivos

Este documento proporciona un análisis exhaustivo de cada archivo importante del proyecto LinkedIn-lite, incluyendo su propósito, funciones principales y dependencias.

## Tabla de Contenidos

1. [Configuración del Proyecto](#configuración-del-proyecto)
2. [Tipos TypeScript](#tipos-typescript)
3. [Layouts](#layouts)
4. [Estilos Globales](#estilos-globales)
5. [Componentes Astro](#componentes-astro)
6. [Páginas](#páginas)
7. [Librería JavaScript](#librería-javascript)
8. [Servicios](#servicios)
9. [Datos Mock](#datos-mock)

---

## Configuración del Proyecto

### `package.json`

**Ruta:** `/package.json`

**Propósito:**
Archivo de configuración del proyecto NPM que define metadatos, dependencias y scripts.

**Dependencias Principales:**
```json
{
  "astro": "^5.16.9",              // Framework principal
  "@astrojs/vercel": "^9.0.3",     // Adapter para Vercel
  "tailwindcss": "^4.1.18",        // Framework CSS
  "@tailwindcss/vite": "^4.1.18"   // Plugin Vite para Tailwind
}
```

**Dependencias de Desarrollo:**
```json
{
  "@astrojs/check": "^0.9.6",      // Type checking
  "typescript": "^5.9.3"           // Lenguaje tipado
}
```

**Scripts Disponibles:**
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build
- `npm run astro` - CLI de Astro

**Notas:**
- Usa `pnpm@10.0.0` como package manager
- Configurado como módulo ES6 (`"type": "module"`)

---

### `astro.config.mjs`

**Ruta:** `/astro.config.mjs`

**Propósito:**
Configuración principal de Astro que define el comportamiento del framework, plugins y adapters.

**Configuración:**

```javascript
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],        // TailwindCSS vía Vite
    assetsInclude: ['**/*.json']     // Permite importar JSON
  },
  adapter: vercel()                  // Deploy a Vercel
})
```

**Dependencias:**
- `astro/config` - Core de configuración
- `@tailwindcss/vite` - Plugin de TailwindCSS
- `@astrojs/vercel` - Adapter de Vercel

**Características Configuradas:**
1. **TailwindCSS:** Integrado vía Vite plugin
2. **JSON Assets:** Habilitado para importar archivos JSON
3. **Vercel Adapter:** Configurado para deployment serverless

---

### `tsconfig.json`

**Ruta:** `/tsconfig.json`

**Propósito:**
Configuración de TypeScript que define reglas de compilación y resolución de módulos.

**Configuración:**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "resolveJsonModule": true,
    "paths": {"@/*": ["./src/*"]}
  }
}
```

**Características:**
1. **Modo Strict:** Extiende la configuración strict de Astro
2. **JSON Modules:** Permite importar archivos JSON como módulos
3. **Path Aliases:** `@/*` apunta a `./src/*` para imports absolutos
4. **Exclusiones:** Ignora carpeta `dist`

---

### `.gitignore`

**Ruta:** `/.gitignore`

**Propósito:**
Define qué archivos y carpetas Git debe ignorar.

**Principales Exclusiones:**
- `node_modules/` - Dependencias NPM
- `dist/` - Build de producción
- `.astro/` - Cache de Astro
- `.vercel/` - Configuración de Vercel
- `.env*` - Variables de entorno

---

## Tipos TypeScript

### `src/types/index.ts`

**Ruta:** `/src/types/index.ts`

**Propósito:**
Definiciones de tipos TypeScript que modelan el dominio completo de la aplicación. Estos tipos espejo lo que un backend real retornaría.

**Interfaces Principales:**

#### User
```typescript
interface User {
  id: string;
  name: string;
  title: string;
  avatar: string;
  connections: number;
  isCurrentUser?: boolean;
  location?: string;
  about?: string;
  experience?: Experience[];
  skills?: string[];
  isOnline?: boolean;
  lastSeen?: string;
  email?: string;
}
```

#### Post
```typescript
interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  createdAt: number;
  likes: number;
  comments: number;
  image?: string | null;
  sharedPostId?: string;
  reactions: {
    like: number;
    clap: number;
    interesting: number;
  };
  userReaction: "like" | "clap" | "interesting" | null;
}
```

#### Job
```typescript
interface Job {
  id: string;
  title: string;
  company: Company;
  location: JobLocation;
  type: JobType;
  experienceLevel: ExperienceLevel;
  salary?: { min: number; max: number; currency: string };
  description: string;
  responsibilities: string[];
  requirements: string[];
  postedDate: string;
  applicants: number;
  isActivelyHiring?: boolean;
  tags?: string[];
}
```

#### Message & Conversation
```typescript
interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: string;
}
```

#### Notification
```typescript
type NotificationType =
  | 'profile_view'
  | 'post_like'
  | 'post_comment'
  | 'mention'
  | 'job_alert'
  | 'work_anniversary'
  | 'connection_request';

interface Notification {
  id: string;
  type: NotificationType;
  userId?: string;
  user?: User;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  postTitle?: string;
  jobTitle?: string;
  companyName?: string;
}
```

**Tipos Compuestos:**
- `PostWithAuthor` - Post + autor enriched
- `CommentWithAuthor` - Comment + autor enriched
- `ConversationWithUser` - Conversation + otro usuario
- `ConnectionSuggestion` - Usuario sugerido simplificado
- `SavedJob`, `SavedPost` - Items guardados
- `PremiumFeature` - Feature premium

**Tipos Auxiliares:**
- `ApiResponse<T>` - Wrapper de respuesta API
- `PaginatedResponse<T>` - Respuesta paginada
- `Company`, `JobLocation`, `Experience` - Tipos nested
- `JobType`, `ExperienceLevel` - Union types

**Dependencias:** Ninguna (tipos base)

**Notas:**
- Todos los tipos son exportados para uso global
- Diseñados para fácil integración con backend real
- Incluyen campos opcionales para flexibilidad

---

### `src/env.d.ts`

**Ruta:** `/src/env.d.ts`

**Propósito:**
Declaraciones TypeScript para módulos especiales y referencias de tipos de Astro.

**Contenido:**
```typescript
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "*.json" {
  const value: any;
  export default value;
}
```

**Funcionalidad:**
- Permite importar archivos JSON en TypeScript
- Referencia tipos generados por Astro

---

## Layouts

### `src/layouts/Layout.astro`

**Ruta:** `/src/layouts/Layout.astro`

**Propósito:**
Layout base minimalista que envuelve todas las páginas. Proporciona estructura HTML básica y carga estilos globales.

**Estructura HTML:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>LinkedIn Lite</title>
  </head>
  <body class="bg-gray-50">
    <slot />
  </body>
</html>
```

**Dependencias:**
- `../styles/global.css` - Estilos globales

**Características:**
- **Slot único:** Las páginas se insertan en `<slot />`
- **Meta tags básicos:** Charset, viewport, generator
- **Favicon SVG:** Icono en formato SVG
- **Clase body:** `bg-gray-50` para fondo gris claro

**Notas:**
- Layout muy simple por diseño
- Navbar se incluye en cada página individual
- No hay scripts globales en layout

---

## Estilos Globales

### `src/styles/global.css`

**Ruta:** `/src/styles/global.css`

**Propósito:**
Sistema de diseño completo con variables CSS, temas dark/light, y animaciones globales.

**Secciones:**

#### 1. Import de TailwindCSS
```css
@import "tailwindcss";
```

#### 2. Variables de Tema (Light Mode)
```css
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f3f2ef;
  --bg-tertiary: #f8f9fa;
  --text-primary: rgba(0, 0, 0, 0.9);
  --text-secondary: rgba(0, 0, 0, 0.6);
  --text-tertiary: rgba(0, 0, 0, 0.4);
  --border-light: #e8e6e3;
  --border-medium: #d3d1ce;
  --card-bg: #ffffff;
  --card-border: #e5e7eb;
}
```

#### 3. Variables de Tema Dark
```css
.dark {
  --bg-primary: #000000;
  --bg-secondary: #1a1a1a;
  --bg-tertiary: #2d2d2d;
  --text-primary: rgba(255, 255, 255, 0.9);
  --text-secondary: rgba(255, 255, 255, 0.6);
  --text-tertiary: rgba(255, 255, 255, 0.4);
  --border-light: #2d2d2d;
  --border-medium: #3d3d3d;
  --card-bg: #1a1a1a;
  --card-border: #2d2d2d;
}
```

#### 4. Colores LinkedIn
```css
@theme {
  --color-linkedin-blue: #0a66c2;
  --color-linkedin-blue-hover: #004182;
  --color-linkedin-blue-light: #378fe9;
  
  /* Neutral Colors (9 tonos) */
  --color-neutral-50 a --color-neutral-900
  
  /* Semantic Colors */
  --color-success: #057642;
  --color-error: #cc1016;
  --color-warning: #f5c75d;
}
```

#### 5. Transiciones Globales
```css
* {
  transition: background-color 200ms ease-in-out,
              color 200ms ease-in-out,
              border-color 200ms ease-in-out;
}
```

#### 6. Animación de Reacción
```css
@keyframes reaction-bounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.reaction-animate {
  animation: reaction-bounce 200ms ease-in-out;
}
```

#### 7. Transiciones del Feed
```css
#posts-container {
  transition: opacity 300ms ease-in-out;
}

.post-item {
  transition: all 300ms ease-in-out;
}
```

#### 8. Efectos de Botones de Reacción
```css
.reaction-btn {
  transition: all 150ms ease-in-out;
}

.reaction-btn:hover {
  transform: translateY(-1px);
}

.reaction-btn:active {
  transform: translateY(0);
}
```

**Dependencias:** TailwindCSS

**Características:**
- Sistema completo de design tokens
- Dark mode con variables CSS
- Animaciones suaves y consistentes
- Colores semánticos
- Transiciones globales automáticas

---

## Componentes Astro

### Navegación

#### `src/components/Navbar.astro`

**Propósito:** Barra de navegación principal sticky con búsqueda, links a secciones principales, toggle de tema y menú de settings.

**Props:** Ninguna

**Funciones Principales:**
- Búsqueda global (form submit a `/search`)
- Navegación entre secciones
- Toggle de tema (integra `ThemeToggle`)
- Dropdown de configuración

**Scripts Client-side:**
```javascript
// Toggle dropdown de settings
settingsBtn?.addEventListener("click", (e) => {
    settingsDropdown?.classList.toggle("hidden");
});

// Cerrar al hacer click fuera
document.addEventListener("click", () => {
    settingsDropdown?.classList.add("hidden");
});
```

**Dependencias:**
- `./ThemeToggle.astro`

**Estado:**
- Dropdown abierto/cerrado (CSS classes)

**Características:**
- Sticky positioning (`sticky top-0 z-50`)
- Dark mode completo
- Indicador de notificaciones (punto rojo)
- Responsive (algunos links ocultos en mobile)

---

#### `src/components/ThemeToggle.astro`

**Propósito:** Botón toggle para cambiar entre modo claro y oscuro con persistencia en localStorage.

**Props:** Ninguna

**Funciones Principales:**
```javascript
toggleTheme()  // Alterna entre light/dark
initTheme()    // Inicializa tema al cargar
```

**Scripts Client-side:**
```javascript
import { toggleTheme, initTheme } from '../lib/theme/theme.js';

initTheme();

themeToggle?.addEventListener('click', () => {
    toggleTheme();
});
```

**Dependencias:**
- `../lib/theme/theme.js`

**Estado:**
- Tema actual (light/dark) en localStorage: `linkedin-lite-theme`
- Clase `dark` en `documentElement`

**Características:**
- Iconos dinámicos (sol/luna)
- Detecta preferencia del sistema
- Persiste elección del usuario

---

### Feed y Posts

#### `src/components/Post.astro`

**Propósito:** Componente completo de post con sistema de reacciones, comentarios, menú de opciones y soporte para posts compartidos.

**Props:**
```typescript
interface Props {
    post?: Post;
    author?: User;
    postWithAuthor?: PostWithAuthor;
}
```

**Funciones Principales:**
- Renderizar post con todos sus elementos
- Sistema de reacciones (like, clap, interesting)
- Mostrar comentarios
- Menú dropdown con opciones
- Soporte para posts compartidos (reshares)

**Scripts Client-side:**
```javascript
// Like button toggle
likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Toggle color y contador
        button.classList.toggle('text-blue-600');
        const likesCount = parseInt(button.dataset.likes) + 1;
        // Cambiar icono fill
    });
});

// Post menu dropdown
postMenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Cerrar otros dropdowns
        // Toggle dropdown del post
    });
});
```

**Dependencias:**
- `./Comments.astro`
- `../lib/api` → `getCommentsByPost()`

**Estado:**
- Likes count (data attribute)
- Dropdown abierto/cerrado
- Estado liked/unliked

**Características:**
- Card completa con header, contenido, imagen
- Sistema de 3 reacciones
- Contador de engagement
- Posts anidados (shares)
- Menu con opciones: Save, Copy link, Report

---

#### `src/components/CreatePostModal.astro`

**Propósito:** Modal completo para crear posts con soporte para texto e imágenes, validación y creación optimista.

**Props:**
```typescript
interface Props {
    currentUser: User;
}
```

**Funciones Principales:**
```javascript
createPostElement(post)  // Genera HTML del post
submitPost()             // Crea post y actualiza UI
handleImageUpload()      // Maneja selección de imagen
validateContent()        // Habilita/deshabilita submit
```

**Scripts Client-side:**
```javascript
// Abrir/cerrar modal
openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    textarea.focus();
});

// Manejo de imagen con FileReader
fileInput.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
    };
    reader.readAsDataURL(file);
});

// Validación en tiempo real
textarea.addEventListener('input', () => {
    const hasContent = textarea.value.trim() || hasImage;
    submitBtn.disabled = !hasContent;
});

// Atajo Ctrl/Cmd+Enter
textarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        submitBtn.click();
    }
});

// Submit con UI optimista
form.addEventListener('submit', async (e) => {
    const newPost = await createPost(postData);
    postsContainer.prepend(createPostElement(newPost));
    closeModal();
});
```

**Dependencias:**
- `../services/storageService` → `createPost()`, `initializeStorageWithData()`
- `../lib/clientInit` → `attachLikeHandlers()`
- `../lib/data` → `posts`

**Estado:**
- Formulario (textarea, imagen)
- Validation state
- Loading state (spinner)
- Modal abierto/cerrado

**Características:**
- Preview de imagen con opción de eliminar
- Validación: contenido O imagen requerido
- Atajo de teclado
- Creación optimista (UI se actualiza inmediatamente)
- Estados de carga con spinner
- Animación fadeIn para posts nuevos

---

#### `src/components/Comments.astro`

**Propósito:** Renderiza la sección de comentarios de un post con truncado inteligente.

**Props:**
```typescript
interface Props {
    comments: CommentWithAuthor[];
    postId: string;
    showAll?: boolean;
}
```

**Funciones Principales:**
- Mostrar hasta 3 comentarios por defecto
- Link "View all X comments" para ver todos
- Renderizar cada comentario con autor

**Dependencias:**
- `../types/index.js` → `CommentWithAuthor`

**Características:**
- Muestra avatar, nombre, título del autor
- Trunca comentarios largos (`.line-clamp-2`)
- Botones Like y Reply (sin funcionalidad aún)
- Link a página de detalle del post

---

#### `src/components/SkeletonPost.astro`

**Propósito:** Componente loader skeleton que simula la estructura de un post real durante la carga.

**Props:** Ninguna

**Funciones Principales:**
- Mostrar placeholders animados

**Características:**
- Animación CSS pulse
- Placeholders para avatar, texto, imagen, stats
- Variación de anchos para realismo
- Sin JavaScript (CSS puro)

---

#### `src/components/SearchResults.astro`

**Propósito:** Contenedor de resultados de búsqueda con contador y estado vacío.

**Props:**
```typescript
interface Props {
    searchQuery: string;
    posts: PostWithAuthor[];
}
```

**Funciones Principales:**
- Mostrar contador de resultados
- Renderizar lista de posts
- Mostrar estado vacío si no hay resultados

**Dependencias:**
- `./Post.astro`

**Características:**
- Header con contador y link "Volver al Feed"
- Estado vacío con icono y mensaje
- Posts individuales renderizados con componente Post

---

### Perfil

#### `src/components/ProfileCard.astro`

**Propósito:** Tarjeta de perfil completa con soporte dark mode que renderiza dinámicamente bio, skills y experiencias.

**Props:**
```typescript
interface Props {
    user: User;
}
```

**Funciones Principales:**
```javascript
initializeProfile(defaultProfile)  // Inicializa localStorage
renderBio(container)               // Renderiza biografía
renderSkills(container)            // Renderiza habilidades
```

**Scripts Client-side:**
```javascript
const currentUser = users.find(u => u.isCurrentUser);

const defaultProfile = {
    bio: currentUser.about || 'Passionate about...',
    skills: currentUser.skills || ['JavaScript', ...],
    experience: currentUser.experience || []
};

initializeProfile(defaultProfile);

if (bioContainer) renderBio(bioContainer);
if (skillsContainer) renderSkills(skillsContainer);
```

**Dependencias:**
- `../lib/profile/storageService.js` → `initializeProfile()`
- `../lib/profile/profile.js` → `renderBio()`, `renderSkills()`
- `../lib/data` → `users`

**Estado:**
- Perfil en localStorage: `linkedin-lite-profile`
- Modo edición por sección

**Características:**
- Header gradiente con avatar posicionado
- Estadísticas de perfil (conexiones, vistas)
- Secciones dinámicas editables
- Dark mode completo

---

#### `src/components/ProfileSidebar.astro`

**Propósito:** Sidebar izquierdo compacto del feed con resumen de perfil, estadísticas y CTAs.

**Props:**
```typescript
interface Props {
    user: User;
}
```

**Funciones Principales:**
- Mostrar resumen del perfil
- Stats rápidas
- CTA premium
- Link a items guardados

**Dependencias:**
- `../types/index.js` → `User`

**Características:**
- Header gradiente con avatar
- Stats clickeables con hover
- Icono de estrella para premium
- Compact design para sidebar

---

#### `src/components/ExperienceCard.astro`

**Propósito:** Contenedor wrapper que renderiza dinámicamente experiencias profesionales.

**Props:** Ninguna

**Scripts Client-side:**
```javascript
const experienceContainer = document.getElementById('experience-container');
if (experienceContainer) {
    renderExperience(experienceContainer);
}
```

**Dependencias:**
- `../lib/profile/profile.js` → `renderExperience()`

**Características:**
- Card container básico
- Dark mode support
- Renderizado completamente dinámico

---

#### `src/components/ExperienceItem.astro`

**Propósito:** Muestra un elemento individual de experiencia profesional.

**Props:**
```typescript
interface Props {
    experience: Experience;
}
```

**Funciones Principales:**
- Renderizar logo, título, empresa, fechas, ubicación

**Dependencias:**
- `../types/index.js` → `Experience`

**Características:**
- Layout flex con logo y detalles
- Jerarquía visual clara
- Componente puramente presentacional

---

#### `src/components/SkillBadge.astro`

**Propósito:** Badge minimalista para mostrar una habilidad individual.

**Props:**
```typescript
interface Props {
    skill: string;
}
```

**Características:**
- Pill shape (`rounded-full`)
- Neutral colors
- Typography consistente
- Hover state

---

### Networking

#### `src/components/ConnectionCard.astro`

**Propósito:** Tarjeta de conexión sugerida con header colorido personalizable y botón Connect.

**Props:**
```typescript
interface Props {
    user: User;
    colorClass?: string; // Default: "bg-blue-500"
}
```

**Funciones Principales:**
- Mostrar usuario sugerido
- Botón Connect → Pending

**Scripts Client-side:**
```javascript
document.addEventListener("click", (e) => {
    const button = target.closest("[data-action='connect']");
    if (!button) return;
    
    button.textContent = "Pending";
    button.disabled = true;
    // Cambiar estilos
});
```

**Dependencias:**
- `../types/index` → `User`

**Características:**
- Header colorido dinámico
- Avatar posicionado sobre header
- Botón redondeado estilo LinkedIn
- Event delegation con data attributes

---

#### `src/components/InvitationCard.astro`

**Propósito:** Muestra invitación de conexión con botones Accept/Ignore.

**Props:**
```typescript
interface Props {
    invitation: Invitation;
}
```

**Funciones Principales:**
- Mostrar invitación con contexto
- Aceptar/Ignorar invitación

**Scripts Client-side:**
```javascript
document.addEventListener("click", (e) => {
    const button = target.closest("[data-action]");
    if (!button) return;
    
    const action = button.dataset.action; // "accept" o "ignore"
    card?.remove(); // Eliminar del DOM
});
```

**Dependencias:**
- `../types/index` → `Invitation`

**Características:**
- Muestra conexiones mutuas
- Grupos compartidos
- Botones diferenciados (Accept azul, Ignore gris)
- Eliminación inmediata del DOM

---

#### `src/components/RightSidebar.astro`

**Propósito:** Sidebar derecho con sugerencias de conexiones y footer con links legales.

**Props:**
```typescript
interface Props {
    suggestions: ConnectionSuggestion[];
}
```

**Funciones Principales:**
- Mostrar sugerencias "People you may know"
- Botones Connect con estado

**Scripts Client-side:**
```javascript
connectButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (btn.textContent?.trim() === "Connect") {
            btn.textContent = "Pending";
            btn.disabled = true;
            // Cambiar estilos a gris
        }
    });
});
```

**Dependencias:**
- `../types/index.js` → `ConnectionSuggestion`

**Características:**
- Lista de sugerencias con dividers
- Footer con links legales
- Copyright notice
- Botones de ancho completo

---

### Mensajería

#### `src/components/ConversationItem.astro`

**Propósito:** Elemento individual en lista de conversaciones con preview del último mensaje.

**Props:**
```typescript
interface Props {
    conversation: ConversationWithUser;
}
```

**Funciones Principales:**
- Mostrar preview de conversación
- Indicador de online
- Contador de no leídos

**Dependencias:**
- `../types/index.js` → `ConversationWithUser`

**Características:**
- Avatar con indicador de online (punto verde)
- Último mensaje truncado
- Timestamp relativo
- Badge de no leídos (si > 0)
- Todo clickeable

---

#### `src/components/MessageBubble.astro`

**Propósito:** Renderiza burbuja de mensaje individual en chat con alineación condicional.

**Props:**
```typescript
interface Props {
    message: Message;
    isCurrentUser: boolean;
    sender?: User;
}
```

**Funciones Principales:**
- Renderizar mensaje con estilos según emisor

**Dependencias:**
- `../types/index.js` → `Message`, `User`

**Características:**
- Alineación condicional (derecha/izquierda)
- Colores diferentes (azul/gris)
- Max width 70%
- Indicador de lectura (checkmark)
- Whitespace preservado

---

### Trabajos

#### `src/components/JobCard.astro`

**Propósito:** Tarjeta de oferta laboral con información completa y badges informativos.

**Props:**
```typescript
interface Props {
    job: Job;
}
```

**Funciones Principales:**
- Mostrar detalle completo del trabajo
- Formatear salario (100K - 150K)
- Badges según tipo

**Dependencias:**
- `../types/index` → `Job`

**Características:**
- Logo de empresa (dicebear)
- Badges personalizados por tipo
- Botón de guardar
- Toda la card clickeable
- Hover con shadow

---

#### `src/components/SavedJobItem.astro`

**Propósito:** Muestra trabajo guardado con botón de eliminar con animación.

**Props:**
```typescript
interface Props {
    savedJob: SavedJob;
}
```

**Funciones Principales:**
- Mostrar job guardado
- Eliminar con animación

**Scripts Client-side:**
```javascript
deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const article = e.currentTarget.closest(".saved-job-item");
        
        // Animación de salida
        article.style.transition = "opacity 0.3s, transform 0.3s";
        article.style.opacity = "0";
        article.style.transform = "translateX(20px)";
        
        // Eliminar del DOM
        setTimeout(() => article.remove(), 300);
    });
});
```

**Dependencias:**
- `../types/index.js` → `SavedJob`
- Dicebear API para logos

**Características:**
- Fecha de guardado
- Badge "Actively hiring"
- Animación fade out + slide
- Botón de eliminar con hover rojo

---

### Notificaciones

#### `src/components/NotificationItem.astro`

**Propósito:** Muestra notificación individual con diferentes layouts según tipo y marca como leída al hacer click.

**Props:**
```typescript
interface Props {
    notification: Notification;
}
```

**Funciones Principales:**
- Renderizar notificación según tipo
- Marcar como leída

**Scripts Client-side:**
```javascript
document.addEventListener("click", (e) => {
    const notificationCard = target.closest("[data-notification-id]");
    if (!notificationCard) return;
    
    const isRead = notificationCard.dataset.isRead === "true";
    
    if (!isRead) {
        // Cambiar estilos a "leído"
        notificationCard.classList.remove("bg-blue-50", "border-blue-600");
        notificationCard.classList.add("bg-white", "border-transparent");
        
        // Eliminar punto indicador
        unreadDot?.remove();
    }
});
```

**Dependencias:**
- `../types/index` → `Notification`

**Estado:**
- Read/unread (data attribute y CSS classes)

**Características:**
- Tipos: profile_view, post_like, job_alert, etc.
- Avatar o icono según tipo
- Indicador de no leído (punto azul + border)
- Botón de acción opcional
- Click para marcar como leído

---

### Utilidades

#### `src/components/Spinner.astro`

**Propósito:** Componente reutilizable de spinner animado configurable.

**Props:**
```typescript
interface Props {
    size?: "sm" | "md" | "lg";
    color?: string;
}
```

**Funciones Principales:**
- Mostrar indicador de carga

**Características:**
- 3 tamaños (sm, md, lg)
- Color configurable
- Animación CSS pura (spin)
- Accessibility (role, aria-label)

---

#### `src/components/Welcome.astro`

**Propósito:** Página de bienvenida por defecto de Astro (legacy, no usado en producción).

**Props:** Ninguna

**Dependencias:**
- `../assets/astro.svg`
- `../assets/background.svg`

**Notas:** Componente de ejemplo de Astro, probablemente no usado en la app real.

---

## Páginas

### Página Principal

#### `src/pages/index.astro`

**Ruta:** `/`

**Propósito:** Feed principal de la aplicación que muestra el timeline de posts sin filtros.

**Funciones Principales:**
```javascript
// Server-side
const currentUser = await getCurrentUser();
const suggestions = await getUserSuggestions(3);
const users = (await import("../lib/data.js")).users;

// Client-side
window.__USERS_DATA__ = users;
loadAndRenderPosts(postsContainer, users);

// Feed sorting
feedSortSelect.addEventListener('change', (e) => {
    renderFeed(users, e.target.value);
});
```

**Dependencias:**
- Layout, Navbar, ProfileCard, ExperienceCard
- RightSidebar, CreatePostModal, SkeletonPost
- `../lib/api/index.js` → `getCurrentUser()`, `getUserSuggestions()`, `getPosts()`
- `../lib/data.js` → `users`
- `../lib/clientInit.ts` → `loadAndRenderPosts()`
- `../lib/feed/feed.js` → `renderFeed()`

**Estructura:**
```
Layout
  Navbar
  main (max-w-7xl)
    grid (3 columnas en desktop)
      - Left Sidebar (lg:col-span-3)
        - ProfileCard
        - ExperienceCard
      - Feed Central (lg:col-span-6)
        - Create Post Box
        - Sort Selector
        - Posts Container
        - Skeletons (x3)
      - Right Sidebar (lg:col-span-3)
        - RightSidebar
  CreatePostModal
```

**Estado:**
- Posts en `#posts-container`
- Ordenamiento (recent/popular)
- Variable global `window.__USERS_DATA__`

**Características:**
- SSR para datos iniciales
- Client-side rendering del feed
- Sorting dinámico
- Skeletons durante carga
- Modal de crear post
- Grid responsive (mobile: 1 col, desktop: 3 cols)

---

### Perfil

#### `src/pages/profile.astro`

**Ruta:** `/profile`

**Propósito:** Página de perfil del usuario actual con información editable.

**Funciones Principales:**
```javascript
const currentUser = await getCurrentUser();
```

**Dependencias:**
- Layout, Navbar
- ProfileCard, ExperienceCard
- `../lib/api/index.js` → `getCurrentUser()`

**Estructura:**
- Similar a index pero sin feed
- Enfoque en ProfileCard y ExperienceCard

---

### Búsqueda

#### `src/pages/search.astro`

**Ruta:** `/search?q={query}`

**Propósito:** Página de búsqueda que muestra resultados filtrados de posts.

**Funciones Principales:**
```javascript
// Server-side
const searchQuery = Astro.url.searchParams.get('q') || '';
const currentUser = await getCurrentUser();

let results: PostWithAuthor[] = [];
if (searchQuery) {
    results = await searchPosts(searchQuery);
}
```

**Dependencias:**
- Layout, Navbar, SearchResults
- `../lib/api/index.js` → `getCurrentUser()`, `searchPosts()`

**Estructura:**
```
Layout
  Navbar
  main
    SearchResults (searchQuery, posts)
```

**Características:**
- Query string parsing
- Búsqueda server-side
- Estado vacío si no hay query
- Componente SearchResults maneja renderizado

---

### Red de Contactos

#### `src/pages/network.astro`

**Ruta:** `/network`

**Propósito:** Página de gestión de red con invitaciones y sugerencias de conexiones.

**Funciones Principales:**
```javascript
const invitations = await getNetworkInvitations();
const suggestedConnections = await getSuggestedConnections(9);
```

**Dependencias:**
- Layout, Navbar
- InvitationCard, ConnectionCard
- `../lib/api/index.js` → `getNetworkInvitations()`, `getSuggestedConnections()`

**Estructura:**
```
Layout
  Navbar
  main
    - Section: Invitations
      - InvitationCard (foreach)
    - Section: People you may know
      - ConnectionCard (foreach, colorClass random)
```

**Características:**
- Grid de conexiones (2-3 columnas según viewport)
- Colores aleatorios en ConnectionCards
- Invitaciones en sección separada

---

### Notificaciones

#### `src/pages/notifications.astro`

**Ruta:** `/notifications`

**Propósito:** Página de notificaciones con filtrado por tipo.

**Funciones Principales:**
```javascript
const filterType = Astro.url.searchParams.get('filter') || 'all';
const allNotifications = await getNotifications(filterType);
```

**Dependencias:**
- Layout, Navbar, NotificationItem
- `../lib/api/index.js` → `getNotifications()`

**Estructura:**
```
Layout
  Navbar
  main
    - Header con filtros (tabs)
    - Lista de notificaciones
      - NotificationItem (foreach)
```

**Características:**
- Filtrado: all, jobs, posts, network
- Query string para filtros
- Tabs activos según filtro
- Estado vacío si no hay notificaciones

---

### Mensajería

#### `src/pages/messages/index.astro`

**Ruta:** `/messages`

**Propósito:** Inbox de mensajes con lista de conversaciones.

**Funciones Principales:**
```javascript
const conversations = await getConversations();
```

**Dependencias:**
- Layout, Navbar, ConversationItem
- `../lib/api/index.js` → `getConversations()`

**Estructura:**
```
Layout
  Navbar
  main
    - Header (Messaging)
    - Lista de conversaciones
      - ConversationItem (foreach)
```

---

#### `src/pages/messages/[id].astro`

**Ruta:** `/messages/{conversationId}`

**Propósito:** Vista de conversación individual con chat interface.

**Funciones Principales:**
```javascript
// Server-side
const { id } = Astro.params;
const conversation = await getConversationById(id);
const messages = await getMessagesByConversationId(id);
const currentUser = await getCurrentUser();

// Client-side
form.addEventListener('submit', async (e) => {
    const newMessage = await sendMessage(conversationId, messageContent);
    // Insertar mensaje en chat
});
```

**Dependencias:**
- Layout, Navbar, MessageBubble
- `../lib/api/index.js` → `getConversationById()`, `getMessagesByConversationId()`, `getCurrentUser()`, `sendMessage()`

**Estructura:**
```
Layout
  Navbar
  main (flex layout)
    - Header con info del otro usuario
    - Messages container
      - MessageBubble (foreach message)
    - Input form (sticky bottom)
```

**Características:**
- SSR para mensajes iniciales
- Client-side para enviar nuevos mensajes
- Scroll automático al último mensaje
- Indicadores de lectura
- Input sticky en la parte inferior

---

### Empleos

#### `src/pages/jobs/index.astro`

**Ruta:** `/jobs`

**Propósito:** Listado de ofertas laborales con filtros avanzados.

**Funciones Principales:**
```javascript
// Server-side con filtros desde query string
const type = Astro.url.searchParams.get('type');
const location = Astro.url.searchParams.get('location');
const level = Astro.url.searchParams.get('level');

const jobs = await getJobs({ type, location, level });
```

**Dependencias:**
- Layout, Navbar, JobCard
- `../lib/api/index.js` → `getJobs()`

**Estructura:**
```
Layout
  Navbar
  main
    - Sidebar con filtros
      - Job Type (Full-time, Part-time, etc.)
      - Location
      - Experience Level
    - Job listings
      - JobCard (foreach job)
```

**Características:**
- Filtrado multi-criterio
- Query strings para filtros
- Estado vacío si no hay resultados
- Grid responsivo

---

#### `src/pages/jobs/[id].astro`

**Ruta:** `/jobs/{jobId}`

**Propósito:** Página de detalle de una oferta laboral específica.

**Funciones Principales:**
```javascript
const { id } = Astro.params;
const job = await getJobById(id);
```

**Dependencias:**
- Layout, Navbar
- `../lib/api/index.js` → `getJobById()`

**Estructura:**
```
Layout
  Navbar
  main
    - Header (título, empresa, ubicación)
    - Card principal
      - Job details
      - Responsibilities
      - Requirements
      - Salary
    - Apply button
    - Similar jobs sidebar
```

**Características:**
- SSR para job data
- Botón "Apply" redirige a `/jobs/apply/{id}`
- 404 si job no existe

---

#### `src/pages/jobs/apply/[id].astro`

**Ruta:** `/jobs/apply/{jobId}`

**Propósito:** Formulario de aplicación a un empleo.

**Funciones Principales:**
```javascript
const { id } = Astro.params;
const job = await getJobById(id);

// Client-side
form.addEventListener('submit', async (e) => {
    // Simular aplicación
    alert('Application submitted!');
    window.location.href = '/jobs';
});
```

**Dependencias:**
- Layout, Navbar
- `../lib/api/index.js` → `getJobById()`

**Estructura:**
```
Layout
  Navbar
  main
    - Job summary card
    - Application form
      - Contact info
      - Resume upload
      - Cover letter
      - Submit button
```

**Características:**
- Formulario completo de aplicación
- Validación client-side
- Upload de archivo (simulado)
- Redirect a /jobs después de submit

---

### Posts

#### `src/pages/posts/[id].astro`

**Ruta:** `/posts/{postId}`

**Propósito:** Página de detalle de un post individual con todos los comentarios.

**Funciones Principales:**
```javascript
const { id } = Astro.params;
const postData = await getPostById(id);
const comments = await getCommentsByPost(id);
```

**Dependencias:**
- Layout, Navbar, Post, Comments
- `../lib/api/index.js` → `getPostById()`, `getCommentsByPost()`

**Estructura:**
```
Layout
  Navbar
  main
    - Post (showFull=true)
    - Comments (showAll=true)
```

**Características:**
- Post completo sin truncado
- Todos los comentarios visibles
- 404 si post no existe

---

### Usuarios

#### `src/pages/users/[id].astro`

**Ruta:** `/users/{userId}`

**Propósito:** Página de perfil de otro usuario (no el current user).

**Funciones Principales:**
```javascript
const { id } = Astro.params;
const user = await getUserById(id);
const userPosts = await getPostsByUser(id);
```

**Dependencias:**
- Layout, Navbar, ProfileCard, Post
- `../lib/api/index.js` → `getUserById()`, `getPostsByUser()`

**Estructura:**
```
Layout
  Navbar
  main
    - ProfileCard (user)
    - User's posts
      - Post (foreach)
```

**Características:**
- Perfil de solo lectura (no editable)
- Posts del usuario
- Botón "Connect" si no es conexión

---

### Items Guardados

#### `src/pages/saved.astro`

**Ruta:** `/saved`

**Propósito:** Página de items guardados con tabs para jobs y posts.

**Funciones Principales:**
```javascript
const activeTab = Astro.url.searchParams.get('tab') || 'jobs';
const savedJobs = await getSavedJobs();
const savedPosts = await getSavedPosts();
```

**Dependencias:**
- Layout, Navbar, SavedJobItem, Post
- `../lib/api/index.js` → `getSavedJobs()`, `getSavedPosts()`

**Estructura:**
```
Layout
  Navbar
  main
    - Tabs (Jobs / Posts)
    - Saved Jobs
      - SavedJobItem (foreach)
    - Saved Posts
      - Post (foreach)
```

**Características:**
- Tab switching con query string
- Jobs y posts en secciones separadas
- Eliminar items guardados
- Estado vacío por tab

---

### Premium

#### `src/pages/premium.astro`

**Ruta:** `/premium`

**Propósito:** Página de features y planes premium.

**Funciones Principales:**
```javascript
const premiumFeatures = await getPremiumFeatures();
```

**Dependencias:**
- Layout, Navbar
- `../lib/api/index.js` → `getPremiumFeatures()`

**Estructura:**
```
Layout
  Navbar
  main
    - Hero section
    - Features grid
      - Feature card (foreach)
    - CTA button
```

**Características:**
- Lista de features premium
- Iconos según tipo
- CTA "Upgrade to Premium"

---

### Configuración

#### `src/pages/settings.astro`

**Ruta:** `/settings`

**Propósito:** Página de configuración de cuenta (demo).

**Funciones Principales:**
```javascript
const currentUser = await getCurrentUser();

// Client-side
form.addEventListener('submit', (e) => {
    alert('Settings saved!');
});
```

**Dependencias:**
- Layout, Navbar
- `../lib/api/index.js` → `getCurrentUser()`

**Estructura:**
```
Layout
  Navbar
  main
    - Tabs (Account, Privacy, Notifications)
    - Settings form
      - Name, email, password
      - Privacy toggles
      - Notification preferences
      - Save button
```

**Características:**
- Formulario con valores actuales
- Tabs para diferentes categorías
- Submit simulado (no persiste)

---

### Autenticación

#### `src/pages/login.astro`

**Ruta:** `/login`

**Propósito:** Página de inicio de sesión (demo, sin autenticación real).

**Funciones Principales:**
```javascript
// Client-side
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simular login
    window.location.href = '/';
});
```

**Dependencias:**
- Layout básico (sin Navbar)

**Estructura:**
```
Layout
  main
    - Login form
      - Email input
      - Password input
      - Remember me checkbox
      - Submit button
    - Sign up link
```

**Características:**
- Formulario simple
- No hay autenticación real
- Redirect a / después de submit

---

#### `src/pages/logout.astro`

**Ruta:** `/logout`

**Propósito:** Página de logout con animación de despedida.

**Funciones Principales:**
```javascript
// Client-side
setTimeout(() => {
    window.location.href = '/login';
}, 2000);
```

**Dependencias:**
- Layout básico

**Características:**
- Mensaje de "Logging out..."
- Redirect automático a /login después de 2s
- Sin funcionalidad real de logout

---

### Páginas Estáticas

#### `src/pages/about.astro`

**Ruta:** `/about`
**Propósito:** Página "Sobre nosotros" con información del proyecto.

#### `src/pages/help.astro`

**Ruta:** `/help`
**Propósito:** Centro de ayuda con FAQs.

#### `src/pages/privacy.astro`

**Ruta:** `/privacy`
**Propósito:** Política de privacidad.

#### `src/pages/terms.astro`

**Ruta:** `/terms`
**Propósito:** Términos de servicio.

#### `src/pages/ads.astro`

**Ruta:** `/ads`
**Propósito:** Información sobre publicidad.

**Características Comunes:**
- Layout básico con Navbar
- Contenido estático informativo
- Links de navegación

---

## Librería JavaScript

### API Layer

#### `src/lib/api/index.ts`

**Ruta:** `/src/lib/api/index.ts`

**Propósito:** Mock API layer que simula un backend completo. Diseñado para fácil reemplazo con API real.

**Funciones Exportadas (17 funciones):**

**Usuarios:**
```typescript
getCurrentUser(): Promise<User | null>
getUserSuggestions(limit = 3): Promise<ConnectionSuggestion[]>
getUserById(userId: string): Promise<User | null>
```

**Posts:**
```typescript
getPosts(query?: string): Promise<PostWithAuthor[]>
getPostById(postId: string): Promise<PostWithAuthor | null>
getPostsByUser(userId: string): Promise<PostWithAuthor[]>
searchPosts(query: string): Promise<PostWithAuthor[]>
```

**Comentarios:**
```typescript
getCommentsByPost(postId: string, limit?: number): Promise<CommentWithAuthor[]>
```

**Mensajería:**
```typescript
getConversations(): Promise<ConversationWithUser[]>
getConversationById(id: string): Promise<ConversationWithUser | null>
getMessagesByConversationId(id: string): Promise<Message[]>
sendMessage(convId: string, content: string): Promise<Message>
```

**Jobs:**
```typescript
getJobs(filters?: JobFilters): Promise<Job[]>
getJobById(id: string): Promise<Job | null>
```

**Network:**
```typescript
getNetworkInvitations(): Promise<Invitation[]>
getSuggestedConnections(limit = 6): Promise<User[]>
getNetworkStats(): Promise<NetworkStats>
```

**Otros:**
```typescript
getNotifications(filter?: string): Promise<Notification[]>
getSavedJobs(): Promise<SavedJob[]>
getSavedPosts(): Promise<SavedPost[]>
getPremiumFeatures(): Promise<PremiumFeature[]>
```

**Dependencias:**
- Todos los archivos `*-data.ts`
- `../search-utils.js` → `searchPosts()`
- `@/types/index.js` → Todas las interfaces

**Estado:**
- Constante `API_LATENCY = 0` (configurable)
- Sin estado interno (funciones puras)

**Características:**
- Todas las funciones son async
- Simula latencia con delay opcional
- Data enrichment (combina posts con autores)
- Filtrado y búsqueda
- Preparado para reemplazo con fetch real

**Ejemplo de Uso:**
```typescript
// En una página .astro
const posts = await getPosts();
const currentUser = await getCurrentUser();
```

---

### Feed System

#### `src/lib/feed/feed.js`

**Ruta:** `/src/lib/feed/feed.js`

**Propósito:** Módulo central para renderizado y gestión del feed de publicaciones.

**Funciones Exportadas:**

```javascript
// Ordena posts por criterio
sortPosts(posts, sortBy = 'recent')
// @param posts: Array de objetos post
// @param sortBy: 'recent' | 'popular'
// @return Array de posts ordenados

// Genera HTML de un post individual
renderPost(post, author)
// @param post: Objeto con datos del post
// @param author: Objeto con datos del autor
// @return String HTML del post renderizado

// Renderiza todo el feed con animación
renderFeed(users, sortBy = 'recent')
// @param users: Array de usuarios
// @param sortBy: Criterio de ordenamiento
// @return void

// Adjunta event listeners a botones de reacción
attachReactionHandlers()
// @return void
```

**Dependencias:**
- `./storageService.js` → `getPosts()`
- `./reactions.js` → `getTotalReactions()`, `handleReaction()`, `animateReaction()`

**Estado:**
- Variable global: `window.__USERS_DATA__`
- DOM: Manipula `#posts-container` y `#feed-sort-select`

**Características:**
- Template literals para HTML
- Animaciones fade in/out
- Event delegation para reacciones
- Ordenamiento por recencia o popularidad

---

#### `src/lib/feed/reactions.js`

**Ruta:** `/src/lib/feed/reactions.js`

**Propósito:** Gestiona la lógica de reacciones a posts (like, clap, interesting).

**Funciones Exportadas:**

```javascript
// Maneja toggle de reacciones
handleReaction(postId, reactionType)
// @param postId: String - ID del post
// @param reactionType: 'like' | 'clap' | 'interesting'
// @return Post actualizado o null

// Suma todas las reacciones de un post
getTotalReactions(post)
// @param post: Objeto post
// @return Number - Total de reacciones

// Aplica animación CSS al emoji
animateReaction(element)
// @param element: HTMLElement - Elemento emoji
// @return void
```

**Dependencias:**
- `./storageService.js` → `getPosts()`, `updatePost()`

**Lógica de Estado:**
```javascript
// Si ya tiene esta reacción → remover
if (post.userReaction === reactionType) {
    post.userReaction = null
    post.reactions[reactionType]--
}
// Si tiene otra reacción → cambiar
else if (post.userReaction) {
    post.reactions[post.userReaction]--
    post.userReaction = reactionType
    post.reactions[reactionType]++
}
// Si no tiene reacción → agregar
else {
    post.userReaction = reactionType
    post.reactions[reactionType]++
}
```

**Características:**
- Pure functions (sin efectos secundarios excepto persistencia)
- State machine para transiciones de reacciones
- Animación bounce de 200ms

---

#### `src/lib/feed/storageService.js`

**Ruta:** `/src/lib/feed/storageService.js`

**Propósito:** Servicio de persistencia para posts en localStorage.

**Funciones Exportadas:**

```javascript
// Obtiene posts desde localStorage
getPosts()
// @return Array de posts (vacío si no hay datos)

// Guarda posts en localStorage
savePosts(posts)
// @param posts: Array de posts
// @return void

// Actualiza un post específico
updatePost(postId, updates)
// @param postId: String - ID del post
// @param updates: Object - Propiedades a actualizar
// @return Post actualizado o null

// Inicializa localStorage con datos default
initializePosts(defaultPosts)
// @param defaultPosts: Array de posts default
// @return void
```

**Estado:**
- localStorage Key: `'linkedin-lite-posts'`
- SSR Safety: Verifica `typeof window === 'undefined'`

**Estructura de Post:**
```javascript
{
    ...post,
    createdAt: Number,
    reactions: { like: 0, clap: 0, interesting: 0 },
    userReaction: null | 'like' | 'clap' | 'interesting'
}
```

**Características:**
- Repository pattern
- Default values para estructura consistente
- Defensive programming con SSR checks

---

### Profile System

#### `src/lib/profile/profile.js`

**Ruta:** `/src/lib/profile/profile.js`

**Propósito:** Gestiona UI editable del perfil de usuario (bio, skills, experiencia).

**Funciones Exportadas:**

```javascript
// Alterna modo edición para una sección
toggleEditMode(section)
// @param section: 'bio' | 'skills' | 'experience'
// @return Boolean - Nuevo estado

// Verifica si sección está en modo edición
isEditMode(section)
// @param section: String
// @return Boolean

// Renderiza sección biografía (view/edit)
renderBio(container)
// @param container: HTMLElement
// @return void

// Renderiza sección habilidades
renderSkills(container)
// @param container: HTMLElement
// @return void

// Renderiza timeline de experiencia con CRUD
renderExperience(container)
// @param container: HTMLElement
// @return void
```

**Dependencias:**
- `./storageService.js` → `getProfile()`, `updateBio()`, `updateSkills()`, `addExperience()`, `removeExperience()`

**Estado Local:**
```javascript
let editMode = {
    bio: false,
    skills: false,
    experience: false
}
```

**Flujo de Edición:**
```
1. Click "Edit" → toggleEditMode('bio')
2. renderBio() → formulario editable
3. Usuario modifica
4. Click "Save" → updateBio() → persiste
5. renderBio() → vista de solo lectura
```

**Características:**
- View/Edit mode pattern
- Event delegation
- CRUD completo para experiencia
- Dark mode support

---

#### `src/lib/profile/storageService.js`

**Ruta:** `/src/lib/profile/storageService.js`

**Propósito:** Servicio de persistencia para datos de perfil.

**Funciones Exportadas:**

```javascript
// Obtiene perfil desde localStorage
getProfile(): Object | null

// Guarda perfil completo
saveProfile(profile): void

// Actualización parcial del perfil
updateProfile(updates): Profile | null

// Inicializa perfil si no existe
initializeProfile(defaultProfile): void

// Agrega nueva experiencia con ID único
addExperience(experience): Profile | null

// Elimina experiencia por ID
removeExperience(experienceId): Profile | null

// Atajos de conveniencia
updateBio(bio): Profile
updateSkills(skills): Profile
```

**Estado:**
- localStorage Key: `'linkedin-lite-profile'`

**ID Generation:**
```javascript
const id = `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
```

**Características:**
- Repository pattern
- Facade pattern (updateBio, updateSkills)
- Factory pattern (genera IDs únicos)
- Immutability con spread operator

---

### Theme System

#### `src/lib/theme/theme.js`

**Ruta:** `/src/lib/theme/theme.js`

**Propósito:** Gestiona el sistema de temas (light/dark mode).

**Funciones Exportadas:**

```javascript
// Obtiene tema actual
getTheme(): 'light' | 'dark'

// Aplica tema y persiste
setTheme(theme: 'light' | 'dark'): void

// Alterna entre light y dark
toggleTheme(): string

// Inicializa tema al cargar
initTheme(): void
```

**Estado:**
- localStorage Key: `'linkedin-lite-theme'`
- DOM State: Clase 'dark' en `documentElement`
- System Preference: `matchMedia('(prefers-color-scheme: dark)')`

**Flujo de Determinación:**
```
1. Buscar en localStorage
2. Si no existe → detectar preferencia del sistema
3. Si no se detecta → usar 'light'
4. Aplicar clase 'dark' al html si es dark
```

**Características:**
- Singleton pattern
- Strategy pattern (fallbacks)
- Observer pattern (DOM reacciona a clase)

---

### Initialization

#### `src/lib/clientInit.ts`

**Ruta:** `/src/lib/clientInit.ts`

**Propósito:** Script de inicialización del cliente que orquesta el primer render del feed.

**Funciones Exportadas:**

```typescript
// Adjunta event listeners a botones de like
attachLikeHandlers(): void

// Inicializa storage, carga posts y renderiza
loadAndRenderPosts(container: HTMLElement, users: User[]): Promise<void>
```

**Flujo de Inicialización:**
```javascript
async function loadAndRenderPosts(container, users) {
    try {
        // 1. Inicializar localStorage
        await initializeStorageWithData({ posts })
        
        // 2. Obtener posts
        const storedPosts = await getPosts()
        
        // 3. Renderizar posts
        storedPosts.forEach(post => {
            const author = users.find(u => u.id === post.userId)
            container.innerHTML += renderPost(post, author)
        })
        
        // 4. Adjuntar listeners
        attachLikeHandlers()
    } catch (error) {
        // UI de error
    }
}
```

**Dependencias:**
- `../services/storageService` → `getPosts()`, `initializeStorageWithData()`, `toggleLikePost()`
- `../lib/data` → `posts`
- `@/types/index` → Type definitions

**Características:**
- Initialization pattern
- Optimistic UI
- Error boundary con UI de error
- Event cloning con `cloneNode()`

---

### Utilities

#### `src/lib/search-utils.ts`

**Ruta:** `/src/lib/search-utils.ts`

**Propósito:** Utilidades de búsqueda y filtrado para posts.

**Funciones Exportadas:**

```typescript
// Búsqueda básica
searchPosts(posts: PostWithAuthor[], query: string): PostWithAuthor[]

// Búsqueda avanzada
searchPostsExtended(
    posts: PostWithAuthor[],
    query: string,
    options?: SearchOptions
): PostWithAuthor[]

interface SearchOptions {
    matchType?: 'any' | 'content' | 'author' | 'title'
    sortBy?: 'relevance' | 'date' | 'engagement'
    limit?: number
}
```

**Lógica:**
```typescript
// Case insensitive
const lowerQuery = query.toLowerCase().trim()

// Busca en contenido, nombre de autor, título
return posts.filter(post => {
    return content.includes(lowerQuery) ||
           authorName.includes(lowerQuery) ||
           title.includes(lowerQuery)
})
```

**Dependencias:**
- `../types/index.js` → `PostWithAuthor`

**Características:**
- Pure functions
- Strategy pattern (diferentes ordenamientos)
- Filter chain
- Options object pattern

---

### Data Files

#### `src/lib/data.ts`

**Ruta:** `/src/lib/data.ts`

**Propósito:** Base de datos mock en memoria con datos estáticos.

**Datos Exportados:**

```typescript
// 20 usuarios
export const users: User[] = [...]
// Usuario actual: user-1 (Alex Johnson)

// 26 comentarios
export const comments: Comment[] = [...]

// 17 posts (15 normales + 2 shares)
export const posts: Post[] = [...]
```

**Estructura de Datos:**

**Usuario Actual:**
```typescript
{
    id: "user-1",
    name: "Alex Johnson",
    title: "Senior Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    connections: 532,
    isCurrentUser: true,
    about: "Passionate about building...",
    experience: [...],
    skills: ["JavaScript", "TypeScript", ...]
}
```

**Post:**
```typescript
{
    id: "post-1",
    userId: "user-2",
    content: "Just launched our new product!",
    timestamp: "2h",
    createdAt: Date.now() - 2 * 60 * 60 * 1000,
    likes: 42,
    comments: 8,
    image: "https://images.unsplash.com/...",
    reactions: { like: 35, clap: 5, interesting: 2 },
    userReaction: null
}
```

**Dependencias:**
- `../types/index.js` → Type definitions

**Características:**
- Datos estáticos en memoria
- Timestamps dinámicos con `Date.now()`
- Avatares de dicebear
- Imágenes de Unsplash

---

#### `src/lib/jobs-data.ts`

**Ruta:** `/src/lib/jobs-data.ts`

**Propósito:** Base de datos mock de trabajos (8 ofertas completas).

**Datos Exportados:**
```typescript
export const jobs: Job[] = [...]
```

**Campos por Job:**
- id, title, company (objeto completo con logo)
- location (objeto con city, state, country, isRemote)
- type, experienceLevel
- description, responsibilities[], requirements[]
- postedDate, applicants
- salary (opcional: min, max, currency)
- isActivelyHiring, tags

**Dependencias:**
- `@/types/index.js` → `Job`

**Características:**
- Datos muy detallados
- 8 empresas diferentes
- Roles variados (Designer, PM, Engineer, etc.)

---

#### `src/lib/messaging-data.ts`

**Ruta:** `/src/lib/messaging-data.ts`

**Propósito:** Datos mock de conversaciones y mensajes.

**Datos Exportados:**
```typescript
export const conversations: Conversation[] = [...] // 6 conversaciones
export const messages: Message[] = [...]           // 8 mensajes
```

**Dependencias:**
- `../types/index.js` → `Message`, `Conversation`

**Características:**
- Relational data (conversationId → conversations)
- Thread pattern (múltiples mensajes por conversación)
- Estado mutable (sendMessage agrega mensajes)

---

#### `src/lib/notifications-data.ts`

**Ruta:** `/src/lib/notifications-data.ts`

**Propósito:** Datos mock de notificaciones (8 notificaciones de diferentes tipos).

**Datos Exportados:**
```typescript
export const notifications: Notification[] = [...]
```

**Tipos de Notificación:**
- `profile_view` - Vista de perfil
- `post_like` - Like en post
- `post_comment` - Comentario
- `job_alert` - Alerta de trabajo
- `work_anniversary` - Aniversario
- `mention` - Mención

**Dependencias:**
- `@/types/index.js` → `Notification`, `User`

**Características:**
- Type discrimination (campo 'type')
- Campos opcionales según tipo

---

#### `src/lib/network-data.ts`

**Ruta:** `/src/lib/network-data.ts`

**Propósito:** Datos mock de red social (conexiones, invitaciones).

**Datos Exportados:**
```typescript
export const suggestedUsers: User[] = [...]      // 6 usuarios
export const invitations: Invitation[] = [...]   // 2 invitaciones
export const networkStats: NetworkStats = {      // Estadísticas
    connections: 532,
    groups: 12
}
```

**Dependencias:**
- `@/types/index.js` → `Invitation`, `User`, `NetworkStats`

---

#### `src/lib/saved-data.ts`

**Ruta:** `/src/lib/saved-data.ts`

**Propósito:** Datos mock de items guardados (jobs y posts).

**Datos Exportados:**
```typescript
export const savedJobs: SavedJob[] = [...]   // 4 jobs
export const savedPosts: SavedPost[] = [...]  // 2 posts
```

**Dependencias:**
- `./jobs-data.js` → `jobs`
- `./data.js` → `posts`, `users`
- `../types/index.js` → `SavedJob`, `SavedPost`

**Características:**
- Reference pattern (no duplica datos)
- Fechas relativas legibles

---

#### `src/lib/premium-data.ts`

**Ruta:** `/src/lib/premium-data.ts`

**Propósito:** Datos mock de features premium.

**Datos Exportados:**
```typescript
export const premiumFeatures: PremiumFeature[] = [...]
```

**5 Features:**
1. See who viewed you
2. Direct messaging (InMail)
3. Featured Applicant
4. Premium Badge
5. LinkedIn Learning

**Dependencias:**
- `../types/index.js` → `PremiumFeature`

---

#### `src/lib/randomuser.ts`

**Ruta:** `/src/lib/randomuser.ts`

**Propósito:** Integración con API externa randomuser.me para generar usuarios aleatorios.

**Funciones Exportadas:**

```typescript
// Fetch users desde randomuser.me
fetchRandomUsers(count = 10): Promise<User[]>

// Helpers internos
generateJobTitle(): string
generateLastSeen(): string
```

**Dependencias:**
- `../types/index.js` → `User`
- External API: `https://randomuser.me/api/`

**Características:**
- Adapter pattern (mapea API externa a tipos internos)
- Data transformation
- Error handling con try/catch
- Genera job titles y lastSeen aleatorios

---

## Servicios

### `src/services/storageService.ts`

**Ruta:** `/src/services/storageService.ts`

**Propósito:** Servicio avanzado de storage con simulación de latencia de red para localStorage.

**Funciones Exportadas:**

```typescript
// Inicializa storage con datos default
initializeStorageWithData(data: { posts: Post[] }): Promise<void>

// Obtiene posts desde localStorage
getPosts(): Promise<Post[]>

// Guarda posts en localStorage
savePosts(posts: Post[]): Promise<void>

// Toggle like en un post
toggleLikePost(postId: string): Promise<Post | null>

// Crea un nuevo post
createPost(postData: Partial<Post>): Promise<Post>
```

**Características Especiales:**

**Simulated Network Delay:**
```typescript
const simulateNetworkDelay = () => 
    new Promise(resolve => setTimeout(resolve, 100))

// Cada función async incluye:
await simulateNetworkDelay()
```

**Create Post:**
```typescript
export async function createPost(postData: Partial<Post>): Promise<Post> {
    await simulateNetworkDelay()
    
    const posts = await getPosts()
    const newPost: Post = {
        id: `post-${Date.now()}`,
        userId: postData.userId || 'user-1',
        content: postData.content || '',
        timestamp: 'Just now',
        createdAt: Date.now(),
        likes: 0,
        comments: 0,
        image: postData.image || null,
        reactions: { like: 0, clap: 0, interesting: 0 },
        userReaction: null
    }
    
    posts.unshift(newPost)
    await savePosts(posts)
    return newPost
}
```

**Dependencias:**
- `@/types/index` → `Post`

**Estado:**
- localStorage Key: `'posts'`

**Características:**
- Simula latencia de red (100ms)
- Async/await completo
- ID generation con timestamp
- Optimizado para UI optimista

---

## Datos Mock

### `src/data/users.json`

**Ruta:** `/src/data/users.json`

**Propósito:** Base de datos JSON de usuarios (legacy, reemplazado por `lib/data.ts`).

**Contenido:** Array de objetos User

**Notas:** Archivo legacy que probablemente no se usa en la versión actual.

---

### `src/data/posts.json`

**Ruta:** `/src/data/posts.json`

**Propósito:** Base de datos JSON de posts (legacy, reemplazado por `lib/data.ts`).

**Contenido:** Array de objetos Post

**Notas:** Archivo legacy que probablemente no se usa en la versión actual.

---

## Resumen del Proyecto

### Estadísticas Generales

- **Total de Archivos Documentados:** 69+
- **Componentes Astro:** 22
- **Páginas:** 22 (16 estáticas, 6 dinámicas)
- **Módulos JavaScript/TypeScript:** 17
- **Servicios:** 1
- **Tipos TypeScript:** 20+ interfaces
- **Archivos de Configuración:** 5

### Arquitectura en Capas

```
┌──────────────────────────────────────┐
│     Presentation Layer               │
│  • 22 Componentes Astro              │
│  • 22 Páginas                        │
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│     Business Logic Layer             │
│  • feed.js, profile.js, theme.js     │
│  • reactions.js, clientInit.ts       │
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│     API Layer                        │
│  • api/index.ts (17 funciones)       │
│  • search-utils.ts                   │
└──────────────────────────────────────┘
                ↓
┌──────────────────────────────────────┐
│     Data & Service Layer             │
│  • storageService (feed, profile)    │
│  • *-data.ts (8 archivos)            │
└──────────────────────────────────────┘
```

### Características Principales

1. **Feed Dinámico:** Posts con reacciones, comentarios, sorting
2. **Perfil Editable:** Bio, skills, experiencia con CRUD
3. **Sistema de Trabajos:** Listado, detalle, aplicación, filtros
4. **Mensajería:** Conversaciones, chat interface
5. **Red Social:** Invitaciones, sugerencias, stats
6. **Notificaciones:** Filtrado por tipo, read/unread
7. **Items Guardados:** Jobs y posts con tabs
8. **Tema Dark/Light:** Persistencia y detección del sistema
9. **Búsqueda:** Global de posts con filtros
10. **Premium:** Features y planes

### Stack Tecnológico

- **Framework:** Astro 5.16.9
- **Styling:** TailwindCSS 4.1.18
- **Type Safety:** TypeScript 5.9.3
- **Client-Side:** Vanilla JavaScript
- **Deployment:** Vercel
- **Package Manager:** pnpm 10.0.0

### Patrones de Diseño Utilizados

1. **Layered Architecture**
2. **Repository Pattern**
3. **Module Pattern**
4. **Component Composition**
5. **Optimistic UI**
6. **Event Delegation**
7. **State Machine**
8. **Adapter Pattern**
9. **Facade Pattern**
10. **Factory Pattern**

---

*Documentación generada: Marzo 2026 | LinkedIn-lite v1.0*
*Total de archivos documentados: 69+*
