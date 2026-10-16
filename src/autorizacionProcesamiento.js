class AutorizacionProcesamiento {
  constructor(linea) {
    this.linea = linea;
    this.historial = [];
  }

  procesar(comercio, monto) {
    let estado;
    let motivo;

    if (monto <= 0) {
      estado = "RECHAZADO";
      motivo = "Monto inválido";
    } else if (!this.linea.consumir(monto)) {
      estado = "RECHAZADO";
      motivo = "Línea de crédito insuficiente";
    } else {
      estado = "AUTORIZADO";
      motivo = "Consumo procesado";
    }

    const operacion = { comercio, monto, estado, motivo };
    this.historial.push(operacion);
    return operacion;
  }
}

module.exports = AutorizacionProcesamiento;