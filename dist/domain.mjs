export const STATUSES = ['Pendiente', 'En progreso', 'Resuelta', 'Cerrada'];
export const PRIORITIES = ['Baja', 'Media', 'Alta', 'Urgente'];

export function validateRequest(input) {
  const errors = {};
  if (!input.title?.trim()) errors.title = 'Ingresa un título.';
  if (!input.category) errors.category = 'Selecciona una categoría.';
  if (!input.location?.trim()) errors.location = 'Indica la ubicación.';
  if (!input.description?.trim() || input.description.trim().length < 12) errors.description = 'Describe el problema con al menos 12 caracteres.';
  return errors;
}

export function nextCode(requests) {
  const max = requests.reduce((acc, item) => Math.max(acc, Number(String(item.code).replace(/\D/g, '')) || 0), 0);
  return `SOL-${String(max + 1).padStart(4, '0')}`;
}

export function summarize(requests) {
  const closed = requests.filter((item) => ['Resuelta', 'Cerrada'].includes(item.status)).length;
  const avg = requests.length ? requests.reduce((sum, item) => sum + (item.hours || 0), 0) / requests.length : 0;
  return {
    total: requests.length,
    pending: requests.filter((item) => item.status === 'Pendiente').length,
    active: requests.filter((item) => item.status === 'En progreso').length,
    closed,
    avgHours: Number(avg.toFixed(1)),
  };
}

export function csvFor(requests) {
  const rows = [['Código', 'Solicitud', 'Categoría', 'Prioridad', 'Estado', 'Responsable', 'Ubicación', 'Fecha']];
  requests.forEach((item) => rows.push([item.code, item.title, item.category, item.priority, item.status, item.assignee, item.location, item.date]));
  return rows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
}
