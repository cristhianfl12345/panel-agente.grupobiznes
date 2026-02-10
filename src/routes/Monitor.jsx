import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Monitor() {
  const navigate = useNavigate()

  useEffect(() => {
    const isAuth = localStorage.getItem('auth')
    if (!isAuth) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className="min-h-screen p-6 bg-slate-100 text-slate-800">
      <h1 className="text-2xl font-bold mb-4">
        Monitor de Leads
      </h1>

      <p className="text-slate-600 mb-6">
        Vista de monitoreo general de leads.
      </p>

      <div className="p-6 rounded-xl bg-white shadow">
        <p className="text-slate-500">
          Aquí se mostrará el listado de leads, filtros por fecha,
          estados y métricas generales.
        </p>
      </div>
    </div>
  )
}

export default Monitor
