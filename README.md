# CAMARI — Arte hecho para conectar

Tienda administrable construida con Next.js, React, TypeScript, Tailwind CSS y Supabase. El catálogo, precios, inventario, fotos y configuración se obtienen de Supabase; los datos demo solo viven en `supabase/seed.sql`.

## Instalación

1. Usa Node.js 20.9 o posterior y ejecuta `npm install`.
2. Crea un proyecto en Supabase.
3. En SQL Editor ejecuta en orden `supabase/schema.sql`, `supabase/rls.sql`, `supabase/storage.sql` y, opcionalmente, `supabase/seed.sql`.
4. Copia `.env.example` como `.env.local` y completa la URL y clave pública anon de Project Settings → API.
5. Ejecuta `npm run dev` y abre `http://localhost:3000`.

## Crear el administrador

Crea un usuario en Supabase Authentication. El trigger genera su perfil como `customer`. Promuévelo desde SQL Editor:

```sql
update public.profiles p set role = 'admin'
from auth.users u
where p.id = u.id and u.email = 'tu-correo@dominio.com';
```

Entra en `/admin/login`. Cada pantalla y acción administrativa valida sesión y rol en servidor; RLS también exige `admin`.

## Uso

- `/admin/productos/nuevo`: crea el producto; al guardar se abre su edición para subir JPG, PNG o WEBP (máximo 6 MB).
- `/admin/productos`: publicar, ocultar, editar y eliminar.
- `/admin/categorias`: categorías reales en base de datos.
- `/admin/configuracion`: marca, WhatsApp, redes, contacto, historia y envíos.

Un producto publicado aparece automáticamente en `/tienda`. Stock cero deshabilita agregarlo. Al borrar un producto se borran también sus objetos del bucket `products` y las relaciones usan borrado en cascada.

## Base de datos, Storage y seguridad

Los scripts crean `profiles`, `products`, `categories`, `product_images`, `product_variants`, `orders`, `order_items`, `custom_requests`, `gallery`, `testimonials` y `store_settings`, además de los buckets `products`, `gallery` y `branding`. El público solo lee contenido publicado; solo administradores escriben. La app no usa `service_role`.

`seed.sql` agrega nueve categorías y seis productos marcados como DEMO, eliminables desde `/admin`. Sube tus propias fotografías desde el editor.

## WhatsApp

Guarda el número en `/admin/configuracion`, con código de país y sin `+`. Completa también `NEXT_PUBLIC_WHATSAPP_FALLBACK` para el checkout del carrito. Los mensajes incluyen artículos, cantidades, variantes, total y datos del cliente.

## Verificación y Vercel

```bash
npm run lint
npm run build
```

Importa el repositorio en Vercel, agrega las variables de `.env.local` y define `NEXT_PUBLIC_SITE_URL` con el dominio final. Para conectar el dominio usa Project → Settings → Domains y aplica los registros DNS indicados.

## Render

El archivo `render.yaml` define un Web Service Node compatible con SSR y Server Actions. Conecta el repositorio desde **New → Blueprint** en Render y completa las cuatro variables marcadas como secretas. Tras el primer despliegue, actualiza `NEXT_PUBLIC_SITE_URL` con la URL `https://camari.onrender.com` asignada (o el subdominio disponible) y vuelve a desplegar.

## Estructura

- `app/`: rutas públicas, SEO y administrador.
- `components/`: catálogo, carrito y formularios reutilizables.
- `lib/`: Supabase, consultas, autorización y utilidades.
- `types/`: modelos TypeScript.
- `supabase/`: esquema, RLS, Storage y demo.

Antes de producción reemplaza los datos demo, carga fotos reales y revisa privacidad, términos y envíos según tus condiciones comerciales.
