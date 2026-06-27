"use client"
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useState, useMemo } from 'react'
import { getLeads, getVistasCampana } from '../services/carterizacion.service'
import LeadFilters from '../components/carterizacion/CarterizacionFilters'
import LeadTable from '../components/carterizacion/CarterizacionTable'
import { useLocalTheme } from '../context/useLocalTheme'
import { useAuth } from '../context/AuthContext'
import Header from '../routes/header.jsx'
import Loader from '../pages/Loader'

export default function Carterizacion() {

  const { user } = useAuth()
  const [searchParams] = useSearchParams()

const campFromURL = searchParams.get("camp")
const embedKey = searchParams.get("embedKey")

const isEmbed = !!embedKey
  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const [leads, setLeads] = useState([])
  const [columns, setColumns] = useState([])

  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const [searchText, setSearchText] = useState('')
  const [toast, setToast] = useState(null)

  const [columnFilters, setColumnFilters] = useState({
  fecha_creaciondia: '',
  mejornivel2: '',
  ultnivel2: '',
  diasSinLlamar: '',
  gestiones: ''
})


if (!user && !isEmbed) {
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


const fetchLeads = async ({ IdCamp, FechaIngreso, inicampania }) => {
{/*
  if (!FechaIngreso || !IdCamp) {
    alert('Debe seleccionar fecha')
    return
  }
 */}
  setLoading(true)
  setSearched(true)

  try {

    const response = await getLeads(inicampania)

    const rows = response?.data || []

    setLeads(rows)

    if (rows.length > 0) {

      const vistas = await getVistasCampana(IdCamp)

      const jsonKeys = Object.keys(rows[0])

      const matchedColumns = vistas
        .filter(col => jsonKeys.includes(col.query_vista))
        .map(col => ({
          key: col.query_vista,
          label: col.Vista,
          visible: col.activo
        }))

      setColumns([
        { key: 'index', label: 'N', visible: true },
        ...matchedColumns
      ])

    }

  } catch (err) {

    console.error('Error obteniendo leads:', err)

    setLeads([])
    setColumns([])

  } finally {

    setLoading(false)

  }

}

useEffect(() => {

  if (!campFromURL) return

  fetchLeads({
    IdCamp: campFromURL,
    FechaIngreso: new Date().toISOString().slice(0,10),
    inicampania: null
  })

}, [campFromURL])

const calcularDiasSinLlamar = (fecha) => {

  if (!fecha) return 9999

  const hoy = new Date()
  const ultima = new Date(fecha)

  return Math.floor(
    (hoy - ultima) / (1000 * 60 * 60 * 24)
  )
}

const filteredLeads = useMemo(() => {

  let result = [...leads]

  if (columnFilters.fecha_creaciondia) {
    result = result.filter(
      x =>
        String(x.fecha_creaciondia).slice(0,10) ===
        columnFilters.fecha_creaciondia
    )
  }

  if (columnFilters.mejornivel2) {
    result = result.filter(
      x => x.mejornivel2 === columnFilters.mejornivel2
    )
  }

  if (columnFilters.ultnivel2) {
    result = result.filter(
      x => x.ultnivel2 === columnFilters.ultnivel2
    )
  }

if (columnFilters.diasSinLlamar !== '') {
  result = result.filter(
    x =>
      calcularDiasSinLlamar(x.ult_fecha) ===
      Number(columnFilters.diasSinLlamar)
  )
}
if (columnFilters.gestiones !== '') {
  result = result.filter(
    x =>
      String(x.gestiones ?? 0) ===
      String(columnFilters.gestiones)
  )
}

  if (searchText) {
    const text = searchText.toLowerCase()

    result = result.filter(lead =>
      Object.values(lead)
        .join(" ")
        .toLowerCase()
        .includes(text)
    )
  }

  return result

}, [leads, searchText, columnFilters])


  return (

    <div className={`min-h-screen ${
      isDark
        ? 'bg-[#1F2029] text-white'
        : 'bg-slate-50 text-slate-800'
    }`}>

      {/* LOADER GLOBAL DE BUSQUEDA */}
      <Loader show={loading} />

      {user && <Header username={user.usuario} />}


      {toast && (

        <div className="fixed top-15 left-1/2 -translate-x-1/2 z-50 
                        bg-black text-white
                        dark:bg-yellow-100 dark:text-black
                        px-4 py-2 rounded-lg shadow-lg">

          {toast}

        </div>

      )}


      <div className="px-6 py-4 space-y-4 w-full">

       {!isEmbed && (
  <LeadFilters
    onSearch={fetchLeads}
    columns={columns}
    setColumns={setColumns}
    columnFilters={columnFilters}
    setColumnFilters={setColumnFilters}
    leads={leads}
  />
)}


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