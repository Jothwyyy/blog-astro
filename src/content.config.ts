// Importa el cargador glob
import { glob } from "astro/loaders";
// Importa utilidades de `astro:content` y `astro/zod`
import { defineCollection } from "astro:content";
import { z } from "astro/zod";
// Define un `loader` y un `schema` para cada colección
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/blog" }),
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string()
    }),
    tags: z.array(z.string())
  })
});
// Exporta un solo objeto `collections` para registrar tus colecciones
export const collections = { blog };