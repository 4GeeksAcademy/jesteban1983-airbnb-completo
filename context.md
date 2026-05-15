# ACTÚA COMO SENIOR FULL-STACK ARCHITECT & CTO

## 🎯 VISIÓN GENERAL
Construir un MVP de alta fidelidad de una plataforma de alquiler vacacional (clon de Airbnb) utilizando Next.js (App Router), TypeScript, Tailwind CSS y React. La app debe ser segura, escalable, con SEO optimizado y tolerante a fallos.

## 🏗️ 1. ARQUITECTURA Y ESTRUCTURA (ATOMIC DESIGN)
- **Estructura de Carpetas**: Separa los componentes en `atoms`, `molecules`, `organisms` y `templates`.
- **Navegación**: Implementa rutas dinámicas para `/rooms/[id]` y rutas protegidas para `/profile` y `/bookings`.
- **Estado**: Usa `useState` y `useEffect` para UI local, y `useSearchParams` para filtros sincronizados con la URL. No uses librerías externas de estado.

## 🔐 2. AUTENTICACIÓN Y SEGURIDAD
- **Sistema de Usuario**: Implementa un flujo de Registro y Login (simulado o con NextAuth/Clerk). 
- **Seguridad**: Asegura que las páginas de pago solo sean accesibles para usuarios autenticados. Implementa validación de formularios con Zod para evitar entradas maliciosas.

## 💳 3. FLUJO DE RESERVA Y PAGOS (STRIPE INTEGRATION)
- **Pasarela de Pago**: Crea un componente de checkout que soporte:
  1. Tarjeta de Crédito/Débito (UI de campos de tarjeta con validación).
  2. Google Pay (Botón de integración rápida).
- **Cálculo de Precio**: Lógica para calcular `precio_noche * noches + tasas`.

## 🎨 4. UI/UX Y EFECTOS (TAILWIND PRO)
- **Fidelidad Airbnb**: Usa el color #FF385C para acentos.
- **Interactividad**:
  - `Hover effects`: Escalamiento suave de tarjetas y cambio de opacidad en botones.
  - `Sticky Header`: Barra de búsqueda que se transforma al hacer scroll.
  - `Skeleton Screens`: Muestra estados de carga profesionales mientras se obtienen los datos.
- **Responsive**: Mobile-first estricto (375px) hasta ultra-wide desktop.

## 📈 5. SEO Y MARKETING DE RESULTADOS
- **Metadata API**: Configura títulos dinámicos y descripciones OpenGraph para cada alojamiento.
- **JSON-LD**: Genera esquemas de datos estructurados para que Google muestre el rating y precio en los resultados de búsqueda.

## 🛡️ 6. RESILIENCIA Y MANEJO DE ERRORES
- **Error Boundaries**: Si un componente falla (ej. el Mapa), el resto de la app debe seguir funcionando.
- **Fallback UI**: Si no hay internet o falla la carga, muestra una versión simplificada de la página.

## 📝 REQUISITO PARA EL DESARROLLADOR (MODO TUTOR)
Para cada bloque de código generado:
1. Explica la lógica detrás de la seguridad implementada.
2. Comenta el código de forma didáctica para un desarrollador "Beginner" que busca entender el flujo de datos.
3. Asegúrate de que el código sea "Clean Code" (nombres de variables claros y funciones pequeñas).

## 🚀 ACCIÓN
Genera el plan de archivos inicial y el código para el sistema de Autenticación y la página de Checkout.