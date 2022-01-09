const Transacciones = require('./service');
const exceptions = require('./exceptions');

module.exports = {
  Transacciones: Transacciones.getInstancia,
  ...exceptions
}