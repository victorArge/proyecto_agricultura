export function formatPrice(amount, currency = 'MXN') {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(isoDate) {
  if (!isoDate) return '';
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function formatTimeRange(startTime, endTime) {
  if (!startTime) return '';
  return endTime ? `${startTime} - ${endTime} h` : `${startTime} h`;
}

export function availableSeats(session) {
  if (!session) return 0;
  return Math.max(session.capacity - session.enrolled, 0);
}
