import type { CertificadoDetalleDTO } from "../types";
import { formatEstadoTramite } from "../estado";
import { Section, Field, Empty, Table } from "./ui";

export function ResultView({ data }: { data: CertificadoDetalleDTO }) {
  const c = data.certificado;
  const inmueble = data.inmueble;
  const titulares = data.titulares ?? [];
  const noTitular = data.noTitular ?? [];

  return (
    <div className="result">
      <Section title="Certificado">
        {c ? (
          <>
            <div className="field-grid">
              <Field
                label="Número de certificado"
                value={c.numeroCertificado}
              />
              <Field label="Número de trámite" value={c.numeroTramite} />
              <Field label="Fecha de solicitud" value={c.fechaSolicitud} />
              <Field label="Fecha de vigencia" value={c.fechaVigencia} />
              <Field
                label="Estado del trámite"
                value={formatEstadoTramite(c.estadoTramite)}
              />
              <Field
                label="Extraña jurisdicción"
                value={c.extranaJurisdiccion}
              />
            </div>

            {c.motivos && c.motivos.length > 0 && (
              <div className="subsection">
                <h3>Motivos</h3>
                <ul>
                  {c.motivos.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {c.motivosCargado && c.motivosCargado.length > 0 && (
              <div className="subsection">
                <h3>Motivos (detalle)</h3>
                <Table
                  rows={c.motivosCargado}
                  columns={[
                    { header: "Motivo", render: (r) => r.motivo },
                    { header: "Exento", render: (r) => r.exento },
                    { header: "Afectar", render: (r) => r.afectar },
                    { header: "Plano", render: (r) => r.numeroPlano },
                    { header: "Sup. plano", render: (r) => r.supPlano },
                    { header: "Sup. título", render: (r) => r.supTitulo },
                    { header: "Unidad", render: (r) => r.unidad },
                    { header: "Piso", render: (r) => r.piso },
                    { header: "Designación", render: (r) => r.designacion },
                    { header: "Observaciones", render: (r) => r.observaciones },
                  ]}
                />
              </div>
            )}

            {c.escribanoSolicitante && (
              <div className="subsection">
                <h3>Escribano solicitante</h3>
                <div className="field-grid">
                  <Field
                    label="Nombre"
                    value={[
                      c.escribanoSolicitante.nombreEscribano,
                      c.escribanoSolicitante.apellidoEscribano,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  />
                  <Field
                    label="Matrícula"
                    value={c.escribanoSolicitante.matriculaEscribano}
                  />
                  <Field
                    label="Documento"
                    value={c.escribanoSolicitante.documento}
                  />
                  <Field
                    label="Circunscripción"
                    value={c.escribanoSolicitante.circunscripcion}
                  />
                  <Field
                    label="Número de registro"
                    value={c.escribanoSolicitante.numeroRegistro}
                  />
                </div>
              </div>
            )}

            {c.datoNotificacion && (
              <div className="subsection">
                <h3>Notificación interna</h3>
                <div className="field-grid">
                  <Field
                    label="Autorizante"
                    value={c.datoNotificacion.autorizante}
                  />
                  <Field
                    label="Descripción"
                    value={c.datoNotificacion.descripcionNotificacion}
                    wide
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <Empty>Sin datos de certificado.</Empty>
        )}
      </Section>

      <Section title="Inmueble">
        {inmueble ? (
          <>
            <div className="field-grid">
              <Field label="Circunscripción" value={inmueble.circunscripcion} />
              <Field label="Tipo de inmueble" value={inmueble.tipoInmueble} />
              <Field label="Procedencia" value={inmueble.procedencia} />
              <Field label="Descripción" value={inmueble.descripcionInmueble} />
            </div>

            {inmueble.dominioMatricula && (
              <div className="subsection">
                <h3>Dominio por matrícula SIRC</h3>
                <div className="field-grid">
                  <Field
                    label="Matrícula SIRC"
                    value={inmueble.dominioMatricula.matriculaSIRC}
                  />
                  <Field
                    label="Departamento"
                    value={inmueble.dominioMatricula.departamento}
                  />
                  <Field
                    label="Tiene BIS"
                    value={inmueble.dominioMatricula.tieneBIS}
                  />
                </div>
              </div>
            )}

            {inmueble.dominioTomo && (
              <div className="subsection">
                <h3>Dominio por tomo/foja</h3>
                <div className="field-grid">
                  <Field label="Asiento" value={inmueble.dominioTomo.asiento} />
                  <Field label="Tomo" value={inmueble.dominioTomo.tomo} />
                  <Field label="Foja" value={inmueble.dominioTomo.foja} />
                  <Field label="Código" value={inmueble.dominioTomo.codigo} />
                  <Field
                    label="Departamento"
                    value={inmueble.dominioTomo.departamento}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <Empty>Sin datos de inmueble.</Empty>
        )}
      </Section>

      <Section title={`Titulares (${titulares.length})`}>
        {titulares.length > 0 ? (
          <Table
            rows={titulares}
            columns={[
              { header: "Nombre completo", render: (r) => r.nombreCompleto },
              { header: "Tipo persona", render: (r) => r.tipoPersona },
              { header: "Tipo doc.", render: (r) => r.tipoDoc },
              { header: "Documento", render: (r) => r.documento },
              { header: "%", render: (r) => r.porcentaje },
              { header: "Columna", render: (r) => r.columna },
              { header: "Asiento", render: (r) => r.asiento },
              { header: "Fallecida", render: (r) => r.personaFallecida },
              { header: "Observaciones", render: (r) => r.observaciones },
            ]}
          />
        ) : (
          <Empty>Sin titulares confirmados para este certificado.</Empty>
        )}
      </Section>

      <Section title={`No titulares (${noTitular.length})`}>
        {noTitular.length > 0 ? (
          <Table
            rows={noTitular}
            columns={[
              { header: "Nombre", render: (r) => r.nombre },
              { header: "Apellido", render: (r) => r.apellido },
              { header: "CUIT", render: (r) => r.cuit },
            ]}
          />
        ) : (
          <Empty>
            Es normal que este bloque venga vacío: no todos los trámites lo
            cargan.
          </Empty>
        )}
      </Section>
    </div>
  );
}
