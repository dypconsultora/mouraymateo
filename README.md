# Moura y Mateo

Landing page de una sola página para **Moura y Mateo** — cambio de baterías a domicilio con entrega e instalación sin cargo (San Andrés y Gran Buenos Aires).

> Rediseño moderno del sitio de *Baterías Moura San Andrés*: mismo contenido y datos, nueva identidad visual. Dirección de diseño generada con la skill **ui-ux-pro-max** (patrón *Trust & Authority*).

**Stack:** HTML + Tailwind (CDN) + JavaScript vanilla. Sin build, lista para hostear en cualquier servidor estático.

## Concepto visual — "Corriente"
- **Hero oscuro tipo aurora**: haces de energía eléctrica que ascienden (azul Moura + amarillo energía sobre carbón), recreados en CSS/JS vanilla.
- **Tipografía nueva**: Space Grotesk (títulos) + Inter (cuerpo).
- Secciones alternadas claro/oscuro, tarjetas glass, marquee de diferenciales y marcas, carrusel de opiniones (10 reseñas reales), FAQ, contacto + mapa.
- **WhatsApp** como único color de conversión (verde), en header, hero, banda a domicilio, contacto y botón flotante.

## Verlo localmente
```bash
python3 -m http.server 8000
```
Abrí http://localhost:8000

## Estructura
```
index.html          Página única (comentada por secciones)
css/styles.css      Aurora hero, animaciones, micro-interacciones (tokens en :root)
js/main.js          Aurora, header, menú, reveal, marquee, carrusel, count-up
assets/img/         Imágenes optimizadas (WebP)
robots.txt · sitemap.xml · llms.txt
```

## Pendientes de confirmar (placeholders)
- **Logo**: se usa un wordmark tipográfico "MOURA Y MATEO" (el logo viejo decía "Baterías Moura San Andrés"). Reemplazar por el logo definitivo cuando lo tengan.
- **Instagram**: el enlace apunta a `instagram.com` genérico — falta el usuario real de la cuenta nueva.
- **Dominio**: las URLs absolutas (canonical, OG, sitemap, robots) usan `https://mouraymateo.com.ar/` como placeholder — ajustar al dominio final.
- **`ratingCount`** del JSON-LD está en `100` como placeholder → poner la cantidad real de reseñas.

---
Hecho por [DyP Consultora](http://dypconsultora.com/).
