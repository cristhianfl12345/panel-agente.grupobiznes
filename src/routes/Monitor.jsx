import Leads from '../pages/Leads'
import { useAuth } from '../context/AuthContext'
import { useLocalTheme } from '../context/useLocalTheme'
import { useSearchParams } from 'react-router-dom'

export default function Monitor() {

  const { user } = useAuth()
  const { theme } = useLocalTheme()
  const [searchParams] = useSearchParams()

  const embedKey = searchParams.get("embedKey")
  const isEmbed = !!embedKey

  const isDark = theme === 'dark'
  const id_plataforma = parseInt(localStorage.getItem('id_plataforma'))

  // 🟢 PERMITIR EMBED SIN USER
  if (!user && !isEmbed) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors ${
          isDark
            ? 'bg-[#1F2029] text-white'
            : 'bg-slate-50 text-slate-800'
        }`}
      >
        <p>Cargando sesión...</p>
      </div>
    )
  }

  // 🟢 SALTAR VALIDACIÓN DE PLATAFORMA EN EMBED
  if (!isEmbed && ![2, 3, 4].includes(id_plataforma)) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-colors ${
          isDark
            ? 'bg-[#1F2029] text-white'
            : 'bg-slate-50 text-slate-800'
        }`}
      >
        <p>No autorizado</p>
      </div>
    )
  }

  return <Leads />
}