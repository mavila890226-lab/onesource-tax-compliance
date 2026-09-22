🏛️ ONESOURCE Indirect Tax Compliance Dashboard
Una aplicación web interactiva para gestionar el cumplimiento fiscal indirecto en múltiples jurisdicciones. Desarrollada con Node.js + Express y un frontend moderno con HTML5, CSS3 y JavaScript vanilla.

📋 Características
✅ Dashboard Interactivo

Métricas en tiempo real (jurisdicciones, cumplimiento, usuarios inactivos, filings pendientes)
Últimas transacciones y usuarios sin actividad reciente
✅ Gestión de Jurisdicciones

Visualización de 10+ jurisdicciones (USA, Canadá, México, Brasil, UK, Alemania, Francia, Singapur)
Tasas fiscales, estado de cumplimiento y nivel de actividad
✅ Gestión de Usuarios

Seguimiento de usuarios inactivos
Últimas actividades registradas
Acciones de re-engagement
✅ Transacciones

Registro de transacciones por jurisdicción
Tipos: Sales y Purchase
Estados: Completed, Pending
✅ Tax Filings

Filings mensuales y trimestrales
Fechas de vencimiento
Estados: Pending, Overdue, Completed
✅ Exportación de Datos

Descargar datos en formato JSON
Carga de archivos CSV
🚀 Instalación y Uso
Requisitos
Node.js v14+ (Descargar)
npm (incluido con Node.js)
Pasos
Clona el repositorio


Instala las dependencias


Inicia el servidor


Abre en tu navegador


📁 Estructura del Proyecto


🔌 API Endpoints
Método	Endpoint	Descripción
GET	/api/jurisdictions	Lista de jurisdicciones
GET	/api/users	Lista de usuarios
GET	/api/transactions	Transacciones registradas
GET	/api/filings	Tax filings pendientes
GET	/api/dashboard	Métricas del dashboard

Ejemplo de respuesta


🌐 Despliegue en Render (Gratis)
Sube este repositorio a GitHub ✅ (Ya hecho)
Ve a render.com
Crea una cuenta y conecta tu GitHub
Crea un nuevo Web Service
Configura:
Build Command: npm install
Start Command: node server/server.js
Haz clic en Deploy
Tu app estará disponible en: https://tu-app.onrender.com

🎨 Tecnologías Utilizadas
Backend: Node.js, Express.js, CORS
Frontend: HTML5, CSS3, JavaScript (Vanilla)
Datos: JSON simulado (sin base de datos)
Hosting: Render, Heroku, Vercel
📊 Datos de Ejemplo
Jurisdicciones
🇺🇸 California, Texas, New York
🇨🇦 Ontario
🇲🇽 Mexico
🇧🇷 Brazil
🇬🇧 UK
🇩🇪 Germany
🇫🇷 France
🇸🇬 Singapore
Usuarios
John Davis
Maria López
Emma Chen
Robert Smith
🔒 Seguridad
⚠️ Nota: Esta es una aplicación de demostración con datos simulados. Para producción:

Implementar autenticación (JWT, OAuth)
Conectar a una base de datos real (MongoDB, PostgreSQL)
Validar y sanitizar todas las entradas
Implementar HTTPS
Agregar rate limiting
📝 Licencia
Este proyecto es de código abierto bajo la licencia MIT.

👨‍💻 Autor
Mavila890226-lab

📧 Contacto
Para preguntas o sugerencias, abre un Issue en GitHub.

🎯 Próximas Mejoras
 Conectar a base de datos real
 Agregar gráficos (Chart.js)
 Implementar autenticación
 Agregar notificaciones en tiempo real
 Crear API de administración
 Agregar tests automatizados
¡Gracias por usar ONESOURCE Tax Compliance Dashboard! 🚀
