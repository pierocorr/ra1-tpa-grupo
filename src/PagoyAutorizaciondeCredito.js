class PagoYAutorizacionCredito {
  constructor(linea) {
    this.linea = linea;
    this.historialPagos = [];
  }

  pagar(monto) {
    const saldo = this.linea.montoUsado;
    let estado;
    let motivo;

    if (!(monto > 0)) {
      estado = "RECHAZADO";
      motivo = "Monto de pago inválido";
    } else if (saldo === 0) {
      estado = "RECHAZADO";
      motivo = "No tienes deuda pendiente";
    } else if (monto > saldo) {
      estado = "RECHAZADO";
      motivo = "El pago supera la deuda pendiente";
    } else {
      this.linea.montoUsado -= monto; // el pago libera crédito disponible
      estado = "APLICADO";
      motivo = "Pago registrado, crédito liberado";
    }

    const pago = { monto, estado, motivo };
    this.historialPagos.push(pago);
    return pago;
  }
}

module.exports = PagoYAutorizacionCredito;