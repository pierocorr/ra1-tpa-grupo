class FacturacionCalculo {
  constructor(linea, historial, tasaInteres = 0.03, porcentajeMinimo = 0.1) {
    this.linea = linea;
    this.historial = historial;
    this.tasaInteres = tasaInteres;         // 3% mensual
    this.porcentajeMinimo = porcentajeMinimo; // pago mínimo 10% del saldo
  }

  saldoPendiente() {
    return this.linea.montoUsado;
  }

  calcularInteres() {
    return Number((this.saldoPendiente() * this.tasaInteres).toFixed(2));
  }

  calcularPagoMinimo() {
    return Number((this.saldoPendiente() * this.porcentajeMinimo).toFixed(2));
  }

  generarFactura() {
    const consumos = this.historial.filter((op) => op.estado === "AUTORIZADO");
    return {
      cantidadConsumos: consumos.length,
      saldoPendiente: this.saldoPendiente(),
      interesEstimado: this.calcularInteres(),
      pagoMinimo: this.calcularPagoMinimo(),
    };
  }
}

module.exports = FacturacionCalculo;