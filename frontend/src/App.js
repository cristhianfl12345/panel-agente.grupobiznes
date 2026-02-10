import React, { useEffect, useState } from 'react';
import './styles/App.css';
import api from './services/api';

function App() {
  const [message, setMessage] = useState('');
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/api');
        setMessage(response.data.message);
        
        const healthResponse = await api.get('/api/health');
        setHealth(healthResponse.data);
      } catch (error) {
        console.error('Error al conectar con el backend:', error);
        setMessage('Error al conectar con el servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Panel Agente - Grupo Biznes</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <p>{message}</p>
            {health && (
              <div className="health-status">
                <p>Estado del servidor: {health.status}</p>
                <p>Última actualización: {new Date(health.timestamp).toLocaleString('es-ES')}</p>
              </div>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
