# PokeExplorer

Aplicación web tipo Pokedex con estética de e-commerce construida con React + Vite, Axios y Tailwind CSS. Consume la [PokeAPI](https://pokeapi.co/) para mostrar un catálogo de los 1025 Pokémon existentes, con búsqueda por nombre, filtros por tipo, paginación numerada y vista de detalle localizada en español.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Requiere Node.js >= 18. La variable de entorno `VITE_API_BASE_URL` se define en `.env` (por defecto `https://pokeapi.co/api/v2`). No se necesita configurar ninguna API key.

## Stack técnico

| Tecnología | Versión | Por qué se usó |
|------------|---------|----------------|
| React | 19 | Framework UI declarativo con hooks |
| Vite | 8 | Build rápido con HMR, configuración mínima |
| Axios | 1.x | Interceptor de errores centralizado, timeout configurable |
| Tailwind CSS | v4 | Utility-first con `@theme` para tokens de diseño |
| React Router DOM | v7 | Enrutamiento declarativo con `useParams` |
| i18next + react-i18next | - | Localización de textos de UI |
| oxlint | - | Linting rápido (alternativa a ESLint) |

## Estrategia de endpoints

### Listado: `/pokemon-species`

El listado principal usa `/pokemon-species` (no `/pokemon`) porque el enunciado lo especifica como endpoint principal. Este endpoint devuelve una lista liviana de IDs y URLs, ideal para cargar los 1025 Pokémon de una sola vez.

### Sprites: construcción por URL

Los sprites se construyen por convención de URL sin requests extra:
- Official artwork: `https://raw.githubusercontent.com/.../official-artwork/{id}.png`
- Basic sprite: `https://raw.githubusercontent.com/.../{id}.png`

Si el official artwork falla (onError), se muestra el basic sprite como fallback. Esto evita N requests adicionales para verificar disponibilidad.

### Filtro por tipo: `/type/{type}`

El filtro por tipo usa el endpoint `/type/{type}` de la PokeAPI. Se cachea en memoria (Map) para evitar requests repetidos al desactivar/reactivar un tipo. Múltiples tipos se resuelven con `Promise.all` en paralelo, y los resultados se unen (OR) con deduplicación por nombre.

## Búsqueda

La búsqueda es 100% client-side sobre un índice liviano:
- Al montar, se cargan los 1025 nombres e IDs desde `/pokemon-species?limit=1025`
- El término de búsqueda se debounced (400ms) para evitar renders innecesarios
- Se filtra por coincidencia parcial en el nombre (case-insensitive)
- Se combina con el filtro de tipo: si hay tipo seleccionado, se busca dentro de los resultados del tipo
- Al buscar o cambiar filtros, la página se resetea a 1

## Localización

Se combinan dos estrategias:

1. **Datos de la API**: nombres, descripciones (flavor_text_entries) y categorías (genera) se extraen de los arrays localizados de la PokeAPI. Se busca primero en español (`es`), con fallback a inglés (`en`).

2. **Diccionarios estáticos**: tipos, colores, formas, habitats, egg groups y generaciones se traducen vía diccionarios en `utils/typeLabels.js`, `utils/speciesLabels.js` y `utils/typeColors.js`. Se optó por diccionarios porque son catálogos fijos que no cambian entre sesiones, y evitan requests adicionales por cada recurso.

Los textos de interfaz (botones, labels, mensajes) se manejan vía i18next con `locales/es.json`.

## Sistema de diseño

Paleta de colores definida como tokens de Tailwind CSS v4 en `src/index.css` vía `@theme`:

| Token | Color | Uso |
|-------|-------|-----|
| `shop-bg` | `#F6F4EC` | Fondo general |
| `shop-surface` | `#FFFFFF` | Cards y superficies |
| `shop-ink` | `#211F19` | Texto principal |
| `shop-primary` | `#1E3A5F` | Color de marca (azul indigo) |
| `shop-accent` | `#C88A00` | Acentos dorados |
| `shop-border` | `#E4E0D3` | Bordes |
| `shop-muted` | `#8A8676` | Texto secundario |

**Tipografía**: Space Grotesk (headers), Inter (cuerpo), JetBrains Mono (números de Pokedex #001).

**Colores por tipo**: 18 tipos oficiales con `{ dot, bg, text }` en `utils/typeColors.js`.

**Responsive**: Sidebar visible en desktop, colapsa a drawer toggleable en mobile.

## Estructura del proyecto

```
src/
+-- api/
|   +-- axiosClient.js          # Instancia Axios con baseURL, timeout, interceptor
|   +-- pokemonService.js       # 3 endpoints: list species, detail, by type
+-- components/
|   +-- common/
|   |   +-- ErrorBoundary.jsx   # Class component para errores de render
|   |   +-- Loader.jsx          # Spinner de carga
|   |   +-- ErrorMessage.jsx    # Mensaje de error con retry
|   |   +-- SearchBar.jsx       # Input de búsqueda con icono
|   |   +-- FilterSidebar.jsx   # Sidebar de filtros por tipo
|   |   +-- Pagination.jsx      # Paginación numerada con elipsis
|   +-- pokemon/
|       +-- PokemonCard.jsx     # Card estilo producto con fallback
|       +-- PokemonList.jsx     # Grid wrapper
|       +-- PokemonDetail.jsx   # Detalle con metadatos localizados
+-- hooks/
|   +-- usePokemonCatalog.js    # Lógica central del catálogo
|   +-- usePokemonDetail.js     # Fetch de detalle
|   +-- useDebounce.js          # Hook genérico de debounce
+-- locales/
|   +-- es.json                 # Strings de UI en español
+-- pages/
|   +-- HomePage.jsx            # Página del catálogo
|   +-- PokemonDetailPage.jsx   # Página de detalle
+-- router/
|   +-- AppRouter.jsx           # BrowserRouter con 2 rutas
+-- utils/
|   +-- constants.js            # BASE_URL, DEFAULT_LIMIT, TOTAL_POKEMON
|   +-- formatters.js           # formatId() -> #001
|   +-- sprites.js              # URLs de sprites
|   +-- typeColors.js           # Colores de 18 tipos
|   +-- typeLabels.js           # Nombres de tipos en español
|   +-- speciesLabels.js        # Labels de species (color, forma, habitat, etc)
|   +-- localization.js         # Helpers para datos localizados de la API
+-- App.jsx                     # Raíz con ErrorBoundary
+-- main.jsx                    # Entry point
+-- i18n.js                     # Configuración i18next
+-- index.css                   # Tokens de Tailwind CSS v4
```

## Decisiones técnicas

- **Una sola llamada a la API**: los 1025 Pokémon se cargan al montar. La paginación y búsqueda se hacen en cliente para respuesta instantánea.
- **Caché en memoria**: los resultados de `/type/{type}` se cachean en un `Map` con `useRef` para evitar requests al desactivar/reactivar tipos.
- **Error Boundary global**: captura errores de render y muestra una UI de fallback, evitando pantalla blanca.
- **Fallback de imagen**: si el official artwork falla, se muestra el basic sprite vía `onError` + `useState`.

## Mejoras futuras

- Persistir búsqueda y filtros en query params de la URL para navegación con back/forward
- Selector de idioma si se quisiera soportar más de uno
- Lazy loading de imágenes con Intersection Observer
- Infinite scroll como alternativa a paginación numerada
