const SolicitudTarjeta = require("./SolicitudTarjeta");
const EvaluacionCrediticia = require("./EvaluacionCrediticia");
const AutorizacionProcesamiento = require("./autorizacionProcesamiento");
const FacturacionCalculo = require("./facturacionCalculo");
const PagoYAutorizacionCredito = require("./PagoyAutorizaciondeCredito");

const solicitud = new SolicitudTarjeta("Juan Pérez", 25, 2500, 400);
const resultado = new EvaluacionCrediticia().evaluar(solicitud);

console.log(`Solicitante: ${solicitud.nombre}`);
console.log(`Resultado: ${resultado.aprobado ? "APROBADO" : "RECHAZADO"}`);
console.log(`Motivo: ${resultado.motivo}`);

if (resultado.aprobado) {
  const linea = resultado.linea;
  console.log(`Línea de crédito: S/ ${linea.montoAprobado}`);

  const mostrar = (op) =>
    console.log(`${op.comercio} - S/ ${op.monto}: ${op.estado} (${op.motivo})`);

  // Consumos
  const caja = new AutorizacionProcesamiento(linea);
  mostrar(caja.procesar("Tienda Ripley", 2000));
  mostrar(caja.procesar("Supermercado", 20000));
  console.log(`Disponible: S/ ${linea.disponible()}`);

  // Facturación
  const facturacion = new FacturacionCalculo(linea, caja.historial);
  console.log("Factura:", facturacion.generarFactura());

  // Pago
  const pagos = new PagoYAutorizacionCredito(linea);
  console.log("Pago:", pagos.pagar(500));
  console.log(`Disponible tras pagar: S/ ${linea.disponible()}`);
  console.log("Factura final:", facturacion.generarFactura());
}