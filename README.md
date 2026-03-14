# 👓 OptiHome — La Óptica que va hacia ti

**OptiHome** es una plataforma moderna de salud visual diseñada para transformar la experiencia de adquirir lentes. Llevamos la clínica directamente a tu sala con tecnología de vanguardia y un enfoque centrado en la comodidad del usuario.

---

## ✨ Características Principales

- **🛡️ Probador Virtual IA (Try-On):** Utiliza inteligencia artificial avanzada (TensorFlow.js + Face Mesh) para probarte monturas en tiempo real con tu cámara o subiendo una foto.
- **🏠 Servicio a Domicilio:** Agenda exámenes visuales gratuitos y asesoría experta sin salir de casa.
- **📦 Catálogo Curado:** Explora colecciones modernas, clásicas y premium organizadas por categorías y materiales.
- **📱 Responsive & Premium UI:** Interfaz ultra-rápida y estética diseñada con Tailwind CSS 4 y Framer Motion para una experiencia fluida en cualquier dispositivo.
- **🚀 Tecnologías de Última Generación:** Construido sobre Next.js 15 y React 19 para un rendimiento óptimo.

---

## 🛠️ Stack Tecnológico

| Tecnología | Propósito |
| :--- | :--- |
| **Next.js 15** | Framework de React con App Router y Turbopack. |
| **React 19** | Biblioteca principal para la interfaz de usuario. |
| **Tailwind CSS 4** | Estilizado moderno y utilitario de alto rendimiento. |
| **TensorFlow.js** | Motor de IA para detección de puntos faciales en el navegador. |
| **MediaPipe** | Modelos de seguimiento facial de alta precisión. |
| **Framer Motion** | Animaciones fluidas y micro-interacciones. |
| **Radix UI** | Componentes de UI accesibles y sin estilo predefinido. |
| **Lucide React** | Set de iconos vectoriales elegantes. |

---

## 🚀 Inicio Rápido

### Requisitos Previos
- Node.js 20+ o superior.
- npm / yarn / pnpm.

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/tu-usuario/optihome.git
   cd optihome
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre en tu navegador:**
   Visita [http://localhost:3000](http://localhost:3000).

---

## 📁 Estructura del Proyecto

```text
src/
├── app/               # Rutas de Next.js (Home, Products, Us, etc.)
├── components/        # Componentes reutilizables (UI, Landing, etc.)
├── lib/               # Utilidades y funciones auxiliares
└── public/            # Assets estáticos (Imágenes, íconos, tipografías)
```

---

## 🧠 Lógica de Inteligencia Artificial

El probador virtual utiliza un sistema de detección de 468 puntos faciales para posicionar las monturas automáticamente:

1. **Carga Dinámica:** Los motores de TensorFlow se cargan vía CDN solo cuando es necesario para mantener el bundle principal ligero.
2. **Detección en Tiempo Real:** Seguimiento de la distancia interpupilar, inclinación de la cabeza y rotación para un ajuste preciso de los lentes.
3. **Modo Asistido:** Fallback inteligente que permite cargar fotos si la cámara no está disponible o el entorno no tiene HTTPS.

---

## 🤝 Contacto

¿Tienes dudas o quieres agendar una visita?

- **Web:** [optihome.com](https://optihome.com)
- **WhatsApp:** Agendar a través de nuestro botón flotante en la web.
- **Email:** hola@optihome.com

---

Desarrollado con ❤️ para mejorar la visión del mundo.
