class LineaCrediticia {
  constructor(montoAprobado) {
    this.montoAprobado = montoAprobado;
    this.montoUsado = 0;
  }

  disponible() {
    return this.montoAprobado - this.montoUsado;
  }

  consumir(monto) {
    if (monto > this.disponible()) {
      return false;
    }
    this.montoUsado += monto;
    return true;
  }
}

module.exports = LineaCrediticia;