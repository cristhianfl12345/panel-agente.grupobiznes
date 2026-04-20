import axios from 'axios'

const API = "http://192.168.9.115:3001/api"

// 🔹 helper para evitar repetir lógica
const getAuthConfig = () => {

  const paramsURL = new URLSearchParams(window.location.search)
  const embedKey = paramsURL.get("embedKey")

  // 🟡 MODO EMBED
  if (embedKey) {
    return {
      paramsExtra: { embedKey },
      headers: {}
    }
  }

  // 🟢 MODO NORMAL
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


// ✅ GET LEADS
export const getLeads = async (fecha, idCamp, iniCampania) => {

  const { headers, paramsExtra } = getAuthConfig()

  const res = await axios.get(`${API}/leads`, {
    params: {
      idCamp: Number(idCamp),
      iniCampania: iniCampania || null,
      fechaIngreso: fecha,
      ...paramsExtra
    },
    headers
  })

  return res.data
}


// ✅ GET SUBCAMPAÑAS
export const getSubcampanias = async (idCamp) => {

  const { headers, paramsExtra } = getAuthConfig()

  const res = await axios.get(
    `${API}/leads/subcampanias/${idCamp}`,
    {
      params: {
        ...paramsExtra
      },
      headers
    }
  )

  return res.data
}


// ✅ GET VISTAS POR CAMPAÑA
export const getVistasCampana = async (idCamp) => {

  const { headers, paramsExtra } = getAuthConfig()

  const res = await axios.get(
    `${API}/leads/vistas/${idCamp}`,
    {
      params: {
        ...paramsExtra
      },
      headers
    }
  )

  return res.data
}