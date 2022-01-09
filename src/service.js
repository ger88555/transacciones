const axios = require('axios').default;
const constants = require('./constants')
const { BancoAPIException } = require('./exceptions');

class Transacciones {
    static _instancia = null;

    _cuenta = null;

    _api = null;

    constructor() {
        this._api = axios.create();
    }

    /**
     * 
     * @param {Object} config Configuración.
     * @param {String} config.url API del banco a utilizar (opcional).
     * @param {String} config.cuenta Cuenta del banco a utilizar.
     * @returns 
     */
    static getInstancia({ url = constants.API_URL, cuenta = null }) {
        if (Transacciones._instancia === null) {
            Transacciones._instancia = new Transacciones()
        }

        if (url)    Transacciones._instancia.setURL(url);
        if (cuenta) Transacciones._instancia.setCuenta(cuenta);

        return Transacciones._instancia
    }

    /**
     * Fijar la URL de la API a utilizar.
     * 
     * @param {String} url URL de API de banco a utilizar.
     */
    setURL(url) {
        this._api.defaults.baseURL = url

        return this
    }

    /**
     * Fijar la cuenta de banco a utilizar.
     * 
     * @param {Number} cuenta Cuenta de banco a utilizar.
     */
    setCuenta(cuenta) {
        this._cuenta = cuenta

        return this
    }

    /**
     * Solicitar una transferencia bancaria como beneficiario.
     * 
     * @param {Number} no_tarjeta Número de tarjeta.
     * @param {Number} monto      Monto de la transacción.
     * 
     * @returns {Object} Datos de la transaccion.
     */
    async recibir(no_tarjeta, monto) {
        try {

            const { data } = await this._api.post('transacciones', {
                tarjetaDestino: this._cuenta,
                tarjetaOrigen: no_tarjeta,
                monto
            });

            if (typeof data.resultado === 'string') {
                // Cuando la API del banco devuelve un error, el status HTTP es 200 y retornan un mensaje.

                throw new BancoAPIException(data.resultado)
            }

            return data.data?.resultado;
        } catch (error) {

            // Aquí es mejor definir excepciones de la librería que utilizar
            // una excepción genérica.
            throw new BancoAPIException;
        }
    }

    /**
     * Solicitar una transferencia bancaria como benefactor.
     * 
     * @param {Number} no_tarjeta Número de tarjeta.
     * @param {Number} monto      Monto de la transacción.
     * 
     * @returns {Object} Datos de la transaccion.
     */
    async enviar(no_tarjeta, monto) {
        try {

            const { data } = await this._api.post('transacciones', {
                tarjetaDestino: no_tarjeta,
                tarjetaOrigen: this._cuenta,
                monto
            });

            if (typeof data.resultado === 'string') {
                // Cuando la API del banco devuelve un error, el status HTTP es 200 y retornan un mensaje.

                throw new BancoAPIException(data.resultado)
            }

            return data.data?.resultado;
        } catch (error) {

            // Aquí es mejor definir excepciones de la librería que utilizar
            // una excepción genérica.
            throw new BancoAPIException;
        }
    }
}


module.exports = Transacciones;