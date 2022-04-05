const cartItems = document.querySelector('.cart-items');
const totalPrice = document.querySelector('.total-price');
const displayCart = document.querySelector('#display-cart');

const cartIcon = document.querySelector('#cart-icon');
const cartEmpty = 'fas fa-shopping-cart display-icon';
const cartFull = 'fas fa-cart-arrow-down display-icon';
let classCartIcon = cartEmpty;

displayCart.addEventListener('click', () => {
  const cartContainer = document.querySelector('.cart-container');
  if (displayCart.checked) {
    cartContainer.style.right = '-375px';
    cartIcon.className = classCartIcon;
  } else {
    cartContainer.style.right = '0';
    cartIcon.className = 'fas fa-times-circle close-icon';
  }
});

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item-image';
  img.src = imageSource;
  return img;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item-sku').innerText;
}

function sumPrices() {
  let total = 0;
  totalPrice.innerHTML = '';
  [...cartItems.children]
    .forEach((item) => {
      let itemPrice = item
        .querySelector('.cart-item-price')
        .innerText.split(' ')[1].replace(',', '.');
      total += Number(itemPrice);
    });
  totalPrice.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  return total;
}

function cartItemClickListener(event) {
  event.target.parentElement.remove();
  if (cartItems.children.length === 0) {
    localStorage.removeItem('cartItems');
    classCartIcon = cartEmpty;
  }
  else saveCartItems(cartItems.innerHTML);
  sumPrices();
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  if (innerText) e.innerText = innerText;
  if (element === 'button') e.addEventListener('click', addProductToCart);
  if (element === 'i') {
    e.title = 'Remove item';
    e.addEventListener('click', cartItemClickListener);
  }
  return e;
}

function createCartItemImage(image) {
  const div = document.createElement('div');
  div.className = 'cart-item-image-container';
  const img = document.createElement('img');
  img.src = image;
  div.appendChild(img);
  return div;
}

function createCartItemInformation() {
  const div = document.createElement('div');
  div.className = 'cart-item-info-container';
  return div;
}

function createCartItemElement({ sku, name, image, price }) {
  const li = document.createElement('li');
  li.className = 'cart-item';
  li.appendChild(createCartItemImage(image));
  const divInfo = createCartItemInformation();
  divInfo.appendChild(createCustomElement('p', 'cart-item-sku', sku));
  divInfo.appendChild(createCustomElement('p', 'cart-item-title', name));
  divInfo.appendChild(createCustomElement('p', 'cart-item-price', `R$ ${price.toFixed(2).replace('.', ',')}`));
  li.appendChild(divInfo);
  li.appendChild(createCustomElement('i', 'fas fa-trash cart-item-remove'));
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
  if (cartIcon.className === classCartIcon) {
    classCartIcon = cartFull;
    cartIcon.className = classCartIcon;
  }
  saveCartItems(cartItems.innerHTML);
  sumPrices();
}

function createProductItemElement({ sku, name, image, price }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item-sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('p', 'item-price', price));
  section.appendChild(createCustomElement('span', 'item-title', name));
  section.appendChild(createCustomElement('button', 'item-add', 'Add to cart'));

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
  if (localStorage.cartItems) {
    classCartIcon = cartFull;
    cartIcon.className = classCartIcon;
    const savedItems = getSavedCartItems();
    cartItems.innerHTML = savedItems;
    [...document.querySelectorAll('.cart-item-remove')]
      .forEach((item) =>  item.addEventListener('click', cartItemClickListener));
    sumPrices();
  }
  document.querySelector('.empty-cart')
    .addEventListener('click', () => {
      cartItems.innerHTML = '';
      classCartIcon = cartEmpty;
      sumPrices();
      localStorage.removeItem('cartItems');
    });
};
