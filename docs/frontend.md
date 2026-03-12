# LinkedIn-lite: Documentación del Frontend

## Tabla de Contenidos
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Componentes Astro](#componentes-astro)
- [Scripts de JavaScript](#scripts-de-javascript)
- [Flujo de Interacción del Frontend](#flujo-de-interacción-del-frontend)
- [Sistema de Estilos](#sistema-de-estilos)
- [Patrones de Diseño](#patrones-de-diseño)

---

## Estructura de Carpetas

### Vista General del Directorio `src/`

```
src/
├── assets/              # Recursos SVG estáticos
├── components/          # 22 componentes Astro reutilizables
├── data/               # Datos legacy (en desuso)
├── layouts/            # Layout principal de las páginas
├── lib/                # Lógica de negocio y utilidades
│   ├── feed/          # Sistema de feed y reacciones
│   ├── profile/       # Gestión de perfil de usuario
│   ├── theme/         # Sistema de temas (light/dark)
│   └── api/           # Capa de abstracción API
├── pages/              # 19 páginas con file-based routing
├── services/           # Servicios de datos y persistencia
├── styles/             # Estilos globales y CSS variables
└── types/              # Definiciones TypeScript
```

### Organización Detallada

#### `/components` - 22 Componentes
Componentes Astro reutilizables organizados por funcionalidad:

**Navegación y Layout:**
- `Navbar.astro` - Navegación principal con búsqueda
- `ThemeToggle.astro` - Toggle de tema claro/oscuro
- `ProfileSidebar.astro` - Sidebar izquierdo con resumen de perfil
- `RightSidebar.astro` - Sidebar derecho con sugerencias

**Feed y Posts:**
- `Post.astro` - Componente principal de post con reacciones
- `CreatePostModal.astro` - Modal para crear nuevos posts
- `SkeletonPost.astro` - Loader skeleton animado
- `Comments.astro` - Sistema de comentarios
- `SearchResults.astro` - Resultados de búsqueda

**Perfil:**
- `ProfileCard.astro` - Tarjeta completa de perfil
- `ExperienceCard.astro` - Container de experiencia laboral
- `ExperienceItem.astro` - Item individual de experiencia
- `SkillBadge.astro` - Badge de habilidad

**Networking:**
- `ConnectionCard.astro` - Tarjeta de conexión sugerida
- `InvitationCard.astro` - Invitación de conexión

**Mensajería:**
- `ConversationItem.astro` - Item en lista de conversaciones
- `MessageBubble.astro` - Burbuja de mensaje individual

**Trabajos:**
- `JobCard.astro` - Tarjeta de oferta laboral
- `SavedJobItem.astro` - Trabajo guardado

**Utilidades:**
- `NotificationItem.astro` - Notificación individual
- `Spinner.astro` - Indicador de carga
- `Welcome.astro` - Página de bienvenida (legacy)

#### `/lib` - Lógica de Negocio

**Sistema de Feed (`/lib/feed/`):**
- `feed.js` - Renderizado y ordenamiento de posts
- `reactions.js` - Lógica de reacciones (like, clap, interesting)
- `storageService.js` - Persistencia de posts en localStorage

**Sistema de Perfil (`/lib/profile/`):**
- `profile.js` - UI editable del perfil
- `storageService.js` - Persistencia de datos de perfil

**Sistema de Temas (`/lib/theme/`):**
- `theme.js` - Gestión de light/dark mode

**API y Datos:**
- `api/index.ts` - Mock API layer (17 funciones)
- `data.ts` - Base de datos mock (users, posts, comments)
- `clientInit.ts` - Script de inicialización del cliente

**Datos Mock por Módulo:**
- `jobs-data.ts` - 8 ofertas laborales completas
- `messaging-data.ts` - Conversaciones y mensajes
- `notifications-data.ts` - 8 tipos de notificaciones
- `network-data.ts` - Conexiones e invitaciones
- `saved-data.ts` - Items guardados
- `premium-data.ts` - Features premium
- `randomuser.ts` - Integración con API externa

**Utilidades:**
- `search-utils.ts` - Búsqueda y filtrado de posts

#### `/pages` - File-Based Routing

**Páginas Principales:**
```
/                    → index.astro (Feed)
/profile            → profile.astro (Perfil del usuario)
/search             → search.astro (Búsqueda global)
/network            → network.astro (Red de contactos)
/notifications      → notifications.astro (Notificaciones)
/messages           → messages/index.astro (Lista de conversaciones)
/messages/[id]      → messages/[id].astro (Conversación específica)
/jobs               → jobs/index.astro (Lista de empleos)
/jobs/[id]          → jobs/[id].astro (Detalle de empleo)
/jobs/apply/[id]    → jobs/apply/[id].astro (Aplicar a empleo)
/posts/[id]         → posts/[id].astro (Detalle de post)
/users/[id]         → users/[id].astro (Perfil de usuario)
/premium            → premium.astro (Página premium)
/saved              → saved.astro (Items guardados)
/settings           → settings.astro (Configuración)
/login              → login.astro (Inicio de sesión)
/logout             → logout.astro (Cierre de sesión)
```

**Páginas Estáticas:**
- `about.astro` - Sobre nosotros
- `help.astro` - Centro de ayuda
- `privacy.astro` - Política de privacidad
- `terms.astro` - Términos de servicio
- `ads.astro` - Publicidad

#### `/styles` - Sistema de Diseño

**Archivo único:** `global.css`
- Variables CSS para light/dark mode
- Sistema de colores LinkedIn
- Animaciones globales
- Transiciones suaves

---

## Componentes Astro

### Categorización por Funcionalidad

#### 1. Navegación y Layout

##### `Navbar.astro`
**Props:** Ninguna

**Funcionalidad:**
- Barra de navegación sticky con logo
- Búsqueda integrada (redirect a `/search?q=...`)
- Links principales: Home, Network, Jobs, Messages, Profile
- Toggle de tema integrado (`ThemeToggle`)
- Menú dropdown de settings con opciones:
  - Settings & Privacy
  - Sign out
- Indicador de notificaciones no leídas (punto rojo)

**Scripts Client-side:**
```javascript
// Toggle del dropdown de settings
settingsBtn.addEventListener("click", (e) => {
    settingsDropdown.classList.toggle("hidden");
});

// Cerrar dropdown al hacer click fuera
document.addEventListener("click", () => {
    settingsDropdown.classList.add("hidden");
});
```

**Estilos Destacados:**
- `sticky top-0 z-50` - Navbar fijo en scroll
- Dark mode completo con `dark:` variants
- Search input con `bg-blue-50 dark:bg-gray-800`
- Logo personalizado: `w-9 h-9 bg-blue-600 rounded` con "in"
- Dropdown con `shadow-lg border`

---

##### `ThemeToggle.astro`
**Props:** Ninguna

**Funcionalidad:**
- Botón toggle para cambiar entre modo claro y oscuro
- Iconos dinámicos: sol (light) / luna (dark)
- Persiste preferencia en localStorage
- Detecta preferencia del sistema con `matchMedia`

**Scripts Client-side:**
```javascript
import { toggleTheme, initTheme } from '../lib/theme/theme.js';

initTheme(); // Inicializa al cargar

themeToggle.addEventListener('click', () => {
    toggleTheme();
});
```

**Dependencias:**
- `../lib/theme/theme.js` → `toggleTheme()`, `initTheme()`

---

##### `ProfileSidebar.astro`
**Props:**
```typescript
interface Props {
    user: User;
}
```

**Funcionalidad:**
- Sidebar izquierdo compacto del feed
- Resumen del perfil: avatar, nombre, título
- Estadísticas rápidas: conexiones, vistas de perfil
- CTA de premium con icono estrella
- Link a items guardados

**Interactividad:**
- Link a `/profile` al hacer click en sección superior
- Hover en stats con `hover:bg-gray-50`
- Links a `/premium` y `/saved`

**Estilos Destacados:**
- Header gradiente: `from-blue-500 to-blue-600`
- Avatar posicionado: `absolute -bottom-8 left-1/2 -translate-x-1/2`
- Stats con números en `text-blue-600 font-semibold`

---

##### `RightSidebar.astro`
**Props:**
```typescript
interface Props {
    suggestions: ConnectionSuggestion[];
}
```

**Funcionalidad:**
- Sidebar derecho con sugerencias de conexiones
- Título "People you may know"
- Lista de perfiles sugeridos con:
  - Avatar, nombre, título
  - Botón "Connect" / "Pending"
- Footer con links legales y copyright

**Scripts Client-side:**
```javascript
connectButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (btn.textContent?.trim() === "Connect") {
            btn.textContent = "Pending";
            btn.classList.remove("border-blue-600", "text-blue-600");
            btn.classList.add("border-gray-400", "text-gray-600");
            btn.disabled = true;
        }
    });
});
```

**Estilos Destacados:**
- Card de sugerencias: `divide-y divide-gray-200`
- Botón Connect: `w-full border border-blue-600 rounded-full`
- Estado Pending: `border-gray-400 text-gray-600 cursor-not-allowed`
- Footer: `flex-wrap gap-x-3 gap-y-1 text-xs`

---

#### 2. Feed y Posts

##### `Post.astro`
**Props:**
```typescript
interface Props {
    post?: Post;
    author?: User;
    postWithAuthor?: PostWithAuthor;
}
```

**Funcionalidad:**
- Componente completo de post con múltiples formatos de props
- Header con autor (avatar, nombre, título, timestamp)
- Contenido del post (texto + imagen opcional)
- Posts compartidos (reshares) con preview
- Sistema de reacciones (like, clap, interesting)
- Estadísticas de engagement (reacciones, comentarios)
- Botones de acción: Like, Comment, Share
- Menú dropdown con opciones:
  - Save post
  - Copy link
  - Report post
- Sección de comentarios integrada

**Scripts Client-side:**
```javascript
// Like button toggle
likeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const isLiked = button.classList.contains('text-blue-600');
        button.classList.toggle('text-blue-600');
        button.classList.toggle('text-gray-600');
        
        // Actualizar contador
        const likesCount = parseInt(button.dataset.likes) + (isLiked ? -1 : 1);
        button.dataset.likes = likesCount;
        
        // Cambiar icono (fill/outline)
        button.querySelector('path').setAttribute('fill', isLiked ? 'none' : 'currentColor');
    });
});

// Post menu dropdown
postMenuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Cerrar otros dropdowns
        document.querySelectorAll('.post-menu').forEach(menu => {
            if (menu !== targetMenu) menu.classList.add('hidden');
        });
        targetMenu.classList.toggle('hidden');
    });
});
```

**Dependencias:**
- `Comments.astro` - Para mostrar comentarios
- `../lib/api` → `getCommentsByPost()`

**Estilos Destacados:**
- Card completa: `bg-white rounded-lg border border-gray-200 mb-4`
- Dropdown menu: `shadow-lg border rounded-lg z-10`
- Shared post: `border border-gray-300` con hover
- Like state: `text-blue-600` (liked) vs `text-gray-600` (unliked)
- Action buttons: `hover:bg-gray-50 rounded transition`
- CSS custom `.line-clamp-3` para truncar contenido compartido

---

##### `CreatePostModal.astro`
**Props:**
```typescript
interface Props {
    currentUser: User;
}
```

**Funcionalidad:**
- Modal completo para crear posts con overlay
- Soporte para texto e imágenes
- Preview de imagen con opción de eliminar
- Validación de contenido
- Estados de carga con spinner
- Creación optimista de posts (actualización inmediata del DOM)
- Atajo de teclado: Ctrl/Cmd+Enter para enviar

**Scripts Client-side:**
```javascript
// Abrir/cerrar modal
openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    textarea.focus();
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    resetForm();
});

// Manejo de imagen
imageBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreviewContainer.classList.remove('hidden');
    };
    
    reader.readAsDataURL(file);
});

// Validación
textarea.addEventListener('input', () => {
    const hasContent = textarea.value.trim() || hasImage;
    submitBtn.disabled = !hasContent;
});

// Atajo de teclado
textarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        submitBtn.click();
    }
});

// Submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<Spinner /> Posting...';
    
    try {
        const newPost = await createPost({
            content: textarea.value,
            image: imageData,
            userId: currentUser.id
        });
        
        // Insertar post optimísticamente
        const postElement = createPostElement(newPost);
        postsContainer.prepend(postElement);
        
        closeModal();
        resetForm();
    } catch (error) {
        alert('Error creating post');
    }
});

// Función helper: createPostElement()
function createPostElement(post) {
    return `<article class="post-item fadeIn">...</article>`;
}
```

**Dependencias:**
- `../services/storageService` → `createPost()`, `initializeStorageWithData()`
- `../lib/clientInit` → `attachLikeHandlers()`
- `../lib/data` → `posts`

**Estilos Destacados:**
- Modal backdrop: Gradiente azul-gris con blur
  ```css
  background: linear-gradient(135deg, rgba(226,232,240,0.95) 0%, ...);
  backdrop-filter: blur(8px);
  ```
- Animación fadeIn para posts nuevos
- Responsive: `max-w-2xl w-full max-h-[90vh] overflow-y-auto`
- Textarea: `min-h-[200px] resize-none` con maxlength 3000
- Spinner SVG con animación de rotación

---

##### `Comments.astro`
**Props:**
```typescript
interface Props {
    comments: CommentWithAuthor[];
    postId: string;
    showAll?: boolean; // Default: false
}
```

**Funcionalidad:**
- Renderiza sección de comentarios de un post
- Muestra hasta 3 comentarios por defecto en feed
- Link "View all X comments" cuando hay más de 3
- Cada comentario muestra:
  - Avatar del autor
  - Nombre y título profesional
  - Contenido del comentario
  - Timestamp y contador de likes
  - Botones Like y Reply (sin funcionalidad aún)

**Interactividad:**
- Link a `/posts/${postId}` para ver todos los comentarios
- Links a perfiles de usuarios

**Estilos Destacados:**
- `space-y-3` - Espaciado vertical entre comentarios
- `bg-gray-50` - Fondo gris claro para burbuja
- `min-w-0` - Previene overflow en contenedores flex
- CSS custom `.line-clamp-2` con `-webkit-box` para truncar texto

---

##### `SearchResults.astro`
**Props:**
```typescript
interface Props {
    searchQuery: string;
    posts: PostWithAuthor[];
}
```

**Funcionalidad:**
- Contenedor de resultados de búsqueda
- Header con contador de resultados y link "Volver al Feed"
- Lista de posts filtrados usando componente `Post`
- Estado vacío cuando no hay resultados:
  - Icono de búsqueda grande
  - Mensaje: "No results found for '{query}'"
  - Sugerencia: "Try different keywords or vuelve al feed"

**Dependencias:**
- `Post.astro` - Para renderizar posts individuales

**Estilos Destacados:**
- Header: `border-b border-gray-200` para separador
- Estado vacío: SVG grande `w-16 h-16 text-gray-300`
- Texto jerárquico: `font-medium text-gray-500` y `text-sm text-gray-400`
- Link inline: `text-blue-600 hover:underline`

---

##### `SkeletonPost.astro`
**Props:** Ninguna

**Funcionalidad:**
- Loader skeleton que simula estructura de post real
- Muestra placeholders animados para:
  - Avatar circular
  - Líneas de texto de diferentes anchos
  - Imagen rectangular
  - Estadísticas de engagement
  - Botones de acción

**Estilos Destacados:**
- Animación pulse CSS:
  ```css
  @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
  }
  .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  ```
- Placeholders:
  - Avatar: `w-12 h-12 rounded-full bg-gray-300`
  - Texto: `h-3 bg-gray-200 rounded w-[variable]`
  - Imagen: `w-full h-64 bg-gray-300 rounded-lg`
- Variación de anchos: `w-32`, `w-48`, `w-20`, `w-full`, `w-3/4`

---

#### 3. Perfil

##### `ProfileCard.astro`
**Props:**
```typescript
interface Props {
    user: User;
}
```

**Funcionalidad:**
- Tarjeta de perfil completa con soporte dark mode
- Renderiza dinámicamente usando localStorage:
  - Biografía editable
  - Habilidades con chips
  - Experiencias laborales
- Header gradiente con avatar posicionado
- Estadísticas de perfil:
  - Conexiones
  - Vistas de perfil

**Scripts Client-side:**
```javascript
const currentUser = users.find(u => u.isCurrentUser);

if (currentUser) {
    const defaultProfile = {
        bio: currentUser.about || 'Passionate about...',
        skills: currentUser.skills || ['JavaScript', 'TypeScript', ...],
        experience: currentUser.experience || []
    };
    
    initializeProfile(defaultProfile);
    
    if (bioContainer) renderBio(bioContainer);
    if (skillsContainer) renderSkills(skillsContainer);
}
```

**Dependencias:**
- `../lib/profile/storageService.js` → `initializeProfile()`
- `../lib/profile/profile.js` → `renderBio()`, `renderSkills()`
- `../lib/data` → `users`

**Estilos Destacados:**
- Dark mode completo: `dark:bg-gray-900`, `dark:border-gray-700`
- Header gradiente: `h-16 bg-gradient-to-r from-blue-500 to-blue-600`
- Avatar posicionado: `-mt-12 border-4 border-white dark:border-gray-900`
- Stats layout: `flex justify-between`
- Borders separadores: `border-t border-gray-200 dark:border-gray-700`

---

##### `ExperienceCard.astro`
**Props:** Ninguna

**Funcionalidad:**
- Contenedor simple para experiencias profesionales
- Renderiza dinámicamente usando JavaScript client-side
- Actúa como wrapper para funcionalidad de experiencias

**Scripts Client-side:**
```javascript
const experienceContainer = document.getElementById('experience-container');
if (experienceContainer) {
    renderExperience(experienceContainer);
}
```

**Dependencias:**
- `../lib/profile/profile.js` → `renderExperience()`

**Estilos Destacados:**
- Dark mode: `dark:bg-gray-900`, `dark:border-gray-700`
- Container básico: `bg-white rounded-lg border p-4`

---

##### `ExperienceItem.astro`
**Props:**
```typescript
interface Props {
    experience: Experience;
}
```

**Funcionalidad:**
- Muestra un elemento individual de experiencia profesional
- Información mostrada:
  - Logo de la empresa (cuadrado con esquinas redondeadas)
  - Título del puesto
  - Nombre de la empresa
  - Tipo de empleo (Full-time, Part-time, etc.)
  - Fechas (inicio - fin)
  - Duración calculada
  - Ubicación

**Estilos Destacados:**
- Layout: `flex gap-3 py-4`
- Logo: `w-12 h-12 rounded`
- Jerarquía de texto:
  - `font-semibold text-gray-900` para título
  - `text-sm text-gray-900` para empresa
  - `text-sm text-gray-600` para fechas/ubicación

---

##### `SkillBadge.astro`
**Props:**
```typescript
interface Props {
    skill: string;
}
```

**Funcionalidad:**
- Badge simple y minimalista para mostrar una habilidad
- Diseñado para listas de skills en perfiles

**Estilos Destacados:**
- Pill shape: `rounded-full`
- Neutral colors: `bg-neutral-100` y `hover:bg-neutral-200`
- Typography: `text-sm font-medium text-gray-900`
- Padding: `px-4 py-2`

---

#### 4. Networking

##### `ConnectionCard.astro`
**Props:**
```typescript
interface Props {
    user: User;
    colorClass?: string; // Default: "bg-blue-500"
}
```

**Funcionalidad:**
- Tarjeta de conexión sugerida
- Header colorido personalizable (diferentes colores para variedad visual)
- Avatar posicionado sobre el header
- Información del usuario: nombre, título, conexiones mutuas
- Botón "Connect" que cambia a "Pending" al hacer click

**Scripts Client-side:**
```javascript
document.addEventListener("click", (e) => {
    const button = target.closest("[data-action='connect']");
    if (!button) return;
    
    const userId = button.dataset.userId;
    console.log(`Connect request sent to user: ${userId}`);
    
    button.textContent = "Pending";
    button.disabled = true;
    button.classList.remove("bg-blue-600", "hover:bg-blue-700");
    button.classList.add("bg-gray-400", "cursor-not-allowed");
});
```

**Estilos Destacados:**
- Header colorido dinámico: `h-20 ${colorClass}`
- Avatar con borde: `border-4 border-white` y `-mt-10`
- Botón redondeado: `rounded-full` estilo LinkedIn
- Transiciones: `hover:bg-blue-50 transition`
- CSS custom `.line-clamp-2` para truncar título

---

##### `InvitationCard.astro`
**Props:**
```typescript
interface Props {
    invitation: Invitation;
}
```

**Funcionalidad:**
- Muestra invitación de conexión
- Información mostrada:
  - Avatar, nombre, título del usuario
  - Conexiones mutuas (si existen)
  - Grupos compartidos (si existen)
  - Timestamp de la invitación
- Botones de acción: Accept / Ignore
- Al hacer click en cualquier botón, elimina la tarjeta del DOM

**Scripts Client-side:**
```javascript
document.addEventListener("click", (e) => {
    const button = target.closest("[data-action]");
    if (!button) return;
    
    const action = button.dataset.action; // "accept" o "ignore"
    const invitationId = button.dataset.invitationId;
    
    const card = button.closest('.invitation-card');
    card?.remove();
    
    console.log(`${action} invitation: ${invitationId}`);
});
```

**Estilos Destacados:**
- Avatar grande: `w-16 h-16 rounded-full flex-shrink-0`
- Botones diferenciados:
  - Accept: `bg-blue-600 hover:bg-blue-700 text-white`
  - Ignore: `border border-gray-300 hover:border-gray-400 text-gray-700`
- Botones redondeados: `rounded-full`

---

#### 5. Mensajería

##### `ConversationItem.astro`
**Props:**
```typescript
interface Props {
    conversation: ConversationWithUser;
}
```

**Funcionalidad:**
- Elemento individual en lista de conversaciones
- Información mostrada:
  - Avatar del otro usuario
  - Nombre del usuario
  - Preview del último mensaje (truncado)
  - Timestamp del último mensaje
  - Indicador de online (punto verde)
  - Contador de mensajes no leídos (si > 0)
- Todo el elemento es clickeable → redirige a conversación

**Estilos Destacados:**
- Indicador de online:
  - `absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white`
- Indicador de no leídos:
  - `w-3 h-3 bg-blue-600 rounded-full`
  - Solo visible si `unreadCount > 0`
- Truncate: `truncate` en nombre y mensaje
- Hover: `hover:bg-gray-50`
- Flex layout: `flex-shrink-0` y `flex-1 min-w-0`

---

##### `MessageBubble.astro`
**Props:**
```typescript
interface Props {
    message: Message;
    isCurrentUser: boolean;
    sender?: User;
}
```

**Funcionalidad:**
- Renderiza burbuja de mensaje individual en chat
- Alineación y estilos cambian según emisor:
  - Usuario actual: alineado a la derecha, fondo azul
  - Otro usuario: alineado a la izquierda, fondo gris
- Muestra avatar del otro usuario
- Indicador de lectura para mensajes propios (checkmark azul)
- Timestamp relativo

**Estilos Destacados:**
- Alineación condicional:
  - Usuario actual: `justify-end` y `items-end`
  - Otro usuario: `justify-start` y `items-start`
- Colores de burbuja:
  - Usuario actual: `bg-blue-600 text-white`
  - Otro usuario: `bg-gray-100 text-gray-900`
- Burbuja redondeada: `rounded-2xl px-4 py-3`
- Max width: `max-w-[70%]`
- Whitespace: `whitespace-pre-wrap` para preservar saltos de línea

---

#### 6. Trabajos

##### `JobCard.astro`
**Props:**
```typescript
interface Props {
    job: Job;
}
```

**Funcionalidad:**
- Tarjeta de oferta laboral completa
- Información mostrada:
  - Logo de la empresa (generado con dicebear)
  - Título del puesto
  - Nombre de la empresa
  - Ubicación (con soporte para "Remote")
  - Tipo de trabajo (Full-time, Part-time, etc.)
  - Rango salarial (formateado como "100K - 150K")
  - Nivel de experiencia
  - Badge "Actively hiring" (si aplica)
- Botón de guardar (bookmark icon)
- Toda la tarjeta es clickeable → redirige a detalle

**Scripts Client-side:**
```javascript
// Botón de guardar previene propagación
onclick="event.preventDefault(); event.stopPropagation();"
```

**Estilos Destacados:**
- Badges personalizados según tipo:
  - Actively Hiring: `bg-green-50 text-green-700`
  - Full-time: `bg-blue-50 text-blue-700`
  - Remote: `bg-gray-100 text-gray-700`
  - Salary: `bg-purple-50 text-purple-700`
  - Entry Level: `bg-gray-100 text-gray-700`
- Badges: `px-3 py-1 rounded-full text-xs font-medium`
- Logo redondeado: `w-14 h-14 rounded-lg`
- Hover: `hover:shadow-md`
- Flex wrap: `flex-wrap gap-2` para badges responsivos

---

##### `SavedJobItem.astro`
**Props:**
```typescript
interface Props {
    savedJob: SavedJob;
}
```

**Funcionalidad:**
- Muestra trabajo guardado con opción de eliminar
- Información mostrada:
  - Logo de empresa (dicebear)
  - Título del puesto
  - Nombre de la empresa
  - Ubicación
  - Badge "Actively hiring"
  - Fecha de guardado
- Botón de eliminar con animación de fade out

**Scripts Client-side:**
```javascript
document.querySelectorAll(".delete-saved-job").forEach((button) => {
    button.addEventListener("click", (e) => {
        const article = e.currentTarget.closest(".saved-job-item");
        if (article) {
            // Animación de salida
            article.style.transition = "opacity 0.3s, transform 0.3s";
            article.style.opacity = "0";
            article.style.transform = "translateX(20px)";
            
            // Elimina del DOM después de la animación
            setTimeout(() => {
                article.remove();
            }, 300);
        }
    });
});
```

**Estilos Destacados:**
- Animación de eliminación: Inline styles con transition
- Badge "Actively hiring": `bg-green-100 text-green-700 text-xs px-2 py-1 rounded`
- Logo: `w-14 h-14 rounded border border-gray-200`
- Delete button:
  - `hover:text-red-600 hover:bg-red-50 rounded-full`
  - Icono de basura SVG
- Hover en título: `group-hover:text-blue-600`

---

#### 7. Notificaciones

##### `NotificationItem.astro`
**Props:**
```typescript
interface Props {
    notification: Notification;
}
```

**Funcionalidad:**
- Muestra notificación individual con diferentes layouts según tipo
- Tipos de notificación:
  - `profile_view` - Vista de perfil
  - `post_like` - Like en post
  - `post_comment` - Comentario
  - `job_alert` - Alerta de trabajo
  - `work_anniversary` - Aniversario
  - `mention` - Mención
- Indicador visual de leído/no leído
- Avatar o icono según tipo
- Botón de acción opcional (ej: "View Job")
- Click en notificación marca como leída

**Scripts Client-side:**
```javascript
document.addEventListener("click", (e) => {
    const notificationCard = target.closest("[data-notification-id]");
    if (!notificationCard) return;
    
    const isRead = notificationCard.dataset.isRead === "true";
    
    if (!isRead) {
        // Marca como leído
        notificationCard.classList.remove("bg-blue-50", "border-blue-600");
        notificationCard.classList.add("bg-white", "border-transparent");
        notificationCard.dataset.isRead = "true";
        
        // Elimina el punto indicador
        const unreadDot = notificationCard.querySelector(".bg-blue-600.rounded-full.w-2");
        unreadDot?.remove();
        
        console.log(`Marked notification ${notificationId} as read`);
    }
});
```

**Estilos Destacados:**
- Estado no leído:
  - `bg-blue-50 border-l-4 border-blue-600`
  - Punto indicador: `w-2 h-2 bg-blue-600 rounded-full`
- Estado leído: `bg-white border-transparent`
- Icono de job: `w-12 h-12 bg-blue-50 rounded-xl` con SVG de maletín
- Avatar circular: `w-12 h-12 rounded-full`
- Badges inline: `font-bold` para nombres
- Botón de acción: `border border-blue-600 rounded-full text-xs`

---

#### 8. Utilidades

##### `Spinner.astro`
**Props:**
```typescript
interface Props {
    size?: "sm" | "md" | "lg"; // Default: "md"
    color?: string; // Default: "white"
}
```

**Funcionalidad:**
- Componente reutilizable de spinner animado
- Configurable en tamaño y color
- Ideal para botones y acciones en progreso

**Estilos Destacados:**
- Tamaños:
  - `sm`: `w-4 h-4 border-2`
  - `md`: `w-6 h-6 border-2`
  - `lg`: `w-8 h-8 border-3`
- Animación spin:
  ```css
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
  .spinner {
      animation: spin 0.6s linear infinite;
  }
  ```
- Border circular con `border-t-transparent`
- Accessibility: `role="status" aria-label="Loading"`

---

## Scripts de JavaScript

### Arquitectura de Capas

```
┌─────────────────────────────────────────┐
│         UI Layer (Components)           │
│  • Components Astro con scripts inline  │
└─────────────────────────────────────────┘
                     │
┌─────────────────────────────────────────┐
│       Business Logic Layer              │
│  • feed.js - Renderizado de posts      │
│  • profile.js - UI editable de perfil  │
│  • reactions.js - Lógica de reacciones │
│  • theme.js - Sistema de temas         │
│  • clientInit.ts - Inicialización      │
└─────────────────────────────────────────┘
                     │
┌─────────────────────────────────────────┐
│           API Layer                     │
│  • api/index.ts - Mock API (17 funcs)  │
│  • search-utils.ts - Búsqueda          │
└─────────────────────────────────────────┘
                     │
┌─────────────────────────────────────────┐
│         Data & Service Layer            │
│  • storageService.js - Persistencia    │
│  • *-data.ts files - Datos mock        │
└─────────────────────────────────────────┘
```

### Módulos Principales

#### 1. Sistema de Feed

##### `lib/feed/feed.js`

**Propósito:** Módulo central para renderizado y gestión del feed de publicaciones.

**Funciones Exportadas:**

```javascript
// Ordena posts por criterio
sortPosts(posts, sortBy = 'recent')
// @param posts: Array de objetos post
// @param sortBy: 'recent' | 'popular'
// @return Array de posts ordenados

// Genera HTML de un post
renderPost(post, author)
// @param post: Objeto con datos del post
// @param author: Objeto con datos del autor
// @return String HTML del post renderizado

// Renderiza todo el feed
renderFeed(users, sortBy = 'recent')
// @param users: Array de usuarios
// @param sortBy: Criterio de ordenamiento
// @return void

// Adjunta event listeners a botones de reacción
attachReactionHandlers()
// @return void
```

**Estado que Maneja:**
- Variable global: `window.__USERS_DATA__`
- DOM: Manipula `#posts-container` y `#feed-sort-select`
- No usa localStorage directamente (delegado a storageService)

**Patrones de Diseño:**
- Module Pattern: Funciones independientes sin estado interno
- Observer Pattern: Event delegation para botones de reacción
- Template Literal: Template strings para HTML
- Separation of Concerns: Renderizado separado de datos

**Interacción con el DOM:**
```javascript
// Lectura
document.getElementById('posts-container')
document.getElementById('feed-sort-select')
document.querySelectorAll('.reaction-btn')

// Escritura
container.innerHTML = html
element.style.opacity = '0'

// Eventos
element.addEventListener('click', handler)

// Animaciones
requestAnimationFrame(() => {
    element.style.opacity = '1'
})
```

---

##### `lib/feed/reactions.js`

**Propósito:** Gestiona lógica de reacciones a posts (like, clap, interesting).

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

**Lógica de Estado:**
```javascript
// Si ya hay reacción del mismo tipo → remover
if (post.userReaction === reactionType) {
    post.userReaction = null
    post.reactions[reactionType]--
}
// Si hay reacción diferente → cambiar tipo
else if (post.userReaction) {
    post.reactions[post.userReaction]--
    post.userReaction = reactionType
    post.reactions[reactionType]++
}
// Si no hay reacción → agregar nueva
else {
    post.userReaction = reactionType
    post.reactions[reactionType]++
}
```

**Patrones de Diseño:**
- Pure Functions: Sin efectos secundarios (excepto persistencia)
- Immutability: Spread operator para no mutar objetos
- State Machine: Transiciones de estado de reacciones

---

##### `lib/feed/storageService.js`

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

**Estado que Maneja:**
```javascript
// localStorage Key
const STORAGE_KEY = 'linkedin-lite-posts'

// Estructura de Post
{
    ...post,
    createdAt: Number, // timestamp
    reactions: { like: 0, clap: 0, interesting: 0 },
    userReaction: null | 'like' | 'clap' | 'interesting'
}
```

**SSR Safety:**
```javascript
// Verifica si está en el navegador
if (typeof window === 'undefined') return []
```

**Patrones de Diseño:**
- Repository Pattern: Abstrae capa de persistencia
- Singleton Pattern: Constante para storage key
- Default Values: Asegura estructura consistente
- Defensive Programming: Validación SSR en cada función

---

#### 2. Sistema de Perfil

##### `lib/profile/profile.js`

**Propósito:** Gestiona UI editable del perfil de usuario.

**Funciones Exportadas:**

```javascript
// Alterna modo edición para una sección
toggleEditMode(section)
// @param section: 'bio' | 'skills' | 'experience'
// @return Boolean - Nuevo estado del modo edición

// Verifica si una sección está en modo edición
isEditMode(section)
// @param section: String
// @return Boolean

// Renderiza sección biografía
renderBio(container)
// @param container: HTMLElement
// @return void

// Renderiza sección habilidades
renderSkills(container)
// @param container: HTMLElement
// @return void

// Renderiza timeline de experiencia
renderExperience(container)
// @param container: HTMLElement
// @return void
```

**Estado Local:**
```javascript
let editMode = {
    bio: false,
    skills: false,
    experience: false
}
```

**Patrones de Diseño:**
- State Management: Objeto editMode como estado del módulo
- Render Props Pattern: Funciones reciben containers
- View/Edit Mode Pattern: Dual rendering basado en estado
- Event Delegation: Adjunta listeners después de cada render
- CRUD Operations: Create, read, update, delete para experiencia

**Flujo de Edición:**
```
1. Usuario hace click en "Edit" → toggleEditMode('bio')
2. renderBio() renderiza formulario con textarea
3. Usuario edita y hace click en "Save"
4. updateBio() persiste cambios en localStorage
5. renderBio() renderiza vista de solo lectura con nuevos datos
```

---

##### `lib/profile/storageService.js`

**Propósito:** Servicio de persistencia para datos de perfil.

**Funciones Exportadas:**

```javascript
// Obtiene perfil desde localStorage
getProfile()
// @return Object | null

// Guarda perfil completo
saveProfile(profile)
// @param profile: Object
// @return void

// Actualización parcial del perfil
updateProfile(updates)
// @param updates: Object - Propiedades a actualizar
// @return Profile actualizado o null

// Inicializa perfil si no existe
initializeProfile(defaultProfile)
// @param defaultProfile: Object
// @return void

// Agrega nueva experiencia con ID único
addExperience(experience)
// @param experience: Object sin ID
// @return Profile actualizado o null

// Elimina experiencia por ID
removeExperience(experienceId)
// @param experienceId: String
// @return Profile actualizado o null

// Atajo para actualizar solo bio
updateBio(bio)
// @param bio: String
// @return Profile actualizado

// Atajo para actualizar habilidades
updateSkills(skills)
// @param skills: Array<String>
// @return Profile actualizado
```

**ID Generation:**
```javascript
const id = `exp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
```

**Patrones de Diseño:**
- Repository Pattern: Encapsula lógica de persistencia
- Facade Pattern: Funciones de conveniencia (updateBio, updateSkills)
- Factory Pattern: Genera IDs únicos
- Immutability: Spread operator para actualizaciones

---

#### 3. Sistema de Temas

##### `lib/theme/theme.js`

**Propósito:** Gestiona el sistema de temas (light/dark mode).

**Funciones Exportadas:**

```javascript
// Obtiene tema actual
getTheme()
// @return 'light' | 'dark'

// Aplica tema y persiste
setTheme(theme)
// @param theme: 'light' | 'dark'
// @return void

// Alterna entre light y dark
toggleTheme()
// @return String - Nuevo tema activo

// Inicializa tema al cargar
initTheme()
// @return void
```

**Estado que Maneja:**
```javascript
// localStorage Key
const THEME_KEY = 'linkedin-lite-theme'

// DOM State
document.documentElement.classList.add('dark')
document.documentElement.classList.remove('dark')

// System Preference
window.matchMedia('(prefers-color-scheme: dark)').matches
```

**Flujo de Determinación de Tema:**
```
1. Buscar en localStorage
2. Si no existe, detectar preferencia del sistema
3. Si no se puede detectar, usar 'light' por defecto
4. Aplicar clase 'dark' al documentElement si es dark
```

**Patrones de Diseño:**
- Singleton Pattern: Una fuente de verdad
- Strategy Pattern: Fallback localStorage → system → default
- Observer Pattern (implícito): DOM reacciona a cambios de clase

**CSS Integration:**
```css
/* Tailwind CSS lee la clase 'dark' */
.dark .dark\:bg-gray-900 {
    background-color: #111827;
}
```

---

#### 4. Inicialización del Cliente

##### `lib/clientInit.ts`

**Propósito:** Script de inicialización del cliente. Orquesta primer render del feed.

**Funciones Exportadas:**

```javascript
// Adjunta event listeners a botones de like
attachLikeHandlers()
// @return void

// Inicializa storage, carga posts y renderiza
loadAndRenderPosts(container, users)
// @param container: HTMLElement
// @param users: User[]
// @return Promise<void>
```

**Flujo de Inicialización:**
```javascript
async function loadAndRenderPosts(container, users) {
    try {
        // 1. Inicializar localStorage con datos default
        await initializeStorageWithData({ posts })
        
        // 2. Obtener posts del storage
        const storedPosts = await getPosts()
        
        // 3. Renderizar posts en el contenedor
        storedPosts.forEach(post => {
            const author = users.find(u => u.id === post.userId)
            const postHTML = renderPost(post, author)
            container.innerHTML += postHTML
        })
        
        // 4. Adjuntar event listeners
        attachLikeHandlers()
    } catch (error) {
        // UI de error con botón reload
        container.innerHTML = errorTemplate
    }
}
```

**Optimistic UI:**
```javascript
// Actualiza UI inmediatamente
button.classList.toggle('text-blue-600')
likesCount.textContent = newCount

// Luego persiste
await toggleLikePost(postId)
```

**Patrones de Diseño:**
- Initialization Pattern: Función principal de bootstrap
- Optimistic UI: Actualiza UI antes de confirmar
- Error Boundary: Try/catch con UI de error
- Event Cloning: `cloneNode()` para evitar memory leaks
- Async/Await: Manejo moderno de asincronía

---

#### 5. API Layer

##### `lib/api/index.ts`

**Propósito:** Mock API layer que simula backend. Diseñado para fácil reemplazo con API real.

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

**Estructura de Retorno:**
```typescript
// Todas las funciones son async y retornan Promises
// Simulan latencia con delay opcional (0ms por defecto)

const API_LATENCY = 0 // Configurable

async function getExample() {
    await new Promise(resolve => setTimeout(resolve, API_LATENCY))
    return data
}
```

**Data Enrichment:**
```javascript
// Combina posts con autores
const postsWithAuthors = posts.map(post => ({
    ...post,
    author: users.find(u => u.id === post.userId)
}))

// Combina conversaciones con usuarios
const conversationsWithUsers = conversations.map(conv => ({
    ...conv,
    otherUser: users.find(u => u.id === conv.participants.find(p => p !== currentUser.id))
}))
```

**Patrones de Diseño:**
- Repository Pattern: Abstrae fuente de datos
- Facade Pattern: Oculta complejidad de múltiples fuentes
- Async/Await: API consistente basada en Promises
- Data Enrichment: Combina datos relacionales
- Filter Pattern: Filtrado opcional
- Mock API Pattern: Simula latencia y estructura real

---

#### 6. Datos Mock

##### `lib/data.ts`

**Propósito:** Base de datos mock en memoria con datos estáticos.

**Datos Exportados:**

```typescript
// 20 usuarios con datos completos
users: User[] (20 usuarios)
// Usuario actual: user-1 (Alex Johnson)
// Avatares: dicebear API

// 26 comentarios distribuidos en posts
comments: Comment[] (26 comentarios)

// 17 posts con reacciones y shares
posts: Post[] (17 posts)
// Posts normales: 15
// Posts compartidos (shares): 2
```

**Estructura de Datos:**
```typescript
// Usuario actual
{
    id: "user-1",
    name: "Alex Johnson",
    title: "Senior Full Stack Developer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    connections: 532,
    location: "San Francisco, CA",
    isCurrentUser: true,
    about: "Passionate about building scalable...",
    experience: [...],
    skills: ["JavaScript", "TypeScript", ...]
}

// Post
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
    userReaction: null,
    sharedPostId: null
}

// Post compartido
{
    ...postData,
    sharedPostId: "post-5", // Referencia al post original
    content: "Great insights! Worth reading."
}
```

**Timestamps:**
```javascript
// Relativos para UI
timestamp: "2h", "1d", "3d"

// Absolutos para ordenamiento
createdAt: Date.now() - duration
```

---

##### Otros Archivos de Datos

**`lib/jobs-data.ts`** - 8 ofertas laborales completas
- Estructura detallada con company, location, salary
- Responsibilities y requirements como arrays
- Tags y flags (isActivelyHiring)

**`lib/messaging-data.ts`** - Conversaciones y mensajes
- 6 conversaciones
- 8 mensajes distribuidos
- Conversación 6 tiene thread completo (3 mensajes)

**`lib/notifications-data.ts`** - 8 notificaciones
- Tipos: profile_view, post_like, post_comment, job_alert, etc.
- Campos condicionales según tipo

**`lib/network-data.ts`** - Datos de red social
- 6 usuarios sugeridos
- 2 invitaciones
- NetworkStats: { connections: 532, groups: 12 }

**`lib/saved-data.ts`** - Items guardados
- 4 saved jobs (referencia jobs[0-3])
- 2 saved posts (referencia posts con autores)

**`lib/premium-data.ts`** - Features premium
- 5 features: Who viewed you, InMail, Featured Applicant, Badge, Learning

**`lib/randomuser.ts`** - Integración API externa
- Función: `fetchRandomUsers(count = 10)`
- Mapea respuesta de randomuser.me a tipo User
- Genera job titles y lastSeen aleatorios

---

#### 7. Utilidades

##### `lib/search-utils.ts`

**Propósito:** Utilidades de búsqueda y filtrado para posts.

**Funciones Exportadas:**

```typescript
// Búsqueda básica
searchPosts(posts: PostWithAuthor[], query: string): PostWithAuthor[]

// Búsqueda avanzada con opciones
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

**Lógica de Búsqueda:**
```typescript
// Búsqueda básica (case insensitive)
const lowerQuery = query.toLowerCase().trim()

return posts.filter(post => {
    const content = post.content?.toLowerCase() || ''
    const authorName = post.author?.name?.toLowerCase() || ''
    const title = post.author?.title?.toLowerCase() || ''
    
    return content.includes(lowerQuery) ||
           authorName.includes(lowerQuery) ||
           title.includes(lowerQuery)
})

// Ordenamiento por engagement
posts.sort((a, b) => {
    const engagementA = a.likes + a.comments + getTotalReactions(a)
    const engagementB = b.likes + b.comments + getTotalReactions(b)
    return engagementB - engagementA
})
```

**Patrones de Diseño:**
- Pure Functions: Sin efectos secundarios
- Strategy Pattern: Diferentes estrategias de ordenamiento
- Filter Chain: Filtrado → Ordenamiento → Límite
- Options Object: Parámetros opcionales como objeto

---

## Flujo de Interacción del Frontend

### 1. Flujo de Carga Inicial de la Aplicación

```
Usuario visita / (index.astro)
         ↓
┌────────────────────────────────────────┐
│    SERVER-SIDE (Astro Build Time)     │
├────────────────────────────────────────┤
│ 1. Fetch data from API layer          │
│    - getCurrentUser()                  │
│    - getUserSuggestions(3)             │
│    - import users from data.ts         │
│                                        │
│ 2. Render HTML con datos              │
│    - Layout.astro                      │
│    - Navbar                            │
│    - ProfileSidebar (currentUser)      │
│    - RightSidebar (suggestions)        │
│    - Feed container (vacío)            │
│    - CreatePostModal                   │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│    CLIENT-SIDE (Browser)               │
├────────────────────────────────────────┤
│ 3. JavaScript hydration                │
│    - initTheme() aplica tema           │
│    - initializePosts() carga storage   │
│    - loadAndRenderPosts()              │
│      • getPosts() desde localStorage   │
│      • renderFeed() genera HTML        │
│      • attachReactionHandlers()        │
│                                        │
│ 4. UI Interactive                      │
│    ✓ Feed cargado con posts            │
│    ✓ Reacciones funcionales            │
│    ✓ Modal de crear post listo         │
│    ✓ Navegación activa                 │
└────────────────────────────────────────┘
```

---

### 2. Flujo de Creación de Post

```
Usuario hace click en "Start a post"
         ↓
┌────────────────────────────────────────┐
│ 1. Abrir Modal                         │
├────────────────────────────────────────┤
│ • modal.classList.remove('hidden')     │
│ • textarea.focus()                     │
│ • Reset form state                     │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 2. Usuario escribe contenido          │
├────────────────────────────────────────┤
│ • textarea 'input' event               │
│ • Validar: hasContent || hasImage     │
│ • submitBtn.disabled = !isValid       │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 3. Usuario agrega imagen (opcional)   │
├────────────────────────────────────────┤
│ • Click en botón imagen                │
│ • fileInput.click()                    │
│ • FileReader lee archivo               │
│ • Muestra preview en modal             │
│ • Habilita botón submit                │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 4. Usuario presiona "Post"            │
├────────────────────────────────────────┤
│ • form submit event                    │
│ • Deshabilitar botón                   │
│ • Mostrar spinner: "Posting..."        │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 5. Crear Post en Storage              │
├────────────────────────────────────────┤
│ • await createPost({                   │
│     content: textarea.value,           │
│     image: imageData,                  │
│     userId: currentUser.id             │
│   })                                   │
│ • Post guardado en localStorage        │
│ • Recibe newPost con ID generado       │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 6. Actualización Optimista de UI      │
├────────────────────────────────────────┤
│ • createPostElement(newPost)           │
│ • postsContainer.prepend(postHTML)     │
│ • Animación fadeIn en nuevo post       │
│ • attachLikeHandlers() para nuevo post│
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 7. Cerrar Modal y Reset               │
├────────────────────────────────────────┤
│ • modal.classList.add('hidden')        │
│ • Limpiar textarea                     │
│ • Eliminar imagen preview              │
│ • Reset form state                     │
│ • ✓ Post visible en feed               │
└────────────────────────────────────────┘
```

---

### 3. Flujo de Reacción a Post

```
Usuario hace click en botón de reacción (like, clap, interesting)
         ↓
┌────────────────────────────────────────┐
│ 1. Event Delegation                   │
├────────────────────────────────────────┤
│ • Event bubble a document              │
│ • e.target.closest('.reaction-btn')    │
│ • Obtener postId y reactionType        │
│   desde data attributes                │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 2. Actualizar Estado de Reacción      │
├────────────────────────────────────────┤
│ • handleReaction(postId, reactionType) │
│   → Lógica en reactions.js:            │
│                                        │
│   Si ya tiene esta reacción:           │
│     • post.userReaction = null         │
│     • post.reactions[type]--           │
│                                        │
│   Si tiene otra reacción:              │
│     • post.reactions[old]--            │
│     • post.reactions[new]++            │
│     • post.userReaction = new          │
│                                        │
│   Si no tiene reacción:                │
│     • post.reactions[type]++           │
│     • post.userReaction = type         │
│                                        │
│ • updatePost() persiste en storage     │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 3. Actualizar UI                      │
├────────────────────────────────────────┤
│ • Cambiar color del botón:             │
│   - Active: text-blue-600              │
│   - Inactive: text-gray-600            │
│                                        │
│ • Cambiar icono del botón:             │
│   - Active: fill="currentColor"        │
│   - Inactive: fill="none"              │
│                                        │
│ • Actualizar contador de reacciones:   │
│   - getTotalReactions(post)            │
│   - Mostrar nuevo total                │
│                                        │
│ • Animar emoji:                        │
│   - animateReaction(element)           │
│   - Scale 1 → 1.2 → 1 (200ms)          │
└────────────────────────────────────────┘
         ↓
         ✓ UI actualizada
         ✓ Estado persistido
         ✓ Animación completada
```

---

### 4. Flujo de Edición de Perfil

```
Usuario hace click en "Edit" en sección Bio
         ↓
┌────────────────────────────────────────┐
│ 1. Activar Modo Edición               │
├────────────────────────────────────────┤
│ • toggleEditMode('bio')                │
│ • editMode.bio = true                  │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 2. Re-renderizar Sección              │
├────────────────────────────────────────┤
│ • renderBio(container)                 │
│ • Detecta editMode.bio === true        │
│ • Genera HTML con textarea:            │
│   <textarea id="bio-textarea">         │
│     {currentBio}                       │
│   </textarea>                          │
│   <button id="save-bio">Save</button>  │
│   <button id="cancel-bio">Cancel</button>│
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 3. Usuario edita texto                │
├────────────────────────────────────────┤
│ • Usuario modifica contenido           │
│ • Sin validación en tiempo real        │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 4. Usuario hace click en "Save"       │
├────────────────────────────────────────┤
│ • Click event en #save-bio             │
│ • Leer valor de textarea               │
│ • updateBio(newBioText)                │
│   → storageService persiste cambio     │
│ • toggleEditMode('bio') → false        │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 5. Re-renderizar en Vista Mode        │
├────────────────────────────────────────┤
│ • renderBio(container)                 │
│ • Detecta editMode.bio === false       │
│ • Genera HTML de solo lectura:         │
│   <p>{updatedBio}</p>                  │
│   <button id="edit-bio">Edit</button>  │
│ • ✓ Cambios visibles y guardados       │
└────────────────────────────────────────┘

Flujo alternativo (Cancel):
         ↓
┌────────────────────────────────────────┐
│ Usuario hace click en "Cancel"        │
├────────────────────────────────────────┤
│ • toggleEditMode('bio') → false        │
│ • renderBio(container)                 │
│ • Muestra bio original sin cambios     │
└────────────────────────────────────────┘
```

---

### 5. Flujo de Cambio de Tema

```
Usuario hace click en botón de tema en Navbar
         ↓
┌────────────────────────────────────────┐
│ 1. Click Event                        │
├────────────────────────────────────────┤
│ • themeToggle.addEventListener('click')│
│ • Llamar toggleTheme()                 │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 2. Determinar Nuevo Tema              │
├────────────────────────────────────────┤
│ • currentTheme = getTheme()            │
│ • newTheme = currentTheme === 'light'  │
│              ? 'dark' : 'light'        │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 3. Aplicar Tema al DOM                │
├────────────────────────────────────────┤
│ • setTheme(newTheme)                   │
│                                        │
│   Si dark:                             │
│     document.documentElement           │
│       .classList.add('dark')           │
│                                        │
│   Si light:                            │
│     document.documentElement           │
│       .classList.remove('dark')        │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 4. Persistir Preferencia              │
├────────────────────────────────────────┤
│ • localStorage.setItem(                │
│     'linkedin-lite-theme',             │
│     newTheme                           │
│   )                                    │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 5. CSS Reactivo Automático            │
├────────────────────────────────────────┤
│ • Tailwind detecta clase 'dark'        │
│ • Aplica todas las clases dark:*       │
│ • Transiciones CSS suaves (200ms):     │
│   - background-color                   │
│   - color                              │
│   - border-color                       │
│ • Variables CSS actualizadas:          │
│   --bg-primary, --text-primary, etc.   │
│                                        │
│ ✓ Tema cambiado en toda la app         │
│ ✓ Preferencia guardada                 │
└────────────────────────────────────────┘
```

---

### 6. Flujo de Búsqueda

```
Usuario escribe en barra de búsqueda del Navbar
         ↓
┌────────────────────────────────────────┐
│ 1. Formulario de Búsqueda             │
├────────────────────────────────────────┤
│ • <form action="/search">              │
│ • <input name="q" />                   │
│ • Usuario escribe query                │
│ • Usuario presiona Enter o click 🔍    │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 2. Navegación a /search?q=query       │
├────────────────────────────────────────┤
│ • Form submit → GET /search?q=query    │
│ • Astro routing a search.astro         │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 3. SERVER-SIDE (search.astro)         │
├────────────────────────────────────────┤
│ • Obtener query de URL params:         │
│   const query = Astro.url.searchParams │
│     .get('q') || ''                    │
│                                        │
│ • Si query existe:                     │
│   - results = await searchPosts(query) │
│   - Filtrar posts que coincidan        │
│                                        │
│ • Si query vacío:                      │
│   - results = []                       │
│   - Mostrar mensaje                    │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 4. Renderizar Resultados              │
├────────────────────────────────────────┤
│ • <SearchResults                       │
│     searchQuery={query}                │
│     posts={results}                    │
│   />                                   │
│                                        │
│ • Si results.length > 0:               │
│   - Mostrar "X results for 'query'"    │
│   - Renderizar cada post con <Post />  │
│                                        │
│ • Si results.length === 0:             │
│   - Icono de búsqueda vacío            │
│   - "No results found for 'query'"     │
│   - Link "vuelve al feed"              │
└────────────────────────────────────────┘
         ↓
         ✓ Resultados mostrados
         ✓ Usuario puede volver al feed
         ✓ Cada post es clickeable
```

---

### 7. Flujo de Navegación entre Páginas

```
Usuario hace click en link de navegación (ej: "Jobs")
         ↓
┌────────────────────────────────────────┐
│ 1. Click en <a href="/jobs">          │
├────────────────────────────────────────┤
│ • Navegación estándar del navegador    │
│ • GET /jobs                            │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 2. Astro File-Based Routing           │
├────────────────────────────────────────┤
│ • /jobs → pages/jobs/index.astro       │
│ • /jobs/123 → pages/jobs/[id].astro    │
│ • /messages → pages/messages/index.astro│
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 3. SERVER-SIDE Render                 │
├────────────────────────────────────────┤
│ • Fetch data necesaria:                │
│   - jobs = await getJobs()             │
│   - currentUser = await getCurrentUser()│
│                                        │
│ • Render HTML completo:                │
│   - Layout.astro                       │
│   - Navbar (persiste)                  │
│   - Contenido específico de la página  │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ 4. CLIENT-SIDE Hydration              │
├────────────────────────────────────────┤
│ • JavaScript de componentes se ejecuta │
│ • Event listeners se adjuntan          │
│ • Estado local se inicializa           │
│ • Tema se aplica (initTheme)           │
└────────────────────────────────────────┘
         ↓
         ✓ Nueva página cargada
         ✓ Navbar se mantiene
         ✓ Interactividad restaurada
```

---

### 8. Flujo de Datos General

```
┌─────────────────────────────────────────────────────────┐
│                    USER INTERACTION                      │
│  • Click, Type, Submit, Scroll, etc.                    │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   EVENT HANDLERS                         │
│  • Component Scripts (inline <script>)                  │
│  • Módulos JS (feed.js, profile.js, theme.js)          │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  BUSINESS LOGIC                          │
│  • Validación                                           │
│  • Transformación de datos                              │
│  • Cálculos (ej: getTotalReactions)                     │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                  DATA PERSISTENCE                        │
│  • storageService.js → localStorage                     │
│  • Estructura:                                          │
│    - 'linkedin-lite-posts'                              │
│    - 'linkedin-lite-profile'                            │
│    - 'linkedin-lite-theme'                              │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    UI UPDATE                             │
│  • Optimistic UI (inmediata)                            │
│  • Re-render parcial (innerHTML)                        │
│  • Class toggles (dark mode)                            │
│  • Animaciones CSS                                      │
└─────────────────────────────────────────────────────────┘
                           ↓
                   ✓ UI actualizada
                   ✓ Estado persistido
```

---

## Sistema de Estilos

### Variables CSS y Design Tokens

**Archivo:** `src/styles/global.css`

#### Variables de Tema

```css
:root {
  /* Light Mode */
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

.dark {
  /* Dark Mode */
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

#### Colores LinkedIn

```css
@theme {
  /* Primary Colors */
  --color-linkedin-blue: #0a66c2;
  --color-linkedin-blue-hover: #004182;
  --color-linkedin-blue-light: #378fe9;

  /* Neutral Colors */
  --color-neutral-50: #f8f9fa;
  --color-neutral-100: #f3f2ef;
  --color-neutral-200: #e8e6e3;
  --color-neutral-300: #d3d1ce;
  --color-neutral-400: #a8a6a3;
  --color-neutral-500: #666666;
  --color-neutral-600: #54524f;
  --color-neutral-700: #38352f;
  --color-neutral-800: #1d1d1b;
  --color-neutral-900: #000000;

  /* Semantic Colors */
  --color-success: #057642;
  --color-error: #cc1016;
  --color-warning: #f5c75d;
}
```

#### Transiciones Globales

```css
* {
  transition: background-color 200ms ease-in-out,
              color 200ms ease-in-out,
              border-color 200ms ease-in-out;
}
```

---

### Animaciones CSS

#### Reacción Bounce

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

#### Feed Transition

```css
#posts-container {
  transition: opacity 300ms ease-in-out;
}

.post-item {
  transition: all 300ms ease-in-out;
}
```

#### Reaction Button Effects

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

---

### TailwindCSS Integration

#### Configuración Básica

```javascript
// astro.config.mjs
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  integrations: [tailwind()]
})
```

#### Clases Comunes Utilizadas

**Layout:**
```css
/* Containers */
max-w-7xl mx-auto px-4 py-6

/* Grid responsivo */
grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6

/* Flex */
flex items-center gap-3
flex-1 min-w-0
```

**Cards:**
```css
/* Card básica */
bg-white dark:bg-gray-900
rounded-lg
border border-gray-200 dark:border-gray-700
p-4

/* Card con hover */
hover:shadow-md transition
```

**Buttons:**
```css
/* Button primario */
bg-blue-600 hover:bg-blue-700
text-white
rounded-full
px-4 py-2
transition

/* Button secundario */
border border-gray-300
hover:border-gray-400
text-gray-700
rounded-full
```

**Typography:**
```css
/* Títulos */
font-semibold text-gray-900 dark:text-white

/* Texto secundario */
text-sm text-gray-600 dark:text-gray-400

/* Truncate */
truncate
line-clamp-2
line-clamp-3
```

**Dark Mode:**
```css
/* Todos los componentes usan dark: variants */
bg-white dark:bg-gray-900
text-gray-900 dark:text-white
border-gray-200 dark:border-gray-700
```

---

### Utilidades CSS Custom

#### Line Clamp

```css
/* Implementado en varios componentes */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

---

## Patrones de Diseño

### 1. Patrones Arquitectónicos

#### Layered Architecture (Arquitectura en Capas)
```
Presentation Layer (Astro Components)
         ↓
Business Logic Layer (lib/*.js)
         ↓
API Layer (lib/api/index.ts)
         ↓
Data Layer (storageService, *-data.ts)
```

**Beneficios:**
- Separación clara de responsabilidades
- Fácil de testear cada capa
- Permite reemplazar implementaciones (ej: localStorage → API real)

---

#### Module Pattern
Todos los archivos JavaScript usan ES6 modules con exports explícitos.

```javascript
// feed.js
export function renderPost(post, author) { ... }
export function sortPosts(posts, sortBy) { ... }
export function attachReactionHandlers() { ... }

// Usage
import { renderPost, sortPosts } from './feed.js'
```

**Beneficios:**
- Encapsulación
- Namespace management
- Tree-shaking automático

---

#### Repository Pattern
Los storageService files abstraen la persistencia de datos.

```javascript
// profile/storageService.js
export function getProfile() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY))
}

export function saveProfile(profile) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
}

// Fácil cambio a API real:
export async function getProfile() {
    const response = await fetch('/api/profile')
    return response.json()
}
```

**Beneficios:**
- Abstracción de la fuente de datos
- Fácil migración a backend real
- Testing simplificado con mocks

---

### 2. Patrones de UI

#### Component Composition
Los componentes Astro se componen para crear páginas completas.

```astro
<!-- index.astro -->
<Layout>
    <Navbar />
    <main>
        <ProfileSidebar user={currentUser} />
        <div>
            <Post post={post} author={author} />
            <Post post={post2} author={author2} />
        </div>
        <RightSidebar suggestions={suggestions} />
    </main>
</Layout>
```

**Beneficios:**
- Reutilización de código
- Consistencia visual
- Mantenimiento simplificado

---

#### Optimistic UI
Actualiza la UI inmediatamente antes de confirmar con storage.

```javascript
// CreatePostModal.astro
async function submitPost() {
    // 1. Actualizar UI inmediatamente
    const newPostElement = createPostElement(postData)
    postsContainer.prepend(newPostElement)
    
    // 2. Persistir después
    try {
        await createPost(postData)
    } catch (error) {
        // Revertir en caso de error
        newPostElement.remove()
    }
}
```

**Beneficios:**
- UI se siente instantánea
- Mejor experiencia de usuario
- Reduce percepción de latencia

---

#### Event Delegation
Usa event bubbling para manejar eventos de múltiples elementos.

```javascript
// Malo: Múltiples listeners
document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', handler) // N listeners
})

// Bueno: Event delegation
document.addEventListener('click', (e) => {
    const btn = e.target.closest('.like-btn')
    if (btn) handler(btn) // 1 listener
})
```

**Beneficios:**
- Menos memory usage
- Funciona con elementos dinámicos
- Mejor performance

---

#### Render Props Pattern
Funciones reciben containers y renderizan en ellos.

```javascript
// profile.js
export function renderBio(container) {
    const profile = getProfile()
    const html = editMode.bio
        ? `<textarea>${profile.bio}</textarea>`
        : `<p>${profile.bio}</p>`
    
    container.innerHTML = html
    attachEventListeners()
}

// Usage
const bioContainer = document.getElementById('bio-container')
renderBio(bioContainer)
```

**Beneficios:**
- Flexibilidad
- Testing fácil
- Reutilización

---

### 3. Patrones de Estado

#### State Machine
Sistema de reacciones implementa máquina de estados.

```javascript
// Estado inicial: no reaction
// Transiciones:
//   - click like → liked
//   - click like again → no reaction
//   - click clap while liked → clapped (y unlike)

function handleReaction(postId, type) {
    if (post.userReaction === type) {
        // Transition: type → none
        post.userReaction = null
        post.reactions[type]--
    } else if (post.userReaction) {
        // Transition: oldType → newType
        post.reactions[post.userReaction]--
        post.userReaction = type
        post.reactions[type]++
    } else {
        // Transition: none → type
        post.userReaction = type
        post.reactions[type]++
    }
}
```

---

#### Single Source of Truth
localStorage es la única fuente de verdad para datos persistentes.

```javascript
// Siempre leer de storage
function renderFeed() {
    const posts = getPosts() // Desde localStorage
    posts.forEach(renderPost)
}

// Siempre escribir a storage
function createPost(postData) {
    const posts = getPosts()
    posts.push(postData)
    savePosts(posts) // A localStorage
}
```

**Beneficios:**
- Consistencia de datos
- Fácil debugging
- State predictable

---

### 4. Patrones de Datos

#### Data Enrichment
API layer combina datos relacionales.

```typescript
// api/index.ts
export async function getPosts(): Promise<PostWithAuthor[]> {
    const posts = postsData
    const users = usersData
    
    return posts.map(post => ({
        ...post,
        author: users.find(u => u.id === post.userId)
    }))
}
```

**Beneficios:**
- Datos completos para UI
- Menos lookups en componentes
- Mejor type safety

---

#### Adapter Pattern
`randomuser.ts` adapta API externa a tipos internos.

```typescript
export async function fetchRandomUsers(count = 10): Promise<User[]> {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`)
    const data = await response.json()
    
    // Mapear estructura externa a interna
    return data.results.map(user => ({
        id: user.login.uuid,
        name: `${user.name.first} ${user.name.last}`,
        avatar: user.picture.large,
        // ... más mappings
    }))
}
```

**Beneficios:**
- Desacoplamiento de APIs externas
- Tipos consistentes internamente
- Fácil cambio de provider

---

### 5. Patrones de Performance

#### Lazy Loading
Imágenes se cargan solo cuando son visibles.

```astro
<img
    src={user.avatar}
    loading="lazy"
    alt={user.name}
