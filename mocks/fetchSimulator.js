const item = require('./item');
const search = require('./search');

const ENDPOINTS = {
  ITEM: 'https://api.mercadolibre.com/items/MLB1615760527',
  SEARCH: 'https://api.mercadolibre.com/sites/MLB/search?q=computador',
};

const TIME_IN_MILLISECONDS = 200;

const fetchSimulator = (url) => {
  if (typeof url === undefined || url.endsWith('undefined')) {
    return Promise.reject(new Error('You must provide an url'));
  }
  const validUrl = Object.values(ENDPOINTS).includes(url);
  return Promise.resolve({
    status: validUrl ? 200 : 404,
    ok: validUrl,
    json: () => new Promise((resolve) => {
      setTimeout(() => {
        if (url === ENDPOINTS.ITEM) {
          return resolve(item);
        }

        if (url === ENDPOINTS.SEARCH) {
          return resolve(search);
        }

        return resolve({ results: [] });
      }, TIME_IN_MILLISECONDS);
    }),
  });
};

window.fetch = jest.fn(fetchSimulator);
afterEach(jest.clearAllMocks);

module.exports = fetchSimulator;
