# API de Gestión de Detección de EPP's mediante Cámaras de IA

---

## Descripción del Proyecto

Esta API proporciona una plataforma robusta para la gestión y supervisión de la detección de Equipos de Protección Personal (EPP's) a través de cámaras con inteligencia artificial. Permite a las empresas controlar la seguridad de sus trabajadores al monitorear el uso adecuado de equipos de protección en áreas específicas.

---

## Funcionalidades Principales

- **Gestión de Empresas:**
  - Registro, actualización y eliminación de empresas.
  - Consulta de detalles de empresas.

- **Gestión de Áreas:**
  - Asociación de áreas a empresas.
  - Creación, edición y eliminación de áreas.

- **Configuración de Dispositivos Jetson:**
  - Vinculación de cámaras Jetson a áreas y empresas.

- **Usuarios y Roles:**
  - Administración de usuarios con roles definidos (administrador, supervisor, etc.).
  - Asignación de usuarios a áreas y empresas.

- **Registro de Incidentes:**
  - Registro automático de incidentes detectados por las cámaras.
  - Almacenamiento de imágenes y detalles relevantes.

- **Reportes y Estadísticas:**
  - Generación de informes sobre incidentes y cumplimiento del uso de EPP's.

---

## Tecnologías Utilizadas

- **Node.js y Express.js:** Plataforma y marco de trabajo para el desarrollo del backend.

- **MongoDB:** Base de datos NoSQL para el almacenamiento de datos.

- **Mongoose:** Biblioteca de modelado de objetos MongoDB para Node.js.

- **Cloudinary:** Plataforma de gestión de medios en la nube para el almacenamiento de imágenes.

- **Integración de IA:** Integración con sistemas de inteligencia artificial para detección de EPP's.

---

## Instalación y Configuración

1. Clona el repositorio desde [GitHub](https://github.com/tu-usuario/tu-repositorio).
2. Instala las dependencias utilizando `npm install`.
3. Configura las variables de entorno según el entorno de desarrollo (MongoDB, Cloudinary, etc.).
4. Inicia la aplicación usando `npm start`.

---

## Uso de la API

La API está documentada en detalle en el archivo [API_DOC.md](API_DOC.md). Aquí encontrarás ejemplos de solicitudes y respuestas para cada punto final.

---

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar esta API, sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/MejoraGenial`).
3. Haz los cambios y realiza un commit (`git commit -m 'Mejora genial'`).
4. Haz un push a la rama (`git push origin feature/MejoraGenial`).
5. Abre un pull request.

---

## Licencia

[MIT License](LICENSE)

---

## Contacto

Para cualquier consulta o comentario, por favor contáctanos a través de [correo electrónico](mailto:tuemail@example.com).

---

## Agradecimientos

Agradecemos a todas las personas que han contribuido y apoyado en el desarrollo de esta API.

---
