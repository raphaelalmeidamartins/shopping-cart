const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('Verifica se o método localStorage.setItem é acionado ao chamar a função saveCartItems com parâmetro', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('Verifica se o método localStorage.setItem é acionado com dois parâmetros ao chamar a função saveCartItems com parâmetro', () => {
    const html = '<ol><li>Item</li></ol>'
    saveCartItems(html);
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', html);
  });
});
