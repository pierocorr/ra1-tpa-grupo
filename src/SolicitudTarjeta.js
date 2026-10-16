class SolicitudTarjeta {
  constructor(nombre, edad, ingresoMensual, deudaActual) {
    this.nombre = nombre;
    this.edad = edad;
    this.ingresoMensual = ingresoMensual;
    this.deudaActual = deudaActual;
  }

  esValida() {
    return this.nombre !== "" && this.edad >= 18 && this.ingresoMensual > 0;
  }
}

module.exports = SolicitudTarjeta;