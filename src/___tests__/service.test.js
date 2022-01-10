const mockAxios = require('axios').default

const Transacciones = require('../service')
const service = Transacciones.getInstancia();

describe('Solicitar', () => {

    beforeEach(() => {
        mockAxios.post.mockClear()
        mockAxios.post.mockImplementation(async (endpoint, data) => ({
                data: { 
                    resultado: [
                        { id_Transaccion: 1 }
                    ] 
                }
            })
        )
    })

    it('como benefactor', async () => {
        // act
        const transaction = await Transacciones.getInstancia().recibir("5543070466407615", 40)

        // assert

        expect(transaction.id_Transaccion).toEqual(1)
    })
})