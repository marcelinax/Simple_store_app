"use strict";

class Product {
  constructor(productName, productPrice) {
    this.productName = productName;
    this.productPrice = productPrice;
    this.renderNewProduct();
    this.initAddProductToTheCart();
  }
  renderNewProduct() {
    const productItem = document.createElement("li");
    productItem.classList.add("product-item");

    const productsList = document.querySelector(".products-list");
    let content = `
      <h4 class="product-item-name">${this.productName}</h4>
      <p class="product-item-price-value">$${this.productPrice}</p>
      <button class="shopping-cart"></button>
      `;
    productItem.innerHTML = content;
    productsList.appendChild(productItem);
  }

  addProductToTheCart() {
    const shoppingBagProductsBox = document.querySelector(
      ".shopping-bag-products"
    );
    const shoppingBagSection = document.querySelector(".shopping-bag-section");
    const shoppingBagProductBox = document.createElement("div");
    shoppingBagProductBox.classList.add("shopping-bag-product");
    let content = `
          <h5>${this.productName}</h5>
          <button class="delete-btn"></button>
          <p>${this.productPrice}$</p>
      `;
    shoppingBagProductBox.innerHTML = content;
    shoppingBagProductsBox.appendChild(shoppingBagProductBox);
    shoppingBagSection.appendChild(shoppingBagProductsBox);
  }
  initAddProductToTheCart() {
    const shoppingCartBtns = document.querySelectorAll(".shopping-cart");
    shoppingCartBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        if (
          e.target.parentElement.firstElementChild.textContent ===
          this.productName
        )
          this.addProductToTheCart();
        return;
      });
    });
  }
}

class Products {
  products = [];
  constructor() {
    this.initCreateNewProduct();
    this.readFromLocalStorage();
  }

  saveInLocalStorage() {
    localStorage.setItem("products", JSON.stringify(this.products));
  }
  readFromLocalStorage() {
    this.products = [];
    const localProduct = localStorage.getItem("products");
    if (localProduct) {
      const productsShapes = JSON.parse(localStorage.getItem("products"));
      productsShapes.forEach((productShape) => {
        const product = new Product(
          productShape.productName,
          productShape.productPrice
        );
        this.products.push(product);
      });
    }
  }
  createNewProduct() {
    const productNameValue = document.getElementById("product-name").value;
    const productPriceValue = Number(
      document.getElementById("product-price").value
    );

    if (!productNameValue) {
      alert("You must enter a product name!");
      return;
    }

    if (!productPriceValue || typeof productPriceValue != "number") {
      alert("You must enter a valid price!");
      return;
    }

    if (
      this.products.filter(
        (product) => product.productName === productNameValue
      ).length > 0
    )
      return;
    else {
      const product = new Product(productNameValue, productPriceValue);
      this.products.push(product);
      this.saveInLocalStorage();
    }
    document.getElementById("product-name").value = "";
    document.getElementById("product-price").value = "";
  }
  initCreateNewProduct() {
    const addBtn = document.querySelector(".add-product-btn");
    addBtn.addEventListener("click", () => {
      this.createNewProduct();
    });
  }
}

class ShoppingBag {
  constructor() {
    this.initCreateShoppingBagBox();
  }
  createShoppingBagBox() {
    const shoppingBagBox = document.createElement("section");
    shoppingBagBox.classList.add("shopping-bag-section");
    let content = `
          <h3>Shopping bag</h3>
          <div class="shopping-bag-products"></div>
          <h4>Sum</h4>
        `;
    shoppingBagBox.innerHTML = content;
    document.body.prepend(shoppingBagBox);
  }
  initCreateShoppingBagBox() {
    const shoppingBagBtn = document.querySelector(".shopping-bag-icon");
    shoppingBagBtn.addEventListener("click", () => {
      this.createShoppingBagBox();
    });
  }
}

const products = new Products();
const shoppingBag = new ShoppingBag();
