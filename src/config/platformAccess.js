export const PLATFORM_ACCESS = {
  busqueda: {
    busqueda: true,
    monitor: false,
    cartera: false,
  },
  monitor: {
    busqueda: false,
    monitor: true,
    cartera: false,
  },
  busqueda_monitor: {
    busqueda: true,
    monitor: true,
    cartera: false,
  },
  busqueda_monitor_cartera: {
    busqueda: true,
    monitor: true,
    cartera: true,
  },
}

export function canAccess(feature) {
 const plataforma = JSON.parse(
  localStorage.getItem("user") || "{}"
)?.plataforma

if (!plataforma) return false

  return PLATFORM_ACCESS[plataforma]?.[feature] === true
}
