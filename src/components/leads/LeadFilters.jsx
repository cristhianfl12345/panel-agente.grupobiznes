export default function LeadFilters({
  fecha,
  setFecha,
  idCamp,
  setIdCamp,
  iniCampania,
  setIniCampania,
  onSearch,
  searchText,
  setSearchText
}) {

  return (
    <div className="flex gap-4 items-center flex-wrap">

      <input
        type="number"
        placeholder="IdCamp"
        value={idCamp}
        onChange={(e) => setIdCamp(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <input
        type="date"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        className="border rounded px-3 py-2"
      />



      <input
        type="text"
        placeholder="Buscar..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="border rounded px-3 py-2"
      />

      <button
        onClick={onSearch}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Buscar
      </button>

    </div>
  )
}