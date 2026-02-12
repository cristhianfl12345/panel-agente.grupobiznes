import { useState } from 'react'

function AddUser() {
  const [form, setForm] = useState({
    doc_num: '',
    nombre: '',
    usuario: '',
    password: '',
    plataformas: [],
    hora_in: '',
    hora_out: '',
  })

  const plataformasDisponibles = [
    { label: 'Búsqueda', value: 'busqueda' },
    { label: 'Monitor', value: 'monitor' },
    { label: 'Cartera', value: 'cartera' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleCheckboxChange = (value) => {
    setForm((prev) => {
      const alreadySelected = prev.plataformas.includes(value)

      return {
        ...prev,
        plataformas: alreadySelected
          ? prev.plataformas.filter((p) => p !== value)
          : [...prev.plataformas, value],
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.plataformas.length === 0) {
      alert('Debe seleccionar al menos una plataforma')
      return
    }

    if (form.hora_in >= form.hora_out) {
      alert('La hora de inicio debe ser menor que la hora de salida')
      return
    }

    try {
      const res = await fetch('http://192.168.9.115:3001/api/add-user', {
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

      setForm({
        doc_num: '',
        nombre: '',
        usuario: '',
        password: '',
        plataformas: [],
        hora_in: '',
        hora_out: '',
      })

    } catch (error) {
      alert('Error de conexión con el servidor')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-950 p-8 rounded-xl w-full max-w-md space-y-4"
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
          placeholder="Nombre completo"
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
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-slate-800 text-white"
          required
        />

        {/* HORARIO */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="text-slate-400 text-sm">Hora Inicio</label>
            <input
              type="time"
              name="hora_in"
              value={form.hora_in}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 text-white"
              required
            />
          </div>

          <div className="flex-1">
            <label className="text-slate-400 text-sm">Hora Fin</label>
            <input
              type="time"
              name="hora_out"
              value={form.hora_out}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800 text-white"
              required
            />
          </div>
        </div>

        {/* PLATAFORMAS */}
        <div>
          <p className="text-slate-400 text-sm mb-2">Plataformas</p>

          <div className="space-y-2">
            {plataformasDisponibles.map((plataforma) => (
              <label
                key={plataforma.value}
                className="flex items-center gap-2 text-white"
              >
                <input
                  type="checkbox"
                  checked={form.plataformas.includes(plataforma.value)}
                  onChange={() => handleCheckboxChange(plataforma.value)}
                />
                {plataforma.label}
              </label>
            ))}
          </div>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
          Guardar
        </button>
      </form>
    </div>
  )
}

export default AddUser
