"use client"
import axios from "axios"
import { useEffect, useState } from "react"
import { motion } from "motion/react"
import { useLocalTheme } from "../../context/useLocalTheme"

import {
  FaPhoneAlt,
  FaSave,
  FaPaperPlane
} from "react-icons/fa"

import { MdNotes } from "react-icons/md"

export default function Frames({
  telefono,
  idlead
}) {

  const { theme } = useLocalTheme()
  const isDark = theme === "dark"

  const [hayApunte, setHayApunte] = useState(false)
  const [hayTipi, setHayTipi] = useState(false)

const opcionesInteres = [
  {
    id: 1,
    texto: "🟢 Interesado",
    color: "#22C55E",
    clase: "bg-green-500 text-white"
  },
  {
    id: 2,
    texto: "🔵 Algo interesado",
    color: "#0EA5E9",
    clase: "bg-sky-500 text-white"
  },
  {
    id: 3,
    texto: "🟡 Dudoso",
    color: "#FACC15",
    clase: "bg-yellow-400 text-black"
  },
  {
    id: 4,
    texto: "🟠 Poco interesado",
    color: "#F97316",
    clase: "bg-orange-500 text-white"
  },
  {
    id: 5,
    texto: "🔴 Sin interés",
    color: "#DC2626",
    clase: "bg-red-600 text-white"
  }
]

  const [interes, setInteres] = useState("")
  const [historial, setHistorial] = useState([])

  useEffect(() => {

    const campana = JSON.parse(
      localStorage.getItem("campanaSeleccionada") || "{}"
    )

    if (!campana.id_camp) return

    const cargarModulos = async () => {

      try {

        const [resApunte, resTipi] = await Promise.all([

          fetch(`https://agente.bizapp.pe/api/frames-notes/hay-apunte/${campana.id_camp}`),
          fetch(`https://agente.bizapp.pe/api/frames-notes/hay-tipi/${campana.id_camp}`)

        ])

        const apunte = await resApunte.json()
        const tipi = await resTipi.json()

        setHayApunte(Boolean(apunte.activo))
        setHayTipi(Boolean(tipi.activo))

      } catch (error) {

        console.error("Error obteniendo módulos:", error)

      }

    }

    cargarModulos()

  }, [])

  //historial

 useEffect(() => {

  if (!idlead) return

  const cargarHistorial = async () => {

    try {

      const { data } = await axios.get(
        `https://agente.bizapp.pe/api/apuntes/etiquetas/historial/${idlead}`
      )

      if (data.ok) {
        setHistorial(data.data)
      }

    } catch (error) {

      console.error("Error cargando historial:", error)

    }

  }

  cargarHistorial()

}, [idlead])

//guardarapunte
  const guardarApunte = async () => {

  if (!telefono) {
    alert("Seleccione un teléfono.")
    return
  }

  if (!interes) return

  const seleccionado = opcionesInteres.find(
    x => x.texto === interes
  )

  if (!seleccionado) return

  try {

    const { data } = await axios.post(
      "https://agente.bizapp.pe/api/apuntes/etiquetas",
      {
        numero_telefono: telefono,
        descripcion: seleccionado.texto,
        color: seleccionado.color
      }
    )

    console.log(data)

const { data: historialData } = await axios.get(
  `https://agente.bizapp.pe/api/apuntes/etiquetas/historial/${idlead}`
)

if (historialData.ok) {
  setHistorial(historialData.data)
}

    setInteres("")

  } catch (error) {

    console.error(error)

  }

}

  return (

    <div className="h-full flex flex-col gap-3">

      {hayApunte && (

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={`
          rounded-xl
          shadow-lg
          p-3
          flex
          flex-col
          gap-3
          transition-colors
          ${
            isDark
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-slate-300"
          }
        `}
      >

        <div className="flex justify-between items-center">

          <div className="flex items-center gap-2">

            <MdNotes
              size={22}
              className="text-orange-500"
            />

            <span className="font-semibold">
              Etiquetas
            </span>

          </div>

          <span
            className="
              text-[10px]
              opacity-60
            "
          >
            {historial.length} registros
          </span>

        </div>

<div
  className="
    flex
    justify-between
    items-start
    gap-4
    min-h-[40px]
  "
>

  {/* IZQUIERDA */}
  <div className="flex flex-col leading-tight">

    {telefono ? (

      <>
        <span
          className={`
            text-sm
            font-semibold
            ${
              isDark
                ? "text-sky-300"
                : "text-sky-700"
            }
          `}
        >
          {telefono}
        </span>

        <span
          className="
            text-[11px]
            opacity-60
          "
        >
          IdLead: {idlead}
        </span>
      </>

    ) : (

      <span
        className="
          text-xs
          italic
          opacity-50
        "
      >
        Sin registros
      </span>

    )}

  </div>

  {/* DERECHA */}
  <div
    className="
      flex
      flex-wrap
      justify-end
      gap-2
      max-w-[60%]
    "
  >

   {historial.slice(0, 6).map((item) => (

  <motion.div
    key={item.created_at}
    initial={{
      opacity: 0,
      scale: 0.5
    }}
    animate={{
      opacity: 1,
      scale: 1
    }}
    whileHover={{
      scale: 1.2
    }}
    title={item.created_at}
    className="
      w-6
      h-6
      rounded-full
      shadow
      cursor-pointer
      border border-white/20
    "
    style={{
      backgroundColor: item.color
    }}
  />

))}

  </div>

</div>

        <div>

          <label
            className="
              block
              text-xs
              font-semibold
              mb-1
            "
          >
            Nivel de interés
          </label>

          <select
            value={interes}
            onChange={(e) =>
              setInteres(e.target.value)
            }
            className={`
              w-full
              rounded-lg
              border
              p-2
              outline-none
              ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300"
              }
            `}
          >

            <option value="">
              Seleccione...
            </option>

            {opcionesInteres.map(op => (

              <option
                key={op.id}
                value={op.texto}
              >
                {op.texto}
              </option>

            ))}

          </select>

        </div>

        <button
          onClick={guardarApunte}
          className="
            mt-auto
            rounded-lg
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            py-2.5
            flex
            justify-center
            items-center
            gap-2
            transition
          "
        >

          <FaSave />

          Registrar apunte

        </button>

      </motion.div>

      )}



      {/* ==========================
            TIPIFICACIÓN
      ========================== */}
      {hayTipi && (

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={`
          rounded-xl
          shadow-lg
          p-3
          flex
          flex-col
          gap-3
          transition-colors
          ${
            isDark
              ? "bg-slate-900 border border-slate-700"
              : "bg-white border border-slate-300"
          }
        `}
      >

        <div className="flex items-center gap-2 text-base font-semibold">

          <FaPhoneAlt className="text-green-500" />

          <span>Tipificación</span>

        </div>

        <button
          className="
            rounded-lg
            bg-green-600
            hover:bg-green-700
            text-white
            py-2.5
            flex
            justify-center
            items-center
            gap-2
            transition
          "
        >

          <FaPhoneAlt />

          Llamar

        </button>

        <div>

          <label className="block mb-1 text-xs font-semibold">
            Nivel 1
          </label>

          <select
            className={`
              w-full
              rounded-lg
              p-2
              border
              outline-none
              ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300"
              }
            `}
          >
            <option value=""></option>
          </select>

        </div>

        <div>

          <label className="block mb-1 text-xs font-semibold">
            Nivel 2
          </label>

          <select
            className={`
              w-full
              rounded-lg
              p-2
              border
              outline-none
              ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300"
              }
            `}
          >
            <option value=""></option>
          </select>

        </div>

        <div>

          <label className="block mb-1 text-xs font-semibold">
            Nivel 3
          </label>

          <select
            className={`
              w-full
              rounded-lg
              p-2
              border
              outline-none
              ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300"
              }
            `}
          >
            <option value=""></option>
          </select>

        </div>

        <div>

          <label className="block mb-1 text-xs font-semibold">
            Observación
          </label>

          <textarea
            rows={1}
            className={`
              w-full
              rounded-lg
              p-2
              border
              resize-none
              outline-none
              ${
                isDark
                  ? "bg-slate-800 border-slate-700 text-white"
                  : "bg-white border-slate-300"
              }
            `}
          />

        </div>

        <button
          className="
            rounded-lg
            bg-indigo-600
            hover:bg-indigo-700
            text-white
            py-2
            flex
            justify-center
            items-center
            gap-2
            transition
          "
        >

          <FaPaperPlane />

          Enviar

        </button>

      </motion.div>

      )}

    </div>

  )

}