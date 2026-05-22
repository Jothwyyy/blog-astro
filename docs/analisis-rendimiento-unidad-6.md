 # Análisis de rendimiento - Unidad 6

## Objetivo

Analizar cómo Astro integra componentes interactivos y cómo las directivas de cliente influyen en la carga de JavaScript en el navegador.

## Componentes interactivos implementados

Durante la Unidad 6 se implementaron componentes interactivos dentro del proyecto:

- `Greeting.tsx`: componente creado con Preact para mostrar un saludo dinámico.
- `ThemeIcon.astro`: componente relacionado con la interfaz visual para alternar o representar el tema claro/oscuro.

## Comportamiento general de Astro

Astro renderiza las páginas como HTML estático por defecto. Esto permite que el sitio cargue con una cantidad mínima de JavaScript inicial.

Cuando se integran componentes interactivos creados con frameworks como Preact, React o Vue, Astro necesita hidratar esos componentes en el navegador. Para controlar cuándo se carga y ejecuta ese JavaScript, Astro utiliza directivas de cliente como:

```astro
<Greeting client:load />
<Greeting client:visible />
```

Estas directivas determinan en qué momento el componente se vuelve interactivo para el usuario.

## Análisis de `client:load`

La directiva `client:load` indica que el JavaScript del componente debe cargarse al iniciar la página.

Ejemplo:

```astro
<Greeting client:load />
```

### Ventajas

- El componente está disponible de forma inmediata.
- Es útil para elementos visibles desde el inicio de la página.
- Funciona bien para componentes que el usuario puede necesitar usar rápidamente.

### Desventajas

- Aumenta la cantidad de JavaScript cargado durante la carga inicial.
- Si se usa en muchos componentes, puede afectar el rendimiento inicial del sitio.
- No es ideal para componentes que aparecen más abajo en la página o que no son necesarios al inicio.

### Aplicación en el proyecto

El componente `Greeting.tsx` puede usar `client:load` si el saludo dinámico aparece en una parte visible de la página y debe estar disponible desde el primer momento.

```astro
<Greeting client:load />
```

En este caso, se justifica porque el componente depende de JavaScript para mostrar o actualizar contenido dinámico en el navegador.

## Análisis de `client:visible`

La directiva `client:visible` indica que el JavaScript del componente debe cargarse únicamente cuando el componente aparece en pantalla.

Ejemplo:

```astro
<Greeting client:visible />
```

### Ventajas

- Reduce la cantidad de JavaScript cargado al inicio.
- Mejora el rendimiento inicial de la página.
- Es útil para componentes ubicados más abajo en el contenido.
- Permite cargar la interactividad solo cuando realmente es necesaria.

### Desventajas

- El componente no será interactivo hasta que sea visible.
- No es recomendable para elementos que deben funcionar inmediatamente al cargar la página.

### Aplicación en el proyecto

Si `Greeting.tsx` estuviera ubicado en una sección inferior de la página, `client:visible` sería una mejor opción, ya que evitaría cargar su JavaScript desde el inicio.

Sin embargo, si el componente aparece en la parte superior o cumple una función inmediata, `client:load` puede ser más adecuado.

## Análisis de `ThemeIcon.astro`

El componente `ThemeIcon.astro` puede comportarse de dos formas, dependiendo de su responsabilidad:

1. Si solo muestra un ícono estático, no necesita JavaScript en el navegador.
2. Si forma parte de un botón para cambiar entre modo claro y oscuro, entonces requiere interactividad.

Cuando el componente participa en el cambio de tema, se puede justificar el uso de una directiva como:

```astro
<ThemeIcon client:load />
```

Esto permite que el control de tema esté disponible desde el inicio de la navegación.

En cambio, si el selector de tema estuviera en una sección secundaria o no fuera necesario inmediatamente, podría evaluarse el uso de:

```astro
<ThemeIcon client:visible />
```

## Comparación entre directivas

| Directiva | Cuándo carga JavaScript | Uso recomendado |
|---|---|---|
| `client:load` | Al cargar la página | Componentes importantes o visibles desde el inicio |
| `client:visible` | Cuando el componente entra en pantalla | Componentes secundarios o ubicados más abajo en la página |

## Conclusión

Astro permite mejorar el rendimiento porque no envía JavaScript innecesario al navegador. El sitio puede mantenerse mayormente estático y solo hidratar los componentes que realmente necesitan interactividad.

Para componentes importantes, visibles desde el inicio o necesarios para la experiencia inmediata del usuario, `client:load` es una opción adecuada.

Para componentes secundarios o ubicados más abajo en la página, `client:visible` ayuda a reducir la carga inicial de JavaScript y mejora el rendimiento percibido.

En este proyecto, la integración de `Greeting.tsx` y `ThemeIcon.astro` permite observar cómo Astro combina HTML estático con componentes interactivos de forma controlada mediante directivas de cliente.
