"use client"

import { useState, useMemo, useEffect } from 'react'
import { getLeads } from '../services/leads.service'
import LeadFilters from '../components/leads/LeadFilters'
import LeadTable from '../components/leads/LeadTable'
import { useLocalTheme } from '../context/useLocalTheme'
import { useAuth } from '../context/AuthContext'
import Header from '../routes/header.jsx'

const defaultColumns = [
  { key: 'index', label: 'N', visible: true },
  { key: 'idkey', label: 'IdKey', visible: true },
  { key: 'perfil', label: 'Perfil', visible: true },
  { key: 'CampaOrigen', label: 'Customer Origin', visible: true },
  { key: 'idusuario', label: 'U. Reg', visible: true },
  { key: 'numero_telefono', label: 'Fono', visible: true },
  { key: 'segmento', label: 'Plt', visible: true },
  { key: 'Alias', label: 'A.', visible: true },
  { key: 'pautanameanuncio', label: 'Name Anuncio', visible: true },
  { key: 'fecha_creacion', label: 'Reg', visible: true },
  { key: 'discador', label: 'D.', visible: true },
  { key: 'gestiones', label: 'G.', visible: true },
  { key: 'ultimocodcontacto', label: 'Ult Nivel', visible: true },
  { key: 'ultimofecha', label: '🔊', visible: true },
  { key: 'mejorcodcontacto', label: 'Mejor Nivel', visible: true },
  { key: 'mejorfecha', label: '🔊', visible: true },
  { key: 'horai', label: 'Atención', visible: true },
  { key: 'rswmejoridcall', label: 'W.', visible: true },
  { key: 'rswmejornivel1', label: 'W Mejor Nivel', visible: true },
  { key: 'ObsApi', label: 'Obs', visible: true }
]

export default function Leads() {

  const { user } = useAuth()
  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [toast, setToast] = useState(null)

  // 🔥 ESTADO GLOBAL DE COLUMNAS
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem('leadColumns')
    return saved ? JSON.parse(saved) : defaultColumns
  })

  useEffect(() => {
    localStorage.setItem('leadColumns', JSON.stringify(columns))
  }, [columns])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Cargando sesión...
      </div>
    )
  }

  const handleCopy = async (text) => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text.toString())
      setToast(`Copiado: ${text}`)
      setTimeout(() => setToast(null), 2000)
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

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

      {toast && (
        <div className="fixed top-15 left-1/2 -translate-x-1/2 z-50 
                        bg-black text-white 
                        dark:bg-yellow-100 dark:text-black
                        px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}

      <div className="px-6 py-4 space-y-4 w-full">

        <LeadFilters
          onSearch={fetchLeads}
          columns={columns}
          setColumns={setColumns}
        />

        <LeadTable
          leads={filteredLeads}
          loading={loading}
          searched={searched}
          onCopy={handleCopy}
          columns={columns}
          setColumns={setColumns}
        />

      </div>
    </div>
  )
}