import React from 'react'
import LeadStatus from './LeadStatus'
import { FiPhoneCall, FiClipboard, FiVolume2, FiPhoneOff } from 'react-icons/fi'
import { BsFillPlugFill } from 'react-icons/bs'
import { FaPhone } from 'react-icons/fa6'
import { useLocalTheme } from '../../context/useLocalTheme'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTiktok, FaSalesforce, FaBlog } from "react-icons/fa";
import { IoMdSquareOutline } from "react-icons/io";
import { BsBing } from "react-icons/bs";




const cellAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.18 }
}

export default function LeadRow({ lead, index, onCopy, columns = [] }) {

  const { theme } = useLocalTheme()
  const isDark = theme === 'dark'

  const renderCell = (key) => {

    const baseClass = "border p-2"

    switch (key) {

    case 'index':
  return (
    <motion.td className={`${baseClass} text-center`}>
      {index}
    </motion.td>
  )

          case 'idkey':
    //  case 'IdKey_Computado':
       return (
  <motion.td
    {...cellAnimation}
    whileHover={{ scale: 1.02 }}
    className={`${baseClass} group cursor-pointer transition-colors p-2`}
    onClick={() => onCopy?.(lead.idkey)}
  >
    <span 
      className={`inline-block px-3 py-1 rounded-full font-medium text-sm shadow-sm transition-colors
        bg-cyan-300/70 text-blue-900 
        ${isDark 
          ? 'group-hover:bg-yellow-100 group-hover:text-black' 
          : 'group-hover:bg-yellow-100'
        }`}
    >
      {lead.idkey}
    </span>
  </motion.td>
)

     case 'dni':
  return (
    <motion.td {...cellAnimation} className={`${baseClass} p-2`}>
      {lead.dni ? (
        <span className="inline-block bg-cyan-300/70 text-blue-900 px-3 py-1 rounded-full font-medium text-sm shadow-sm">
          {lead.dni}
        </span>
      ) : (
        <span className="text-gray-400 pl-3">-</span>
      )}
    </motion.td>
  )

      case 'nombre_completo':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.nombre_completo || '-'}
          </motion.td>
        )

     case 'numero_telefono':
  return (
    <motion.td
      {...cellAnimation}
      whileHover={{ scale: 1.02 }}
      /* Añadimos 'group' para controlar el hover del hijo */
      className={`${baseClass} group cursor-pointer transition-colors p-2`}
      onClick={() => onCopy?.(lead.numero_telefono)}
    >
      <span 
        className={`inline-block px-3 py-1 rounded-full font-medium text-sm shadow-sm transition-colors
          bg-purple-300 text-purple-950 
          ${isDark 
            ? 'group-hover:bg-yellow-100 group-hover:text-black' 
            : 'group-hover:bg-yellow-100'
          }`}
      >
        {lead.numero_telefono || '-'}
      </span>
    </motion.td>
  )

      case 'email':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.email ?? '-'}
          </motion.td>
        )

      case 'email2':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.email2 || '-'}
          </motion.td>
        )

      case 'perfil':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.perfil || '-'}
          </motion.td>
        )

      case 'segmento':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.segmento || '-'}
          </motion.td>
        )

      case 'alias':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.alias || '-'}
          </motion.td>
        )

      case 'CampaOrigen':
      case 'origen':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.origen || lead.CampaOrigen || '-'}
          </motion.td>
        )

      case 'pautanameanuncio':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.pautanameanuncio || '-'}
          </motion.td>
        )

      case 'modelo':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.modelo || '-'}
          </motion.td>
        )

      case 'plataforma':
 // /  todo a minusculas para evitar problemas si viene como "Google" o "GOOGLE"
  const plataformaKey = lead.plataforma?.toLowerCase();

  // mapeamos las plataformas con sus iconos y un color personalizado (opcional)
  const plataformasConfig = {
    google: { icon: <FcGoogle className="text-lg" />, bg: 'bg-gray-100 dark:bg-zinc-800 text-red-800 dark:text-gray-200' },
    facebook: { icon: <FaFacebook className="text-lg text-[#1877F2]" />, bg: 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-200' },
    tiktok: { icon: <FaTiktok className="text-base text-black dark:text-white" />, bg: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100' },
    salesforce: { icon: <FaSalesforce className="text-base text-blue-800 dark:text-white" />, bg: 'bg-zinc-100 dark:bg-zinc-800 text-blue-900 dark:text-zinc-100' },
    interseguro: { icon: <IoMdSquareOutline className="text-base text-[18px] text-blue-800 dark:text-white" />, bg: 'bg-zinc-100 dark:bg-zinc-800 text-emerald-900 dark:text-zinc-100' },
    blog: { icon: <FaBlog className="text-base text-slate-800 dark:text-white" />, bg: 'bg-zinc-100 dark:bg-zinc-800 text-slate-900 dark:text-zinc-100' },
    bing: { icon: <BsBing className="text-base text-cyan-800 dark:text-white" />, bg: 'bg-zinc-100 dark:bg-zinc-800 text-cyan-900 dark:text-zinc-100' }
  };

  const config = plataformasConfig[plataformaKey];

  return (
    <motion.td {...cellAnimation} className={`${baseClass} p-2`}>
      {config ? (
        // Si es Google, Facebook o TikTok, renderiza la burbuja con el icono y el texto capitulizado
        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-medium text-sm shadow-sm ${config.bg}`}>
          {config.icon}
          <span className="capitalize">{lead.plataforma}</span>
        </span>
      ) : (
        // Si es cualquier otra cosa (o está vacío), muestra el texto normal o el guion
        <span className={lead.plataforma ? '' : 'text-gray-400 pl-3'}>
          {lead.plataforma || '-'}
        </span>
      )}
    </motion.td>
  )

      case 'politica':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.politica || '-'}
          </motion.td>
        )

      case 'fecha_creacion':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.fecha_creacion
              ? lead.fecha_creacion.toString().slice(0, 8)
              : '-'}
          </motion.td>
        )

      case 'fecha_creaciondia':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.fecha_creaciondia
              ? lead.fecha_creaciondia.toString().slice(0, 10)
              : '-'}
          </motion.td>
        )

      case 'hora_creacion':
      case 'horac':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.hora_creacion || lead.horac || '-'}
          </motion.td>
        )

      case 'horai': {
        const h = lead.horai

        let tiempoFormateado = '-'

        if (typeof h === 'string') {
          const parts = h.split(':')

          if (parts.length === 3) {
            const hours = parseInt(parts[0], 10) || 0
            const minutes = parseInt(parts[1], 10) || 0
            const seconds = Math.floor(parseFloat(parts[2])) || 0

            tiempoFormateado = `${hours}h ${minutes}m ${seconds}s`
          }
        } else if (h && typeof h === 'object') {
          const hours = h.hours ?? 0
          const minutes = h.minutes ?? 0
          const seconds = h.seconds ?? 0

          tiempoFormateado = `${hours}h ${minutes}m ${seconds}s`
        }

        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center font-mono text-xs`}>
            {tiempoFormateado}
          </motion.td>
        )
      }

      case 'discador':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            <div className="flex items-center justify-center gap-2">
              <span>{lead.discador}</span>

              {lead.discador && (
                <FiPhoneCall className="text-green-600" />
              )}
            </div>
          </motion.td>
        )

     case 'gestiones':
  return (
    <motion.td {...cellAnimation} className={`${baseClass} text-center p-2`}>
      <div className="flex items-center justify-center">
        {lead.gestiones ? (
          <span className="inline-block bg-blue-300/80 text-blue-950 px-3 py-1 rounded-full font-medium text-sm shadow-sm">
            {lead.gestiones}
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </div>
    </motion.td>
  )
      case 'ultnivel2':
      case 'ultimo_cod_contacto': {

        const codigo =
          lead.ultimo_cod_contacto ??
          lead.ultimocodcontacto

        const statusStyles = {
          NC: "bg-red-200/80 text-red-900 border-red-200",
          CD: "bg-emerald-300/80 text-slate-900 border-green-200",
          CND: "bg-yellow-100 text-yellow-700 border-yellow-200",
        }

        const currentStyle =
          statusStyles[codigo] ||
          "bg-gray-100 text-gray-700 border-gray-500"

        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {codigo || lead.ultnivel2 ? (
              <span className={`inline-block px-2 py-1 rounded text-xs font-medium  ${currentStyle}`}>
                {codigo || '-'} - {lead.ultnivel2}
              </span>
            ) : (
              <FaPhone className="text-red-400 mx-auto" />
            )}
          </motion.td>
        )
      }

      case 'ultimofecha':
      /*
      case 'ult_fecha':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {(lead.ult_fecha || lead.ultimofecha)
          //    ? (lead.ult_fecha || lead.ultimofecha).toString().slice(0, 10)
              : '-'}
          </motion.td>
        )
      */
      case 'ult_fecha':
  // 1. Obtenemos la fecha limpia en formato YYYY-MM-DD
  const fechaRaw = lead.ult_fecha || lead.ultimofecha;
  const fechaString = fechaRaw ? fechaRaw.toString().slice(0, 10) : null;

  let textoFecha = '-';

  if (fechaString) {
    // 2. Calculamos la diferencia de días ignorando las horas
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaLead = new Date(fechaString + 'T00:00:00'); // Forzamos hora local para evitar desfases de zona horaria

    const diferenciaTiempo = hoy.getTime() - fechaLead.getTime();
    const diferenciaDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24));

    // 3. Asignamos el texto según los días transcurridos
    if (diferenciaDias === 0) {
      textoFecha = 'Hoy';
    } else if (diferenciaDias === 1) {
      textoFecha = 'Ayer';
    } else if (diferenciaDias > 1) {
      textoFecha = `Hace ${diferenciaDias} días`;
    } else if (diferenciaDias < 0) {
      textoFecha = 'Futuro'; // Por si acaso la fecha es de mañana
    } else {
      textoFecha = fechaString; // Backup por si falla el cálculo
    }
  }

  return (
    <motion.td {...cellAnimation} className={`${baseClass} text-center p-2`}>
      <div className="flex items-center justify-center">
        {fechaString ? (
          <span className="inline-block bg-yellow-200 text-yellow-950 px-3 py-1 rounded-full font-medium text-sm shadow-sm capitalize">
            {textoFecha}
          </span>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </div>
    </motion.td>
  )

case 'mejornivel2': {

  const codigo =
    lead.mejor_cod_contacto ??
    lead.mejorcodcontacto

  const statusStyles = {
    NC: "bg-red-200/85 text-red-900 border-red-200",
    CD: "bg-emerald-300/70 text-slate-900 border-green-200",
    CND: "bg-yellow-100 text-yellow-700 border-yellow-200",
  }

  const currentStyle =
    statusStyles[codigo] ||
    "bg-gray-100 text-gray-700 border-gray-300"

  return (
    <motion.td
      {...cellAnimation}
      className={`${baseClass} text-center`}
    >
      {lead.mejornivel2 ? (
        <span
          className={`
            inline-block
            px-2 py-1
            rounded
            text-xs
            font-medium
            ${currentStyle}
          `}
        >
          {lead.mejornivel2}
        </span>
      ) : (
        <FaPhone className="text-red-400 mx-auto" />
      )}
    </motion.td>
  )
}

      case 'mejorfecha':
      case 'mejor_fecha':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {(lead.mejor_fecha || lead.mejorfecha) && (
              <FiVolume2
                className="text-green-600 mx-auto cursor-pointer"
                title={`${lead.mejor_duracion || '-'} - ${lead.mejor_hora || '-'}`}
              />
            )}
          </motion.td>
        )

      case 'rswmejoridcall':
      case 'rsw_mejor_idcall':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.rsw_mejor_idcall || lead.rswmejoridcall || '-'}
          </motion.td>
        )

      case 'rswmejornivel1':
      case 'rsw_mejor_nivel1':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.rsw_mejor_nivel1 || lead.rswmejornivel1 || '-'}
          </motion.td>
        )

      case 'campania':
      case 'inicampania':
      case 'idusuario':
      case 'idcampania':
      case 'tipoproducto':
      case 'nivel':
      case 'formid':
      case 'idordenleads':
      case 'numeroclonado':
      case 'finesadicionales':
      case 'diferencia_dias':
      case 'prionivel1':
      case 'primernivel1':
  return (
    <motion.td {...cellAnimation} className={`${baseClass} p-2`}>
      {lead.primernivel1 ? (
        <span className="inline-block bg-emerald-300/60 text-indigo-950 px-3 py-1 rounded-full font-medium text-sm shadow-sm">
          {lead.primernivel1}
        </span>
      ) : (
        <span className="text-gray-400 pl-3">-</span>
      )}
    </motion.td>
  )
      case 'primer_cod_contacto':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead[key] ?? '-'}
          </motion.td>
        )

      case 'ObsApi':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.ObsApi === null ? (
              <BsFillPlugFill
                className="text-green-600 mx-auto"
                title="Sin observaciones"
              />
            ) : (
              '-'
            )}
          </motion.td>
        )

      default:
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead[key] ?? '-'}
          </motion.td>
        )
      }
    }

  return (
<motion.tr
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }} // <--- ESTO ES VITAL
    transition={{ duration: 0.15 }} // Una transición rápida para que no se encime
    whileHover={{
      backgroundColor: isDark
        ? "rgba(40,44,59,0.9)"
        : "rgba(229,231,235,0.7)"
    }}
    className="text-sm"
  >
    {columns.map((col) => {
      const key = col.key || col.query_vista
      return (
        <React.Fragment key={key}>
          {renderCell(key)}
        </React.Fragment>
      )
    })}
  </motion.tr>
)
}