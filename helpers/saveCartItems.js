const saveCartItems = (itemsHTML) => {
  // seu código aqui
  localStorage.setItem('cartItems', itemsHTML);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
