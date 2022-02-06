require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  // implemente seus testes aqui
  it('Verifica se o fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  it('Verifica se a função fetch é acionada quando chamamos a função fetchProduct', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se a função fetch é acionada com o endpoint correto', () => {
    fetchProducts('computador');
    const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('Verifica se o retorno da função fetchProducts tem a estrutura de dados igual ao objeto simulado', async () => {
    expect.assertions(1);
    const data = await fetchProducts('computador');
    expect(data).toEqual(computadorSearch);
  });
  it('Verifica se a função fetchProducts retorna erro ao ser chamada sem parâmetro', async () => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  })
});
