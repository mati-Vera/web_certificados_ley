// Espejo de los DTOs de respuesta de GET /certificados/{numeroCertificado} en el backend SIRC.
// Todos los campos son opcionales porque los DTOs usan @JsonInclude(NON_NULL): un campo sin
// dato cargado en la base simplemente no viene en el JSON.

export interface EscribanoSolicitanteDTO {
  nombreEscribano?: string;
  apellidoEscribano?: string;
  matriculaEscribano?: string;
  documento?: string;
  circunscripcion?: string;
  numeroRegistro?: string;
}

export interface DatoNotificacionDTO {
  autorizante?: string;
  descripcionNotificacion?: string;
}

export interface MotivoCargadoDTO {
  motivo?: string;
  exento?: string;
  afectar?: string;
  numeroPlano?: string;
  supPlano?: string;
  supTitulo?: string;
  unidad?: string;
  piso?: string;
  designacion?: string;
  manzana?: string;
  pasillo?: string;
  supCubComun?: string;
  supCubPropia?: string;
  supCubTotal?: string;
  "dominio%"?: string;
  fraccion?: string;
  observaciones?: string;
}

export interface CertificadoInfoDTO {
  numeroCertificado?: string;
  numeroTramite?: string;
  fechaSolicitud?: string;
  fechaVigencia?: string;
  estadoTramite?: string;
  motivos?: string[];
  motivosCargado?: MotivoCargadoDTO[];
  escribanoSolicitante?: EscribanoSolicitanteDTO;
  extranaJurisdiccion?: string;
  datoNotificacion?: DatoNotificacionDTO;
}

export interface DominioMatriculaDTO {
  matriculaSIRC?: string;
  departamento?: string;
  tieneBIS?: string;
}

export interface DominioTomoDTO {
  asiento?: string;
  tomo?: string;
  foja?: string;
  codigo?: string;
  departamento?: string;
}

export interface InmuebleCertificadoDTO {
  circunscripcion?: string;
  tipoInmueble?: string;
  procedencia?: string;
  descripcionInmueble?: string;
  dominioMatricula?: DominioMatriculaDTO;
  dominioTomo?: DominioTomoDTO;
}

export interface NoTitularCertificadoDTO {
  nombre?: string;
  apellido?: string;
  cuit?: string;
}

export interface TitularCertificadoDTO {
  tipoPersona?: string;
  tipoDoc?: string;
  documento?: string;
  nombreCompleto?: string;
  personaFallecida?: string;
  observaciones?: string;
  porcentaje?: string;
  columna?: string;
  asiento?: string;
  incluido?: string;
  verificaInhibicion?: string;
  transferencia?: string;
  fraccion?: string;
  cargaManual?: string;
}

export interface CertificadoDetalleDTO {
  certificado?: CertificadoInfoDTO;
  inmueble?: InmuebleCertificadoDTO;
  noTitular?: NoTitularCertificadoDTO[];
  titulares?: TitularCertificadoDTO[];
}
