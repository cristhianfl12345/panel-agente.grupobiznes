import axios from 'axios'

export const getLeads = async (fecha, idCamp, iniCampania) => {

  const storedUser = JSON.parse(localStorage.getItem('user'))

  if (!storedUser?.id_usuario || !storedUser?.id_plataforma) {
    throw new Error('Usuario no autenticado')
  }

  const res = await axios.get(
    `http://192.168.9.115:3001/api/leads`,
    {
      params: {
        idCamp: Number(idCamp),
        iniCampania: iniCampania || null,
        fechaIngreso: fecha
      },
      headers: {
        id_usuario: storedUser.id_usuario,
        plataforma: storedUser.id_plataforma
      }
    }
  )

  return res.data
}
export const getSubcampanias = async (idCamp) => {

  const storedUser = JSON.parse(localStorage.getItem('user'))

  if (!storedUser?.id_usuario || !storedUser?.id_plataforma) {
    throw new Error('Usuario no autenticado')
  }

  const res = await axios.get(
    `http://192.168.9.115:3001/api/leads/subcampanias/${idCamp}`,
    {
      headers: {
        id_usuario: storedUser.id_usuario,
        plataforma: storedUser.id_plataforma
      }
    }
  )

  return res.data
}