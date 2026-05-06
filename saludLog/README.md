# SaludLog

Aplicación web enfocada en el registro de alimentos, control y seguimiento preventivo de la salud, con perfiles tanto para **Pacientes** como para **Médicos**.

## 🛠️ Herramientas y Tecnologías Utilizadas

Este proyecto ha sido desarrollado utilizando las siguientes tecnologías:

### Backend
* **Python 3**: Lenguaje de programación principal del lado del servidor.
* **Django**: Framework web de alto nivel utilizado para la arquitectura del backend, el sistema de rutas y el renderizado de vistas.
* **SQLite**: Base de datos relacional ligera utilizada por defecto en Django para el almacenamiento y gestión de la información en la etapa de desarrollo.

### Frontend
* **HTML5**: Estructuración semántica de las vistas y plantillas web.
* **Tailwind CSS**: Framework de CSS basado en utilidades (cargado vía CDN) utilizado para todo el diseño visual, la adaptabilidad (responsive design) y los estilos del modo oscuro/claro, evitando la necesidad de escribir hojas de estilo personalizadas extensas.
* **JavaScript (Vanilla JS)**: Utilizado nativamente en las plantillas de Django para manejar la interactividad del cliente, como la selección entre los tipos de perfil (Paciente/Médico) y la alternancia dinámica del tema (Modo Oscuro/Claro).
* **Lucide Icons**: Librería de íconos de código abierto utilizada para la iconografía de la interfaz (cargada vía CDN usando su paquete oficial de JS para renderizar gráficos SVG escalables).

### Flujo de Desarrollo
* **React (Mockup Inicial)**: El diseño visual y los componentes originales fueron iterados primero como mockups interactivos basados en React (`.tsx`) antes de ser migrados e integrados a las plantillas nativas de Django.
* **Entorno Virtual (`venv`)**: Entorno aislado utilizado para manejar de forma segura y separada las dependencias de Python del sistema global.

---
*© 2026 SaludLog - Cuidando tu salud preventiva*
