import { useState, useMemo } from 'react'
import { getLeads } from '../services/leads.service'
import LeadFilters from '../components/leads/LeadFilters'
import LeadTable from '../components/leads/LeadTable'
import { useLocalTheme } from '../context/useLocalTheme'
import { useAuth } from '../context/AuthContext'
import Header from '../routes/header.jsx'

export default function Leads() {

  const { user } = useAuth()
  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  // ❌ Quitamos fecha automática
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [searchText, setSearchText] = useState('')

  // 🔐 PROTECCIÓN DE SESIÓN
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando sesión...
      </div>
    )
  }

  // 🔥 Ahora recibe IdCamp y FechaIngreso desde LeadFilters
const fetchLeads = async ({ IdCamp, FechaIngreso, IniCampania }) => {

  if (!FechaIngreso || !IdCamp) {
    alert('Debe seleccionar fecha')
    return
  }

  setLoading(true)
  setSearched(true)

  try {

    const data = await getLeads(
      FechaIngreso,
      IdCamp,
      IniCampania
    )

    setLeads(data.data || [])

  } catch (err) {
    console.error(err)
    setLeads([])
  } finally {
    setLoading(false)
  }
}

  const filteredLeads = useMemo(() => {

    if (!searchText) return leads

    const text = searchText.toLowerCase()

    return leads.filter((lead) => (
      lead.numero_telefono?.toString().includes(text) ||
      lead.idkey?.toString().includes(text) ||
      lead.ultgesasesorname?.toLowerCase().includes(text) ||
      lead.mejorcodcontacto?.toLowerCase().includes(text)
    ))

  }, [leads, searchText])

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#1F2029] text-white' : 'bg-slate-50 text-slate-800'}`}>

      <Header username={user?.usuario} />

      <div className="p-6 space-y-6 max-w-6xl mx-auto">

        {/* 🔥 LeadFilters ahora controla fecha y usa id_campana del localStorage */}
        <LeadFilters
          onSearch={fetchLeads}
        />

        <LeadTable
          leads={filteredLeads}
          loading={loading}
          searched={searched}
        />

      </div>
    </div>
  )
}