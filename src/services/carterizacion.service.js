import axios from 'axios'

//const API = `${import.meta.env.VITE_API_URL}/api`
//const API = "https://agente.bizapp.pe/api"
const API = "https://agente.bizapp.pe/api"
// helper para evitar repetir lógica
const getAuthConfig = () => {

  const paramsURL = new URLSearchParams(window.location.search)
  const embedKey = paramsURL.get("embedKey")

  // MODO EMBED
  if (embedKey) {
    return {
      paramsExtra: { embedKey },
      headers: {}
    }
  }

  // MODO NORMAL
  const storedUser = JSON.parse(localStorage.getItem('user'))

  if (!storedUser?.id_usuario || !storedUser?.id_plataforma) {
    throw new Error('Usuario no autenticado')
  }

  return {
    paramsExtra: {},
    headers: {
      id_usuario: storedUser.id_usuario,
      plataforma: storedUser.id_plataforma
    }
  }
}

export const getLeads = async (iniCampania) => {

  const { headers, paramsExtra } = getAuthConfig()

  const token = localStorage.getItem('token')

  const storedUser = JSON.parse(localStorage.getItem('user'))
  const campanaSeleccionada = JSON.parse(
    localStorage.getItem('campanaSeleccionada')
  )

  const idUsuario = storedUser?.id_usuario
  const idCamp = campanaSeleccionada?.id_camp

  const res = await axios.get(
    `${API}/carterizado/${idUsuario}/${idCamp}/${encodeURIComponent(iniCampania)}`,
    {
      params: {
        ...paramsExtra
      },
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}

// ✅ GET SUBCAMPAÑAS
export const getSubcampanias = async (idCamp) => {

  const { headers, paramsExtra } = getAuthConfig()
const token = localStorage.getItem('token')

  const res = await axios.get(
    `${API}/carterizado/subcampanias/${idCamp}`,
    {
      params: {
        ...paramsExtra
      },
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}


//  GET VISTAS POR CAMPAÑA
export const getVistasCampana = async (idCamp) => {

  const { headers, paramsExtra } = getAuthConfig()
const token = localStorage.getItem('token')
  const res = await axios.get(
    `${API}/carterizado/vistas/${idCamp}`,
    {
      params: {
        ...paramsExtra
      },
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`
      }
    }
  )

  return res.data
}