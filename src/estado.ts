const ESTADOS_TRAMITE: Record<string, string> = {
  MCER: "Emitiendo certificado",
};

export function formatEstadoTramite(estado?: string): string | undefined {
  if (!estado) return estado;
  return ESTADOS_TRAMITE[estado] ?? estado;
}
