require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  // implemente seus testes aqui
  it('Verifica se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Verifica se a função fetch é acionada quando chamamos a função fetchItem', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se a função fetch é acionada com o endpoint correto', () => {
    fetchItem('MLB1615760527');
    const endPoint = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(endPoint);
  });
  it('Verifica se o retorno da função fetchItem tem a estrutura de dados igual ao objeto simulado', async () => {
    expect.assertions(1);
    const data = await fetchItem('MLB1615760527');
    expect(data).toEqual(item);
  });
  it('Verifica se a função fetchItem retorna erro ao ser chamada sem parâmetro', async () => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  })
});
