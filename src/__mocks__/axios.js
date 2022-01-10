const mockAxios = jest.genMockFromModule('axios')

// Mock generated AxiosInstances
mockAxios.create = jest.fn(() => mockAxios)

module.exports = {
    default: mockAxios
}