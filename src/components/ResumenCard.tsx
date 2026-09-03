import type { CertificadoDetalleDTO } from "../types";
import { Field } from "./ui";

export function ResumenCard({ data }: { data: CertificadoDetalleDTO }) {
  const c = data.certificado;
  const inmueble = data.inmueble;
  const titulares = data.titulares ?? [];

  const escribano = c?.escribanoSolicitante
    ? [c.escribanoSolicitante.nombreEscribano, c.escribanoSolicitante.apellidoEscribano].filter(Boolean).join(" ")
    : undefined;

  const inmuebleCorto = inmueble?.dominioMatricula
    ? `Matrícula ${inmueble.dominioMatricula.matriculaSIRC ?? "—"}${inmueble.dominioMatricula.departamento ? ` (${inmueble.dominioMatricula.departamento})` : ""}`
    : inmueble?.dominioTomo
      ? `Tomo ${inmueble.dominioTomo.tomo ?? "—"}, Foja ${inmueble.dominioTomo.foja ?? "—"}${inmueble.dominioTomo.departamento ? ` (${inmueble.dominioTomo.departamento})` : ""}`
      : undefined;

  return (
    <div className="resumen">
      <div className="resumen-header">
        <h2>Certificado {c?.numeroCertificado}</h2>
        {c?.estadoTramite && <span className="badge">{c.estadoTramite}</span>}
      </div>
      <div className="field-grid">
        <Field label="Número de trámite" value={c?.numeroTramite} />
        <Field label="Fecha de solicitud" value={c?.fechaSolicitud} />
        <Field label="Fecha de vigencia" value={c?.fechaVigencia} />
        <Field label="Escribano solicitante" value={escribano} />
        <Field label="Inmueble" value={inmuebleCorto} />
        <Field label="Titulares" value={titulares.length > 0 ? titulares.length : undefined} />
      </div>
    </div>
  );
}
