# Imperio Club · Web

Web de **Imperio Club**, barbería de autor en Sevilla. Construida con la misma base técnica y el mismo nivel de acabado que la web de Epsilon Capital (Next.js 16, Tailwind CSS 4, Motion y scroll fluido con Lenis), con una identidad propia: mármol negro, bronce antiguo y tipografía de inscripción romana.

## Qué la hace distinta

- **Identidad «Imperio» con raíz sevillana.** Hispalis, Itálica y Adriano, el primer emperador que llevó barba: una historia real que ninguna otra barbería de Sevilla puede contar mejor.
- **Mármol Nero Marquina generado a medida** (sin fotos de stock) con un foco de luz que sigue al cursor en la portada.
- **Sello-moneda giratorio** y **denario de bronce** que rota en 3D con el scroll.
- **Estado «Abierto ahora» en vivo**, calculado con la hora de Sevilla (cabecera, portada, horario y barra móvil).
- **Carta numerada en romano** (I–VIII) con panel de detalle; al pulsar un servicio queda preseleccionado en el reservador.
- **Reserva en tres toques:** servicio → día (solo días abiertos) → franja. Compone el mensaje y lo abre en WhatsApp. Sin formularios ni base de datos.
- **El Club:** membresía con tarjeta de socio 3D que se inclina con el cursor y se vuelve púrpura imperial en el rango César.
- **Detalles:** telón de entrada con la corona de laurel (una vez por sesión), año en romano en el pie, 404 «CDIV», imagen para compartir en redes generada automáticamente y ficha de negocio local (schema.org) para Google.
- Accesible (movimiento reducido, foco visible, navegación por teclado) y 100 % estática: carga muy rápida.

## Antes de publicar

1. **`src/content/site.ts`** — sustituir todo lo marcado como `PENDIENTE`: WhatsApp, teléfono, dirección, barrio, Instagram, enlace de Google Maps, horario y datos legales del titular.
2. **`src/content/services.ts`** — precios y duraciones reales.
3. **`src/content/home.ts`** — el Club (rangos, cuotas y ventajas) es una **propuesta comercial**. Ajustarla o quitar `<Club />` de `src/app/(site)/page.tsx`.
4. **Fotos:** subir fotos de trabajos a `public/galeria/` (01.jpg, 02.jpg…). La sección «La obra» aparece sola.
5. **Logotipo:** si la barbería ya tiene uno, sustituir `src/components/ui/Logo.tsx` e `src/app/icon.svg`.
6. En Vercel, definir `NEXT_PUBLIC_SITE_URL` con el dominio definitivo.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Estructura

```
src/
  app/                 Rutas (portada, aviso legal, privacidad, cookies, 404), SEO e imagen OG
  components/
    layout/            Cabecera, pie, telón de entrada, barra de reserva móvil, scroll fluido
    sections/          Secciones de la portada
    ui/                Botones, logotipo, laurel, sello, moneda, animaciones
  content/             Todos los textos y datos editables
  lib/                 Horario en vivo, reservas por WhatsApp, numeración romana
public/images/         Texturas de mármol generadas para la marca
public/galeria/        Fotos de trabajos (opcional)
```
