import { useState } from 'react'

function AddUser() {
  const [form, setForm] = useState({
    doc_num: '',
    nombre: '',
    usuario: '',
    password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch('http://localhost:3001/api/add-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message)
        return
      }

      alert('Usuario creado correctamente')
      setForm({ doc_num: '', nombre: '', usuario: '', password: '' })
    } catch (error) {
      alert('Error de conexión con el servidor')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-950 p-8 rounded-xl w-full max-w-sm space-y-4"
      >
        <h2 className="text-white text-xl font-semibold text-center">
          Crear Usuario
        </h2>

        <input
          name="doc_num"
          placeholder="Documento"
          value={form.doc_num}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 text-white"
          required
        />

        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 text-white"
          required
        />

        <input
          name="usuario"
          placeholder="Usuario"
          value={form.usuario}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 text-white"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Nueva contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 text-white"
          required
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  )
}
export default AddUser
