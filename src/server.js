const express = require("express");
const path = require("path");
const SolicitudTarjeta = require("./SolicitudTarjeta");
const EvaluacionCrediticia = require("./EvaluacionCrediticia");
const AutorizacionProcesamiento = require("./autorizacionProcesamiento");
const FacturacionCalculo = require("./facturacionCalculo");
const PagoYAutorizacionCredito = require("./PagoyAutorizaciondeCredito");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Estado del último cliente aprobado
let caja = null;
let facturacion = null;
let pagos = null;

function datosFactura() {
  return {
    ...facturacion.generarFactura(),
    montoAprobado: caja.linea.montoAprobado,
    disponible: caja.linea.disponible(),
  };
}

app.post("/evaluar", (req, res) => {
  const { nombre, edad, ingresoMensual, deudaActual } = req.body;
  const solicitud = new SolicitudTarjeta(
    nombre,
    Number(edad),
    Number(ingresoMensual),
    Number(deudaActual)
  );
  const resultado = new EvaluacionCrediticia().evaluar(solicitud);

  if (resultado.aprobado) {
    caja = new AutorizacionProcesamiento(resultado.linea);
    facturacion = new FacturacionCalculo(resultado.linea, caja.historial);
    pagos = new PagoYAutorizacionCredito(resultado.linea);
  } else {
    caja = facturacion = pagos = null;
  }

  res.json({
    aprobado: resultado.aprobado,
    motivo: resultado.motivo,
    linea: resultado.linea ? resultado.linea.montoAprobado : null,
  });
});

app.post("/consumo", (req, res) => {
  if (!caja) {
    return res.status(400).json({ error: "Primero debes tener una tarjeta aprobada" });
  }
  const { comercio, monto } = req.body;
  const operacion = caja.procesar(comercio, Number(monto));
  res.json({
    ...operacion,
    disponible: caja.linea.disponible(),
    historial: caja.historial,
  });
});

app.get("/factura", (req, res) => {
  if (!caja) {
    return res.status(400).json({ error: "Primero debes tener una tarjeta aprobada" });
  }
  res.json(datosFactura());
});

app.post("/pago", (req, res) => {
  if (!caja) {
    return res.status(400).json({ error: "Primero debes tener una tarjeta aprobada" });
  }
  const pago = pagos.pagar(Number(req.body.monto));
  res.json({
    ...pago,
    disponible: caja.linea.disponible(),
    historialPagos: pagos.historialPagos,
  });
});

app.listen(3000, () => {
  console.log("App lista en http://localhost:3000");
});