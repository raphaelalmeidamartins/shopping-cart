const getSavedCartItems = () => localStorage.getItem('cartItems');

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