/>
```

---

#### Code Splitting
Astro automáticamente hace code splitting por ruta.

```
/                → index-[hash].js
/jobs            → jobs-[hash].js
/messages        → messages-[hash].js
```

---

#### CSS Transitions (no JavaScript)
Preferir animaciones CSS sobre JavaScript.

```css
/* Malo: JavaScript */
element.style.opacity = '0'
setTimeout(() => {
    element.style.opacity = '1'
}, 100)

/* Bueno: CSS */
.element {
    opacity: 0;
    transition: opacity 300ms;
}
.element.visible {
    opacity: 1;
}
```

---

## Resumen de Mejores Prácticas

### ✅ Implementadas en el Proyecto

1. **Separation of Concerns** - Capas claramente separadas
2. **Component Reusability** - 22 componentes reutilizables
3. **Type Safety** - TypeScript en archivos críticos
4. **Dark Mode** - Soporte completo con persistencia
5. **Responsive Design** - Mobile-first con Tailwind
6. **Accessibility** - ARIA labels y semantic HTML
7. **Performance** - Lazy loading, code splitting, CSS animations
8. **State Management** - Single source of truth (localStorage)
9. **Event Delegation** - Minimiza listeners
10. **Optimistic UI** - UI instantánea

### 🔧 Oportunidades de Mejora

1. **TypeScript Migration** - Convertir todos los .js a .ts
2. **Error Boundaries** - Manejo más robusto de errores
3. **Testing** - Unit tests y E2E tests
4. **Validation** - Zod para validación de datos
5. **State Library** - Considerar signals/observables
6. **API Real** - Migrar de localStorage a backend
7. **Internationalization** - i18n para múltiples idiomas
8. **Analytics** - Tracking de eventos y métricas
9. **SEO** - Meta tags optimizados por página
10. **PWA** - Service workers para funcionalidad offline

---

*Documentación generada: Marzo 2026 | LinkedIn-lite Frontend v1.0*