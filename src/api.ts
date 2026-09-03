import type { CertificadoDetalleDTO } from "./types";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

export interface EjemploDisponible {
  numero: string;
  etiqueta: string;
}

export async function listarEjemplos(): Promise<EjemploDisponible[]> {
  try {
    const response = await fetch("/ejemplos/index.json");
    if (!response.ok) return [];
    return await response.json();
  } catch {
    return [];
  }
}

const notFound = (numeroCertificado: string) =>
  new ApiError(`No hay un ejemplo guardado para el certificado "${numeroCertificado}".`);

export async function buscarCertificado(numeroCertificado: string): Promise<CertificadoDetalleDTO> {
  const url = `/ejemplos/${encodeURIComponent(numeroCertificado)}.json`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch {
    throw new ApiError("No se pudo leer el archivo de ejemplo.");
  }

  // Un servidor estático mal configurado (o el fallback SPA del dev server) puede responder
  // 200 con la página HTML en vez de un 404 real cuando el archivo no existe.
  if (!response.ok || !response.headers.get("content-type")?.includes("json")) {
    throw notFound(numeroCertificado);
  }

  try {
    return await response.json();
  } catch {
    throw notFound(numeroCertificado);
  }
}
