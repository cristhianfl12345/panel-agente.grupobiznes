export async function buscarReniec(params) {
  const query = new URLSearchParams(
    Object.entries(params).filter(
      ([_, value]) => value !== undefined && value !== ''
    )
  ).toString()

  const token = localStorage.getItem('token')

  const res = await fetch(
    `http://192.168.9.115:3001/api/reniec/buscar?${query}`,
    // `http://192.168.9.115:3001/api/reniec/buscar?${query}`
    // `${import.meta.env.VITE_API_URL}/api/reniec/buscar?${query}`
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Error al buscar RENIEC')
  }

  return res.json()
}

export async function obtenerDetalleReniec(dni) {
  const token = localStorage.getItem('token')

  const res = await fetch(
    `http://192.168.9.115:3001/api/reniec/detalle/${dni}`,
    // `http://192.168.9.115:3001/api/reniec/detalle/${dni}`
    // `${import.meta.env.VITE_API_URL}/api/reniec/detalle/${dni}`
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )

  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.message || 'Error al obtener detalle')
  }

  return res.json()
}