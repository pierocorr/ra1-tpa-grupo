const express = require("express");
const path = require("path");
const SolicitudTarjeta = require("./SolicitudTarjeta");
const EvaluacionCrediticia = require("./EvaluacionCrediticia");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/evaluar", (req, res) => {
  const { nombre, edad, ingresoMensual, deudaActual } = req.body;
  const solicitud = new SolicitudTarjeta(
    nombre,
    Number(edad),
    Number(ingresoMensual),
    Number(deudaActual)
  );
  const resultado = new EvaluacionCrediticia().evaluar(solicitud);

  res.json({
    aprobado: resultado.aprobado,
    motivo: resultado.motivo,
    linea: resultado.linea ? resultado.linea.montoAprobado : null,
  });
});

app.listen(3000, () => {
  console.log("App lista en http://localhost:3000");
});