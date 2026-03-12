# LinkedIn Lite - Arquitectura del Sistema

Este documento contiene diagramas visuales que muestran la arquitectura, flujo de datos y estructura del proyecto LinkedIn Lite.

## Tabla de Contenidos

- [Diagrama de Flujo de la Aplicación](#diagrama-de-flujo-de-la-aplicación)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Interacción entre Módulos](#interacción-entre-módulos)
- [Flujo de Datos](#flujo-de-datos)
- [Arquitectura por Capas](#arquitectura-por-capas)
- [Flujos de Usuario Principales](#flujos-de-usuario-principales)

---

## Diagrama de Flujo de la Aplicación

Este diagrama muestra el flujo principal de navegación y las páginas clave de la aplicación.

```mermaid
flowchart TD
    Start([Usuario ingresa]) --> Index[/index.astro<br/>Feed Principal/]
    
    Index --> Feed{Acciones del Feed}
    Feed --> CreatePost[Crear Publicación]
    Feed --> React[Dar Reacciones]
    Feed --> Comment[Comentar]
    Feed --> SortFilter[Filtrar/Ordenar]
    
    CreatePost --> UpdateFeed[Actualizar Feed]
    React --> UpdateFeed
    Comment --> UpdateFeed
    UpdateFeed --> Index
    
    Index --> Nav{Navegación Principal}
    
    Nav --> Profile[/profile.astro<br/>Mi Perfil/]
    Nav --> Jobs[/jobs/index.astro<br/>Empleos/]
    Nav --> Messages[/messages/index.astro<br/>Mensajes/]
    Nav --> Network[/network/index.astro<br/>Red/]
    Nav --> Notifications[/notifications.astro<br/>Notificaciones/]
    Nav --> Search[/search.astro<br/>Búsqueda/]
    
    Profile --> EditProfile{Editar Perfil}
    EditProfile --> EditBio[Editar Biografía]
    EditProfile --> EditSkills[Gestionar Habilidades]
    EditProfile --> EditExp[Gestionar Experiencia]
    EditBio --> SaveProfile[Guardar Cambios]
    EditSkills --> SaveProfile
    EditExp --> SaveProfile
    SaveProfile --> Profile
    
    Jobs --> JobDetail[/jobs/[id].astro<br/>Detalle del Empleo/]
    JobDetail --> Apply[Aplicar al Empleo]
    JobDetail --> SaveJob[Guardar Empleo]
    Apply --> Jobs
    SaveJob --> Saved[/saved.astro<br/>Guardados/]
    
    Messages --> ChatDetail[/messages/[id].astro<br/>Conversación/]
    ChatDetail --> SendMsg[Enviar Mensaje]
    SendMsg --> ChatDetail
    
    Network --> Invitations[/network/invitations.astro<br/>Invitaciones/]
    Invitations --> AcceptReject[Aceptar/Rechazar]
    AcceptReject --> Network
    
    Search --> SearchResults[Mostrar Resultados]
    SearchResults --> FilterResults[Filtrar Resultados]
    FilterResults --> SearchResults
    
    Nav --> Premium[/premium.astro<br/>Premium/]
    Nav --> Saved
    
    style Index fill:#4a90e2
    style Profile fill:#7b68ee
    style Jobs fill:#50c878
    style Messages fill:#ff6b6b
    style Network fill:#ffa500
    style Notifications fill:#ff69b4
    style Search fill:#20b2aa
```

---

## Estructura de Carpetas

Este diagrama muestra la organización completa del proyecto.

```mermaid
graph TD
    Root[linkedIn-lite/] --> Src[src/]
    Root --> Docs[docs/]
    Root --> Public[public/]
    Root --> Config[Archivos Config]
    
    Config --> Package[package.json]
    Config --> Astro[astro.config.mjs]
    Config --> TS[tsconfig.json]
    Config --> Git[.gitignore]
    
    Src --> Components[components/]
    Src --> Pages[pages/]
    Src --> Lib[lib/]
    Src --> Services[services/]
    Src --> Types[types/]
    Src --> Layouts[layouts/]
    Src --> Styles[styles/]
    
    Components --> CompNav[Navigation/<br/>4 componentes]
    Components --> CompFeed[Feed/<br/>3 componentes]
    Components --> CompProfile[Profile/<br/>3 componentes]
    Components --> CompJobs[Jobs/<br/>2 componentes]
    Components --> CompMsg[Messaging/<br/>2 componentes]
    Components --> CompNet[Networking/<br/>2 componentes]
    Components --> CompNotif[Notifications/<br/>1 componente]
    Components --> CompUtil[Utilities/<br/>5 componentes]
    
    Pages --> PagesMain[Páginas Principales]
    Pages --> PagesJobs[jobs/<br/>index + [id]]
    Pages --> PagesMsg[messages/<br/>index + [id]]
    Pages --> PagesNet[network/<br/>index + invitations]
    
    PagesMain --> Index[index.astro]
    PagesMain --> Profile[profile.astro]
    PagesMain --> Search[search.astro]
    PagesMain --> Notif[notifications.astro]
    PagesMain --> Saved[saved.astro]
    PagesMain --> Premium[premium.astro]
    
    Lib --> LibFeed[feed/<br/>3 módulos]
    Lib --> LibProfile[profile/<br/>2 módulos]
    Lib --> LibTheme[theme/<br/>1 módulo]
    Lib --> LibAPI[api/<br/>index.ts]
    Lib --> LibData[Archivos de datos<br/>7 archivos]
    
    LibFeed --> FeedJS[feed.js]
    LibFeed --> ReactJS[reactions.js]
    LibFeed --> FeedStorage[storageService.js]
    
    LibProfile --> ProfileJS[profile.js]
    LibProfile --> ProfileStorage[storageService.js]
    
    LibData --> DataMain[data.ts]
    LibData --> JobsData[jobs-data.ts]
    LibData --> MsgData[messaging-data.ts]
    LibData --> NetData[network-data.ts]
    LibData --> NotifData[notifications-data.ts]
    LibData --> SavedData[saved-data.ts]
    LibData --> PremData[premium-data.ts]
    
    Services --> Storage[storageService.ts]
    
    Types --> TypesIndex[index.ts<br/>20+ interfaces]
    Types --> TypesEnv[env.d.ts]
    
    Layouts --> LayoutMain[Layout.astro]
    
    Styles --> GlobalCSS[global.css]
    
    Docs --> DocOverview[project-overview.md]
    Docs --> DocFrontend[frontend.md]
    Docs --> DocComponents[components.md]
    Docs --> DocArch[architecture.md]
    
    Public --> Assets[Imágenes/Favicons]
    
    style Src fill:#4a90e2
    style Components fill:#7b68ee
    style Pages fill:#50c878
    style Lib fill:#ff6b6b
    style Docs fill:#ffa500
```

---

## Interacción entre Módulos

Este diagrama muestra cómo los diferentes módulos del sistema interactúan entre sí.

```mermaid
graph TB
    subgraph "Capa de Presentación"
        Pages[Páginas Astro<br/>22 páginas]
        Components[Componentes Astro<br/>22 componentes]
        Layout[Layout.astro]
    end
    
    subgraph "Capa de Lógica de Negocio"
        FeedModule[Módulo Feed<br/>feed.js]
        ReactModule[Módulo Reacciones<br/>reactions.js]
        ProfileModule[Módulo Perfil<br/>profile.js]
        ThemeModule[Módulo Tema<br/>theme.js]
        ClientInit[Inicialización<br/>clientInit.ts]
    end
    
    subgraph "Capa de API"
        API[API Mock<br/>api/index.ts<br/>17 funciones]
    end
    
    subgraph "Capa de Datos"
        MockDB[Base de Datos Mock<br/>data.ts]
        JobsData[jobs-data.ts]
        MsgData[messaging-data.ts]
        NetData[network-data.ts]
        NotifData[notifications-data.ts]
        SavedData[saved-data.ts]
        PremData[premium-data.ts]
    end
    
    subgraph "Capa de Servicios"
        StorageService[Storage Service<br/>storageService.ts]
        FeedStorage[Feed Storage<br/>feed/storageService.js]
        ProfileStorage[Profile Storage<br/>profile/storageService.js]
    end
    
    subgraph "Tipos"
        Types[TypeScript Types<br/>types/index.ts]
    end
    
    Pages --> Components
    Pages --> Layout
    Components --> Layout
    
    Pages --> FeedModule
    Pages --> ProfileModule
    Pages --> ThemeModule
    Components --> FeedModule
    Components --> ReactModule
    Components --> ProfileModule
    
    Pages --> ClientInit
    ClientInit --> FeedModule
    ClientInit --> ThemeModule
    
    FeedModule --> API
    ReactModule --> API
    ProfileModule --> API
    
    FeedModule --> FeedStorage
    ProfileModule --> ProfileStorage
    
    API --> MockDB
    API --> JobsData
    API --> MsgData
    API --> NetData
    API --> NotifData
    API --> SavedData
    API --> PremData
    
    FeedStorage --> StorageService
    ProfileStorage --> StorageService
    StorageService --> LocalStorage[(localStorage)]
    
    Types -.-> Pages
    Types -.-> Components
    Types -.-> FeedModule
    Types -.-> ProfileModule
    Types -.-> API
    Types -.-> MockDB
    
    style Pages fill:#4a90e2
    style Components fill:#7b68ee
    style API fill:#50c878
    style MockDB fill:#ff6b6b
    style StorageService fill:#ffa500
    style Types fill:#20b2aa
```

---

## Flujo de Datos

Este diagrama muestra cómo fluyen los datos a través de la aplicación.

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as Interfaz UI<br/>(Páginas/Componentes)
    participant Module as Módulo de Lógica<br/>(feed.js, profile.js)
    participant API as Capa API<br/>(api/index.ts)
    participant Data as Datos Mock<br/>(data.ts, *-data.ts)
    participant Storage as localStorage
    
    Note over Usuario,Storage: Flujo de Lectura (Carga Inicial)
    
    Usuario->>UI: Carga página
    UI->>Module: Inicializa módulo
    Module->>API: Solicita datos (ej: getPosts())
    API->>Data: Lee datos mock
    Data-->>API: Retorna datos
    API->>Storage: Lee datos persistidos
    Storage-->>API: Retorna datos guardados
    API-->>Module: Retorna datos combinados
    Module-->>UI: Actualiza interfaz
    UI-->>Usuario: Muestra contenido
    
    Note over Usuario,Storage: Flujo de Escritura (Crear/Actualizar)
    
    Usuario->>UI: Acción (ej: crear post)
    UI->>Module: Llama función (ej: createPost())
    Module->>UI: Actualización optimista (UI)
    Module->>API: Envía datos (createPost(data))
    API->>Data: Actualiza datos en memoria
    API->>Storage: Persiste en localStorage
    Storage-->>API: Confirmación
    API-->>Module: Retorna resultado
    Module->>UI: Actualiza UI final
    UI-->>Usuario: Muestra confirmación
    
    Note over Usuario,Storage: Flujo de Eliminación
    
    Usuario->>UI: Eliminar item
    UI->>Module: deleteItem(id)
    Module->>UI: Actualización optimista
    Module->>API: deleteItem(id)
    API->>Data: Elimina de memoria
    API->>Storage: Elimina de localStorage
    Storage-->>API: Confirmación
    API-->>Module: Éxito
    Module-->>UI: Confirma eliminación
    UI-->>Usuario: Item eliminado
```

---

## Arquitectura por Capas

Este diagrama muestra la arquitectura en capas del sistema y las dependencias entre ellas.

```mermaid
graph BT
    subgraph "L1: Persistencia"
        LS[localStorage<br/>Navegador]
    end
    
    subgraph "L2: Servicios de Almacenamiento"
        SS[storageService.ts<br/>Operaciones CRUD<br/>localStorage]
        FSS[feed/storageService.js<br/>Gestión Feed]
        PSS[profile/storageService.js<br/>Gestión Perfil]
    end
    
    subgraph "L3: Fuentes de Datos"
        MockDB[data.ts<br/>Base de datos mock<br/>posts, users, comments]
        JobsD[jobs-data.ts<br/>Listado empleos]
        MsgD[messaging-data.ts<br/>Conversaciones]
        NetD[network-data.ts<br/>Conexiones]
        NotifD[notifications-data.ts<br/>Notificaciones]
        SavedD[saved-data.ts<br/>Guardados]
        PremD[premium-data.ts<br/>Features Premium]
    end
    
    subgraph "L4: Capa API"
        API[api/index.ts<br/>17 funciones API<br/>getPosts, createPost,<br/>updateProfile, etc.]
    end
    
    subgraph "L5: Lógica de Negocio"
        Feed[feed.js<br/>Lógica feed<br/>reorder, filter]
        React[reactions.js<br/>Sistema reacciones]
        Prof[profile.js<br/>Gestión perfil<br/>CRUD skills/exp]
        Theme[theme.js<br/>Dark/Light mode]
        Init[clientInit.ts<br/>Inicialización]
    end
    
    subgraph "L6: Componentes Reutilizables"
        Nav[Navigation Components]
        FeedC[Feed Components]
        ProfC[Profile Components]
        JobsC[Jobs Components]
        MsgC[Messaging Components]
        NetC[Network Components]
        NotifC[Notification Components]
        Util[Utility Components]
    end
    
    subgraph "L7: Páginas"
        Index[index.astro]
        Profile[profile.astro]
        Jobs[jobs/*.astro]
        Messages[messages/*.astro]
        Network[network/*.astro]
        Other[Otras páginas]
    end
    
    subgraph "L8: Layout"
        Layout[Layout.astro<br/>Estructura común]
    end
    
    SS --> LS
    FSS --> LS
    PSS --> LS
    
    API --> MockDB
    API --> JobsD
    API --> MsgD
    API --> NetD
    API --> NotifD
    API --> SavedD
    API --> PremD
    API --> SS
    
    Feed --> API
    React --> API
    Prof --> API
    Feed --> FSS
    Prof --> PSS
    
    Init --> Feed
    Init --> Theme
    
    Nav --> Theme
    FeedC --> Feed
    FeedC --> React
    ProfC --> Prof
    
    Index --> FeedC
    Index --> Nav
    Profile --> ProfC
    Profile --> Nav
    Jobs --> JobsC
    Jobs --> Nav
    Messages --> MsgC
    Messages --> Nav
    Network --> NetC
    Network --> Nav
    Other --> Util
    Other --> Nav
    
    Index --> Layout
    Profile --> Layout
    Jobs --> Layout
    Messages --> Layout
    Network --> Layout
    Other --> Layout
    
    style L1 fill:#ff6b6b
    style L2 fill:#ffa500
    style L3 fill:#ffd700
    style L4 fill:#50c878
    style L5 fill:#4a90e2
    style L6 fill:#7b68ee
    style L7 fill:#ff69b4
    style L8 fill:#20b2aa
```

---

## Flujos de Usuario Principales

### 1. Crear una Publicación

```mermaid
sequenceDiagram
    actor Usuario
    participant PostForm as Formulario Post<br/>(CreatePost.astro)
    participant FeedJS as feed.js
    participant API as api/index.ts
    participant MockDB as data.ts
    participant Storage as feed/storageService.js
    participant UI as Feed UI
    
    Usuario->>PostForm: Escribe contenido y click "Publicar"
    PostForm->>FeedJS: handleSubmit(content, image)
    FeedJS->>API: createPost({ content, image })
    API->>MockDB: Agrega post a array posts
    API->>Storage: saveToStorage(posts)
    Storage->>localStorage: Persiste datos
    localStorage-->>Storage: OK
    Storage-->>API: OK
    API-->>FeedJS: Retorna nuevo post
    FeedJS->>UI: Actualiza feed con nuevo post
    UI-->>Usuario: Muestra nuevo post
    PostForm->>PostForm: Limpia formulario
```

### 2. Dar una Reacción

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as Post UI
    participant ReactJS as reactions.js
    participant API as api/index.ts
    participant MockDB as data.ts
    participant Storage as storageService.js
    
    Usuario->>UI: Click botón reacción (like/clap/insightful)
    UI->>ReactJS: handleReaction(postId, reactionType)
    ReactJS->>ReactJS: Validación usuario autenticado
    ReactJS->>UI: Actualización optimista (incrementa contador)
    ReactJS->>API: addReaction(postId, reactionType, userId)
    API->>MockDB: Busca post por ID
    API->>MockDB: Agrega reacción a post.reactions
    API->>Storage: Persiste cambios
    Storage-->>API: OK
    API-->>ReactJS: Retorna post actualizado
    ReactJS->>UI: Actualiza UI con datos finales
    UI-->>Usuario: Muestra reacción actualizada
    
    Note over Usuario,Storage: Si usuario ya reaccionó con ese tipo
    ReactJS->>API: removeReaction(postId, reactionType, userId)
    API->>MockDB: Elimina reacción
    API->>Storage: Persiste cambios
    Storage-->>API: OK
    API-->>ReactJS: Post actualizado
    ReactJS->>UI: Decrementa contador
```

### 3. Editar Perfil (Agregar Habilidad)

```mermaid
sequenceDiagram
    actor Usuario
    participant UI as Profile UI<br/>(EditSkills.astro)
    participant ProfJS as profile.js
    participant API as api/index.ts
    participant MockDB as data.ts
    participant Storage as profile/storageService.js
    
    Usuario->>UI: Click "Agregar habilidad"
    UI->>UI: Muestra modal
    Usuario->>UI: Ingresa nombre habilidad
    Usuario->>UI: Click "Guardar"
    UI->>ProfJS: addSkill(skillName)
    ProfJS->>ProfJS: Validación (no vacío)
    ProfJS->>API: updateProfile(userId, { skills: [...] })
    API->>MockDB: Busca usuario por ID
    API->>MockDB: Actualiza user.skills
    API->>Storage: saveProfile(updatedUser)
    Storage->>localStorage: Persiste perfil
    localStorage-->>Storage: OK
    Storage-->>API: OK
    API-->>ProfJS: Retorna perfil actualizado
    ProfJS->>UI: Re-renderiza lista habilidades
    UI->>UI: Cierra modal
    UI-->>Usuario: Muestra habilidad agregada
```

### 4. Aplicar a un Empleo

```mermaid
sequenceDiagram
    actor Usuario
    participant JobsPage as jobs/[id].astro
    participant API as api/index.ts
    participant JobsData as jobs-data.ts
    participant Storage as storageService.ts
    participant UI as Jobs UI
    
    Usuario->>JobsPage: Navega a detalle empleo
    JobsPage->>API: getJobById(jobId)
    API->>JobsData: Busca empleo por ID
    JobsData-->>API: Retorna empleo
    API-->>JobsPage: Empleo encontrado
    JobsPage-->>Usuario: Muestra detalles
    
    Usuario->>UI: Click "Aplicar"
    UI->>API: applyToJob(jobId, userId)
    API->>JobsData: Actualiza job.applicants
    API->>Storage: Persiste aplicación
    Storage->>localStorage: Guarda datos
    localStorage-->>Storage: OK
    Storage-->>API: OK
    API-->>UI: Aplicación exitosa
    UI->>UI: Cambia botón a "Aplicado"
    UI->>UI: Incrementa contador aplicantes
    UI-->>Usuario: Confirmación visual
```

### 5. Enviar Mensaje

```mermaid
sequenceDiagram
    actor Usuario
    participant ChatPage as messages/[id].astro
    participant API as api/index.ts
    participant MsgData as messaging-data.ts
    participant Storage as storageService.ts
    participant UI as Chat UI
    
    Usuario->>ChatPage: Selecciona conversación
    ChatPage->>API: getConversation(conversationId)
    API->>MsgData: Busca conversación
    MsgData-->>API: Retorna mensajes
    API-->>ChatPage: Conversación cargada
    ChatPage-->>Usuario: Muestra chat
    
    Usuario->>UI: Escribe mensaje
    Usuario->>UI: Click "Enviar"
    UI->>API: sendMessage(conversationId, message)
    API->>MsgData: Agrega mensaje a conversation.messages
    API->>MsgData: Actualiza lastMessage
    API->>MsgData: Actualiza timestamp
    API->>Storage: Persiste conversación
    Storage->>localStorage: Guarda cambios
    localStorage-->>Storage: OK
    Storage-->>API: OK
    API-->>UI: Mensaje enviado
    UI->>UI: Agrega mensaje al chat
    UI->>UI: Scroll al final
    UI->>UI: Limpia input
    UI-->>Usuario: Muestra mensaje enviado
```

### 6. Cambiar Tema (Dark/Light)

```mermaid
sequenceDiagram
    actor Usuario
    participant Nav as Navigation
    participant ThemeJS as theme.js
    participant Storage as localStorage
    participant Document as document.documentElement
    
    Usuario->>Nav: Click botón tema
    Nav->>ThemeJS: toggleTheme()
    ThemeJS->>ThemeJS: Lee tema actual
    ThemeJS->>ThemeJS: Calcula nuevo tema<br/>(light ↔ dark)
    ThemeJS->>Document: Agrega/remueve clase 'dark'
    Document-->>ThemeJS: DOM actualizado
    ThemeJS->>Storage: Persiste preferencia<br/>setItem('theme', newTheme)
    Storage-->>ThemeJS: OK
    ThemeJS->>Nav: Actualiza icono botón
    Nav-->>Usuario: Tema cambiado visualmente
    
    Note over Usuario,Document: Carga Inicial
    Usuario->>ThemeJS: Carga página
    ThemeJS->>Storage: getItem('theme')
    Storage-->>ThemeJS: Tema guardado o null
    ThemeJS->>ThemeJS: Si null, usa preferencia sistema<br/>prefers-color-scheme
    ThemeJS->>Document: Aplica tema
    Document-->>Usuario: Página renderizada con tema correcto
```

---

## Patrones de Arquitectura Utilizados

### 1. **Repository Pattern**
- **Implementación**: `storageService.ts`, `feed/storageService.js`, `profile/storageService.js`
- **Propósito**: Abstrae las operaciones de persistencia (localStorage)
- **Beneficio**: Facilita cambiar localStorage por una API real

### 2. **Mock API Pattern**
- **Implementación**: `api/index.ts` con funciones async que simulan latencia
- **Propósito**: Simular backend mientras se desarrolla frontend
- **Beneficio**: Todo listo para reemplazar con API real

### 3. **Module Pattern**
- **Implementación**: Módulos de lógica de negocio (`feed.js`, `profile.js`, `reactions.js`)
- **Propósito**: Encapsular lógica relacionada
- **Beneficio**: Código organizado y reutilizable

### 4. **Optimistic UI Pattern**
- **Implementación**: En `feed.js` y `reactions.js`
- **Propósito**: Actualizar UI antes de confirmar con backend
- **Beneficio**: Mejor experiencia de usuario (respuesta inmediata)

### 5. **Event Delegation Pattern**
- **Implementación**: En scripts de componentes Astro
- **Propósito**: Minimizar event listeners usando data attributes
- **Beneficio**: Mejor rendimiento, menos memoria

### 6. **Layered Architecture**
- **Capas**: Presentación → Lógica → API → Datos → Servicios
- **Propósito**: Separación de responsabilidades
- **Beneficio**: Código mantenible y escalable

---

## Dependencias entre Módulos

```mermaid
graph LR
    subgraph "Independientes - Sin dependencias"
        Types[types/index.ts]
        Theme[theme.js]
        MockDB[data.ts]
        JobsData[jobs-data.ts]
        MsgData[messaging-data.ts]
        NetData[network-data.ts]
        NotifData[notifications-data.ts]
        SavedData[saved-data.ts]
        PremData[premium-data.ts]
    end
    
    subgraph "Nivel 1 - Dependen de independientes"
        StorageService[storageService.ts]
        API[api/index.ts]
    end
    
    subgraph "Nivel 2 - Dependen de Nivel 1"
        FeedStorage[feed/storageService.js]
        ProfileStorage[profile/storageService.js]
    end
    
    subgraph "Nivel 3 - Dependen de Nivel 2"
        Feed[feed.js]
        Reactions[reactions.js]
        Profile[profile.js]
    end
    
    subgraph "Nivel 4 - Dependen de Nivel 3"
        ClientInit[clientInit.ts]
        Components[Componentes Astro]
    end
    
    subgraph "Nivel 5 - Dependen de Nivel 4"
        Pages[Páginas Astro]
    end
    
    API --> MockDB
    API --> JobsData
    API --> MsgData
    API --> NetData
    API --> NotifData
    API --> SavedData
    API --> PremData
    API --> StorageService
    
    FeedStorage --> StorageService
    ProfileStorage --> StorageService
    
    Feed --> API
    Feed --> FeedStorage
    Reactions --> API
    Profile --> API
    Profile --> ProfileStorage
    
    ClientInit --> Feed
    ClientInit --> Theme
    Components --> Feed
    Components --> Reactions
    Components --> Profile
    Components --> Theme
    
    Pages --> Components
    Pages --> ClientInit
    
    Types -.influye.-> API
    Types -.influye.-> MockDB
    Types -.influye.-> Pages
    Types -.influye.-> Components
    
    style Types fill:#20b2aa
    style StorageService fill:#ffa500
    style API fill:#50c878
    style Feed fill:#4a90e2
    style Pages fill:#ff69b4
```

---

## Puntos de Integración para Backend Real

Cuando se desee integrar un backend real, estos son los puntos clave a modificar:

```mermaid
graph TD
    A[Objetivo: Integrar Backend Real] --> B{Cambios Necesarios}
    
    B --> C[1. Reemplazar api/index.ts]
    C --> C1[Cambiar funciones mock<br/>por llamadas fetch/axios]
    C --> C2[Configurar URLs endpoints]
    C --> C3[Agregar autenticación<br/>JWT/tokens]
    
    B --> D[2. Actualizar Storage Services]
    D --> D1[Eliminar localStorage<br/>para datos persistentes]
    D --> D2[Mantener solo para<br/>preferencias UI]
    
    B --> E[3. Agregar Gestión de Estado]
    E --> E1[Opcional: Redux/Zustand<br/>para estado global]
    E --> E2[Opcional: React Query<br/>para caché]
    
    B --> F[4. Actualizar Types]
    F --> F1[Sincronizar interfaces<br/>con API backend]
    F --> F2[Agregar tipos de respuesta<br/>y errores]
    
    B --> G[5. Agregar Error Handling]
    G --> G1[Manejo errores red]
    G --> G2[Mensajes usuario]
    G --> G3[Retry logic]
    
    B --> H[6. Autenticación]
    H --> H1[Login/Logout real]
    H --> H2[Gestión sesiones]
    H --> H3[Rutas protegidas]
    
    style A fill:#ff6b6b
    style C fill:#50c878
    style D fill:#ffa500
    style E fill:#4a90e2
    style F fill:#7b68ee
    style G fill:#ff69b4
    style H fill:#20b2aa
```

---

## Resumen de Arquitectura

### Características Clave

1. **Arquitectura en Capas**: Separación clara de responsabilidades
2. **API Mock**: Facilita desarrollo sin backend
3. **Persistencia Local**: localStorage con servicios abstractos
4. **Componentes Modulares**: 22 componentes reutilizables
5. **Routing File-Based**: Astro gestiona rutas automáticamente
6. **TypeScript**: Tipado fuerte en toda la aplicación
7. **Optimistic UI**: Actualizaciones inmediatas para mejor UX
8. **Event Delegation**: Rendimiento optimizado
9. **Dark Mode**: Soporte completo con persistencia

### Estadísticas del Proyecto

- **Total de Páginas**: 22 (16 estáticas + 6 dinámicas SSR)
- **Total de Componentes**: 22 (organizados por feature)
- **Total de Módulos JS/TS**: 17 (lógica de negocio)
- **Funciones API**: 17 (listas para backend real)
- **Interfaces TypeScript**: 20+ (tipado completo)
- **Archivos de Datos**: 7 (datos mock organizados)
- **Capas de Arquitectura**: 8 (separación responsabilidades)

### Tecnologías Principales

- **Framework**: Astro 5.16.9
- **Styling**: TailwindCSS 4.1.18
- **Language**: TypeScript 5.9.3
- **Persistencia**: localStorage (temporal)
- **Patrón**: Repository + Mock API + Layered Architecture

---

## Conclusión

Este proyecto demuestra una arquitectura bien estructurada y escalable, lista para integración con un backend real. La separación en capas, el uso de patrones de diseño modernos y la organización modular facilitan el mantenimiento y la extensión del sistema.

**Próximos pasos recomendados**:
1. Integrar autenticación real
2. Conectar con API backend
3. Implementar gestión de estado global (opcional)
4. Agregar tests unitarios e integración
5. Configurar CI/CD pipeline
