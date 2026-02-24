import LeadStatus from './LeadStatus'

export default function LeadRow({ lead }) {

  return (
    <tr className="hover:bg-gray-50">

      <td className="border p-2">{lead.idkey}</td>
      <td className="border p-2">{lead.numero_telefono}</td>

      <LeadStatus
        code={lead.ultimocodcontacto}
        nivel={lead.UltNivel2}
      />

      <LeadStatus
        code={lead.mejorcodcontacto}
        nivel={lead.MejorNivel2}
      />

    </tr>
  )
}