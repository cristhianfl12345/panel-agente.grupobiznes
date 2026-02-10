# Panel Agente - Grupo Biznes

Mejora y migración a JavaScript del antiguo panel agente a nivel UX/UI y backend con React y Node.js.

## 🚀 Estructura del Proyecto

Este proyecto está dividido en dos partes principales:

- **Backend**: API REST construida con Node.js y Express
- **Frontend**: Aplicación web construida con React

```
panel-agente.grupobiznes/
├── backend/
│   ├── src/
│   │   ├── routes/       # Rutas de la API
│   │   ├── controllers/  # Controladores de lógica de negocio
│   │   ├── models/       # Modelos de datos
│   │   ├── middleware/   # Middleware personalizado
│   │   └── server.js     # Punto de entrada del servidor
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas de la aplicación
│   │   ├── services/     # Servicios para llamadas API
│   │   ├── styles/       # Archivos CSS
│   │   ├── App.js        # Componente principal
│   │   └── index.js      # Punto de entrada
│   └── package.json
└── README.md
```

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn

## 🔧 Instalación

### Backend

1. Navega al directorio del backend:
```bash
cd backend
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Inicia el servidor:
```bash
# Modo desarrollo (con nodemon)
npm run dev

# Modo producción
npm start
```

El servidor estará disponible en `http://localhost:5000`

### Frontend

1. Navega al directorio del frontend:
```bash
cd frontend
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia la aplicación:
```bash
npm start
```

La aplicación estará disponible en `http://localhost:3000`

## 🧪 Scripts Disponibles

### Backend
- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon

### Frontend
- `npm start` - Inicia la aplicación en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas

## 🌐 API Endpoints

### Endpoints Disponibles

- `GET /api` - Mensaje de bienvenida
- `GET /api/health` - Estado del servidor

## 🛠️ Tecnologías Utilizadas

### Backend
- Node.js
- Express
- CORS
- dotenv

### Frontend
- React 18
- Axios
- React Scripts

## 📝 Desarrollo

1. El backend corre en el puerto 5000
2. El frontend corre en el puerto 3000
3. El frontend está configurado con un proxy para redirigir las peticiones `/api` al backend

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es parte de Grupo Biznes.
