const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const modal = document.getElementById('modal');
const modalImage = document.getElementById('modal-image');
const modalName = document.getElementById('modal-name');
const modalDescription = document.getElementById('modal-description');
const closeBtn = document.getElementsByClassName('close-button')[0];

let products = [];

function getProductIndex(id) {
for (let i = 0; i < products.length; i++) {
if (products[i].id === id) {
return i;
}
}
return -1;
}

function displayProducts() {
    productList.innerHTML = '';
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const tr = document.createElement('tr');
      tr.innerHTML = `<td><img src="${product.image}" alt="${product.name}" width="50"></td><td>${product.name}</td><td>$${product.price.toFixed(2)}</td><td>${product.description}</td><td><button class="view-button" data-id="${product.id}">View</button> <button class="delete-button" data-id="${product.id}">Delete</button></td>`;
      productList.appendChild(tr);
    }
  }
  

function addProduct(name, price, image, description) {
const product = {
id: Date.now(),
name: name,
price: price,
image: image,
description: description
};
products.push(product);
localStorage.setItem('products', JSON.stringify(products));
displayProducts();
}

function deleteProduct(id) {
const index = getProductIndex(id);
if (index !== -1) {
products.splice(index, 1);
localStorage.setItem('products', JSON.stringify(products));
displayProducts();
}
}

function viewProduct(id) {
const index = getProductIndex(id);
if (index !== -1) {
const product = products[index];
modalImage.src = product.image;
modalImage.alt = product.name;
modalName.textContent = product.name;
modalDescription.textContent = product.description;
modal.style.display = 'block';
}
}

productForm.addEventListener('submit', e => {
e.preventDefault();
const name = e.target.elements.name.value;
const price = parseFloat(e.target.elements.price.value);
const image = e.target.elements.image.files[0] ? URL.createObjectURL(e.target.elements.image.files[0]) : '';
const description = e.target.elements.description.value;
addProduct(name, price, image, description);
e.target.reset();
});

productList.addEventListener('click', e => {
if (e.target.classList.contains('delete-button')) {
const id = parseInt(e.target.dataset.id);
deleteProduct(id);
}
if (e.target.classList.contains('view-button')) {
const id = parseInt(e.target.dataset.id);
viewProduct(id);
}
});

closeBtn.addEventListener('click', () => {
modal.style.display = 'none';
});

window.addEventListener('click', e => {
if (e.target === modal) {
modal.style.display = 'none';
}
});

// load products from localStorage on page load
if (localStorage.getItem('products')) {
products = JSON.parse(localStorage.getItem('products'));
displayProducts();
}