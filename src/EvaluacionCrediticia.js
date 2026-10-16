const LineaCrediticia = require("./lineaCrediticia");

class EvaluacionCrediticia {
  evaluar(solicitud) {
    if (!solicitud.esValida()) {
      return { aprobado: false, motivo: "Datos inválidos o menor de edad" };
    }

    // La deuda no puede pasar del 40% del ingreso
    if (solicitud.deudaActual > solicitud.ingresoMensual * 0.4) {
      return { aprobado: false, motivo: "Deuda demasiado alta" };
    }

    // La línea es 3 veces el ingreso mensual
    const linea = new LineaCrediticia(solicitud.ingresoMensual * 3);
    return { aprobado: true, motivo: "Cumple los requisitos", linea };
  }
}

module.exports = EvaluacionCrediticia;