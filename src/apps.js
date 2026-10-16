const SolicitudTarjeta = require("./SolicitudTarjeta");
const EvaluacionCrediticia = require("./EvaluacionCrediticia");

const solicitud = new SolicitudTarjeta("Juan Pérez", 25, 2500, 400);
const evaluacion = new EvaluacionCrediticia();
const resultado = evaluacion.evaluar(solicitud);

console.log(`Solicitante: ${solicitud.nombre}`);
console.log(`Resultado: ${resultado.aprobado ? "APROBADO" : "RECHAZADO"}`);
console.log(`Motivo: ${resultado.motivo}`);

if (resultado.aprobado) {
  console.log(`Línea de crédito: S/ ${resultado.linea.montoAprobado}`);
  resultado.linea.consumir(1000);
  console.log(`Disponible tras consumir S/ 1000: S/ ${resultado.linea.disponible()}`);
  const AutorizacionProcesamiento = require("./autorizacionProcesamiento");
  const autorizacion = new AutorizacionProcesamiento(resultado.linea);
  const caja = new AutorizacionProcesamiento(resultado.linea);
  console.log(caja.procesar("Tienda Ripley", 2000));
  console.log(caja.procesar("Supermercado", 20000)); // debe rechazar
  console.log(`Disponible: S/ ${resultado.linea.disponible()}`);
}