//front/src/components/notificaciones/NotificacionSocket.jsx
// front/src/components/notificaciones/NotificacionSocket.jsx
import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.9.115:3001";

let socket = null;

export default function NotificacionSocket({
  onNotificacion
}) {

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) return;

    // evitar múltiples conexiones
    if (!socket) {
      socket = io(SOCKET_URL, {
        auth: {
          token
        }
      });
    }

    // conexión
    socket.on("connect", () => {
      console.log(" Socket notificaciones conectado");
    });

    // evento principal del backend
    socket.on("notificacion_leads", (data) => {
      console.log(" Notificación recibida:", data);

      if (onNotificacion) {
        onNotificacion(data);
      }
    });

    // error auth socket
    socket.on("connect_error", (err) => {
      console.error(" Socket error:", err.message);
    });

    return () => {
      // NO desconectamos globalmente para no romper otras vistas
      socket.off("notificacion_leads");
      socket.off("connect");
      socket.off("connect_error");
    };

  }, [onNotificacion]);

  return null;
}