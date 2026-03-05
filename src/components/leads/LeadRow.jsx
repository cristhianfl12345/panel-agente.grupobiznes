import React from 'react'
import LeadStatus from './LeadStatus'
import { FiPhoneCall, FiClipboard, FiVolume2, FiPhoneOff } from 'react-icons/fi'
import { BsFillPlugFill } from 'react-icons/bs'
import { FaPhone } from 'react-icons/fa6'
import { useLocalTheme } from '../../context/useLocalTheme'
import { motion } from "motion/react"

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
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {index}
          </motion.td>
        )

      case 'idkey':
        return (
          <motion.td
            {...cellAnimation}
            whileHover={{ scale: 1.02 }}
            className={`${baseClass} cursor-pointer transition-colors ${
              isDark
                ? 'text-white hover:text-black hover:bg-yellow-100'
                : 'hover:bg-yellow-100'
            }`}
            onClick={() => onCopy?.(lead.idkey)}
          >
            {lead.idkey}
          </motion.td>
        )

      case 'perfil':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.perfil || '-'}
          </motion.td>
        )

      case 'CampaOrigen':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.CampaOrigen || '-'}
          </motion.td>
        )

      case 'idusuario':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.idusuario?.slice(0, 8) || '-'}
          </motion.td>
        )

      case 'numero_telefono':
        return (
          <motion.td
            {...cellAnimation}
            whileHover={{ scale: 1.02 }}
            className={`${baseClass} cursor-pointer transition-colors ${
              isDark
                ? 'text-white hover:text-black hover:bg-yellow-100'
                : 'hover:bg-yellow-100'
            }`}
            onClick={() => onCopy?.(lead.numero_telefono)}
          >
            {lead.numero_telefono}
          </motion.td>
        )

      case 'segmento':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.segmento || '-'}
          </motion.td>
        )

      case 'Alias':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.Alias || '-'}
          </motion.td>
        )

      case 'pautanameanuncio':
        return (
          <motion.td {...cellAnimation} className={baseClass}>
            {lead.pautanameanuncio || '-'}
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

      case 'discador':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.discador && (
              <FiPhoneCall className="text-green-600 mx-auto" />
            )}
          </motion.td>
        )

      case 'gestiones':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.gestiones && (
              <FiClipboard className="text-blue-600 mx-auto" />
            )}
          </motion.td>
        )

      case 'ultimocodcontacto':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.ultimocodcontacto ? (
              <span className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs">
                {lead.ultimocodcontacto} - {lead.UltNivel2}
              </span>
            ) : (
              <FaPhone className="text-red-500 mx-auto" />
            )}
          </motion.td>
        )

      case 'ultimofecha':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.ultimofecha && (
              <FiVolume2
                className="text-gray-600 mx-auto cursor-pointer"
                title={`${lead.ultimofecha} ${lead.ultimohora} - ${lead.ultgesasesorname}`}
              />
            )}
          </motion.td>
        )

      case 'mejorcodcontacto':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.mejorcodcontacto ? (
              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                {lead.mejorcodcontacto} - {lead.MejorNivel2}
              </span>
            ) : (
              <FiPhoneOff className="text-gray-400 mx-auto" />
            )}
          </motion.td>
        )

      case 'mejorfecha':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.mejorfecha && (
              <FiVolume2
                className="text-green-600 mx-auto cursor-pointer"
                title={`${lead.mejorservicio} - ${lead.mejorhora}`}
              />
            )}
          </motion.td>
        )

      case 'horai':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.horai || '-'}
          </motion.td>
        )

      case 'rswmejoridcall':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.rswmejoridcall || '-'}
          </motion.td>
        )

      case 'rswmejornivel1':
        return (
          <motion.td {...cellAnimation} className={`${baseClass} text-center`}>
            {lead.rswmejornivel1 || '-'}
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
      transition={{ duration: 0.2 }}
      whileHover={{
        backgroundColor: isDark ? "rgba(40,44,59,0.9)" : "rgba(229,231,235,0.7)"
      }}
      className="text-sm"
    >
      {columns.map((col) => (
        <React.Fragment key={col.key}>
          {renderCell(col.key)}
        </React.Fragment>
      ))}
    </motion.tr>
  )
}