const cartItems = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function sumPrices() {
  let total = 0;
  totalPrice.innerHTML = '';
  [...cartItems.children]
    .forEach((item) => {
      let itemPrice = item
        .querySelector('.cart__item__price')
        .innerText.split(' ')[1].replace(',', '.');
      total += Number(itemPrice);
    });
  totalPrice.innerHTML = total.toFixed(2).replace('.', ',');
  return total;
}

function cartItemClickListener(event) {
  const clicked = event.target;
  if (clicked.tagName !== 'IMG') clicked.parentElement.remove();
  else clicked.parentElement.parentElement.remove();
  saveCartItems(cartItems.innerHTML);
  sumPrices();
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  if (element === 'button') e.addEventListener('click', addProductToCart);
  return e;
}

function createCartItemImage(image) {
  const div = document.createElement('div');
  div.className = 'cart__item__image__container'
  const img = document.createElement('img');
  img.src = image;
  div.appendChild(img);
  return div;
}

function createCartItemInformation() {
  const div = document.createElement('div');
  div.className = 'cart__item__info__container'
  return div;
}

function createCartItemElement({ sku, name, image, price }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.appendChild(createCartItemImage(image));
  const divInfo = createCartItemInformation();
  divInfo.appendChild(createCustomElement('p', 'cart__item__sku', sku));
  divInfo.appendChild(createCustomElement('p', 'cart__item__title', name));
  divInfo.appendChild(createCustomElement('p', 'cart__item__price', `R$ ${price.toFixed(2).replace('.', ',')}`));
  li.appendChild(divInfo);
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addProductToCart(event) {
  const button = event.target;
  const sku = getSkuFromProductItem(button.parentElement);
  const { id, title, thumbnail , price } = await fetchItem(sku);
  cartItems
    .appendChild(createCartItemElement({
      sku: id, name: title, image: thumbnail, price,
    }));
  saveCartItems(cartItems.innerHTML);
  sumPrices();
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('p', 'item__price', price));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

async function appendProducts() {
  const data = await fetchProducts('computador');
  await data.results.forEach(({ id, title, thumbnail, price }) => {
    document.querySelector('.items')
      .appendChild(createProductItemElement({ 
        sku: id, name: title, image: thumbnail, price: `R$ ${price.toFixed(2).replace('.', ',')}`,
      }));
  });
  document.querySelector('.loading').remove();
}

function loadingItems() {
  const loadingMsg = document.createElement('p');
  loadingMsg.className = 'loading';
  loadingMsg.textContent = 'carregando...';
  cartItems.appendChild(loadingMsg);
}

window.onload = async () => {
  loadingItems();
  await appendProducts();
  if (localStorage.length !== 0) {
    const savedItems = getSavedCartItems();
    cartItems.innerHTML = savedItems;
    [...cartItems.children]
      .forEach((item) => item.addEventListener('click', cartItemClickListener));
    sumPrices();
  }
  document.querySelector('.empty-cart')
    .addEventListener('click', () => {
      cartItems.innerHTML = '';
      sumPrices();
      localStorage.clear();
    });
};
