const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000/api';

export async function apiGet(path, { signal } = {}) {
  const response = await fetch(`${API_URL}${path}`, { signal });

  if (!response.ok) {
    let message = `Ocurrió un error al consultar la API (${response.status}).`;
    try {
      const body = await response.json();
      if (body?.error?.message) message = body.error.message;
    } catch {
      // El cuerpo no era JSON; se conserva el mensaje por defecto.
    }
    throw new Error(message);
  }

  return response.json();
}

export { API_URL };
