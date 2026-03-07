import axios from 'axios'

const API = "http://192.168.9.115:3001/api"

export const getLeads = async (fecha, idCamp, iniCampania) => {

  const storedUser = JSON.parse(localStorage.getItem('user'))

  if (!storedUser?.id_usuario || !storedUser?.id_plataforma) {
    throw new Error('Usuario no autenticado')
  }

  const res = await axios.get(`${API}/leads`, {
    params: {
      idCamp: Number(idCamp),
      iniCampania: iniCampania || null,
      fechaIngreso: fecha
    },
    headers: {
      id_usuario: storedUser.id_usuario,
      plataforma: storedUser.id_plataforma
    }
  })

  return res.data
}


export const getSubcampanias = async (idCamp) => {

  const storedUser = JSON.parse(localStorage.getItem('user'))

  if (!storedUser?.id_usuario || !storedUser?.id_plataforma) {
    throw new Error('Usuario no autenticado')
  }

  const res = await axios.get(
    `${API}/leads/subcampanias/${idCamp}`,
    {
      headers: {
        id_usuario: storedUser.id_usuario,
        plataforma: storedUser.id_plataforma
      }
    }
  )

  return res.data
}


export const getVistasCampana = async (idCamp) => {

  const storedUser = JSON.parse(localStorage.getItem('user'))

  const res = await axios.get(
    `${API}/leads/vistas/${idCamp}`,
    {
      headers: {
        id_usuario: storedUser.id_usuario,
        plataforma: storedUser.id_plataforma
      }
    }
  )

  return res.data
}