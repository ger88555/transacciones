const api = require('./api');

class TransaccionesServicio {

    cuenta = null;
    
    constructor(cuenta) {
        this.setCuenta(cuenta);
    }

    /**
     * Fijar la cuenta de banco a utilizar.
     * 
     * @param {Number} cuenta Cuenta de banco a utilizar.
     */
    setCuenta(cuenta) {
        this.cuenta = cuenta
    }

    /**
     * Obtener el historial de transacciones de la cuenta.
     * 
     * @returns {Array}
     */
    async listar() {
        try {
            
            // Se hace una petición a la API pasándole los parámetros adecuados.
            const response = await api.get('transacciones', {
                params: { cuenta: this.cuenta }
            });

            return response.data;
        } catch (error) {
            console.log(error)

            // Aquí es mejor definir excepciones de la librería que utilizar
            // una excepción genérica.
            throw new Error('Hubo un error al contactar a la API del banco.');
        }
    }

    /**
     * Solicitar una transferencia bancaria.
     * 
     * @param {Number} no_tarjeta Número de tarjeta.
     * @param {String} titular    Titular de la tarjeta.
     * @param {Number} monto      Monto de la transacción.
     * 
     * @returns {Object} Datos de la transaccion.
     */
    async solicitar(no_tarjeta, titular, monto) {        
        try {
            
            // Se hace una petición a la API pasándole los parámetros adecuados.
            const response = await api.post('transacciones', {
                cuenta: this.cuenta,
                no_tarjeta,
                monto,
                titular
            });

            return response.data;
        } catch (error) {

            // Aquí es mejor definir excepciones de la librería que utilizar
            // una excepción genérica.
            throw new Error('Hubo un error al contactar a la API del banco.');
        }
    }
}


module.exports = TransaccionesServicio;