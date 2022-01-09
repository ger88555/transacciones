export class BancoAPIException extends Error {

    constructor (message = 'Hubo un error al contactar a la API del banco.') {
        super(message)
    }
    
}