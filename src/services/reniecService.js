export async function buscarReniec(params) {
  const query = new URLSearchParams(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== ''
    )
  ).toString()

  const res = await fetch(
    `http://192.168.9.115:3001/api/reniec/buscar?${query}`
  )

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Error al buscar RENIEC')
  }

  return res.json()
}

export async function obtenerDetalleReniec(dni) {
  const res = await fetch(
    `http://192.168.9.115:3001/api/reniec/detalle/${dni}`
  )

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Error al obtener detalle')
  }

  return res.json()
}
