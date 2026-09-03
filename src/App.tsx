import { useEffect, useState, type FormEvent } from "react";
import { buscarCertificado, listarEjemplos, ApiError, type EjemploDisponible } from "./api";
import type { CertificadoDetalleDTO } from "./types";
import { ResumenCard } from "./components/ResumenCard";
import { ResultView } from "./components/ResultView";
import "./App.css";

function App() {
  const [ejemplos, setEjemplos] = useState<EjemploDisponible[]>([]);
  const [numero, setNumero] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<CertificadoDetalleDTO | null>(null);
  const [detalleAbierto, setDetalleAbierto] = useState(false);

  useEffect(() => {
    listarEjemplos().then(setEjemplos);
  }, []);

  async function buscar(numeroCertificado: string) {
    if (!numeroCertificado.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);
    setDetalleAbierto(false);
    try {
      const result = await buscarCertificado(numeroCertificado.trim());
      setData(result);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Error inesperado.");
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    buscar(numero);
  }

  function elegirEjemplo(n: string) {
    setNumero(n);
    buscar(n);
  }

  return (
    <div className="app">
      <header>
        <h1>Certificados Ley — vista previa</h1>
        <p className="subtitle">
          Prototipo interno con ejemplos guardados, para revisar el formato del detalle de un
          certificado y juntar feedback. No es una herramienta de producción.
        </p>
      </header>

      <form className="search" onSubmit={handleSubmit}>
        <label htmlFor="numero">Número de certificado</label>
        <div className="search-row">
          <input
            id="numero"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="ej. 123456"
            autoFocus
          />
          <button type="submit" disabled={loading}>
            {loading ? "Buscando…" : "Buscar"}
          </button>
        </div>

        {ejemplos.length > 0 && (
          <div className="ejemplos">
            <span>Ejemplos disponibles:</span>
            {ejemplos.map((e) => (
              <button
                key={e.numero}
                type="button"
                className="ejemplo-chip"
                onClick={() => elegirEjemplo(e.numero)}
                title={e.etiqueta}
              >
                {e.numero}
              </button>
            ))}
          </div>
        )}
      </form>

      {error && <p className="error">{error}</p>}

      {data && (
        <>
          <ResumenCard data={data} />
          <button
            type="button"
            className="toggle-detalle"
            onClick={() => setDetalleAbierto((v) => !v)}
          >
            {detalleAbierto ? "Ocultar detalles ▲" : "Mostrar más detalles ▼"}
          </button>
          {detalleAbierto && <ResultView data={data} />}
        </>
      )}
    </div>
  );
}

export default App;
