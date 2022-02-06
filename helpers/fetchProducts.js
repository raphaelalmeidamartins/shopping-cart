const fetchProducts = async (category) => {
  // seu código aqui
  try {
    const data = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${category}`);
    const response = await data.json();
    return response;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
