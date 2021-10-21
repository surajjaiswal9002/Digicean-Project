const productList2 = document.querySelector(".product-center-01");
const cartContainer = document.querySelector(".container-md");
const cartList = document.querySelector(".cart-list");
const cartTotalValue = document.getElementById('cart-price"');
let cartItemID = 1;

eventListeners();

function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    loadJSON();
  });

  //add to cart
  productList2.addEventListener("click", purchaseProduct);
}


// load the product items content from json file
function loadJSON() {
  fetch("data/products.json")
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      data.products.HEADPHONE.forEach((product)=>
      {
        html += `
                    <div class="product-01">
                        <div class="product-header-01">
                            <img  src="${product.imgsrc}" alt="" >
                
                            <button type="button" class="icons-01">
                            
                                <i class="bx bx-shopping-bag" > </i>Add to cart
                            
                            </button>
                        </div>
                        <div class="product-footer-01">
                            <a href="#"><h3 class="product-name">${product.name}</h3></a>
                            <div class="rating-01">
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class='bx bxs-star-half' ></i>
                            </div>
                            <h4 class="price">₹${product.price}</h4>
                        </div>
                    </div>
            
            
            `;
      });
      data.products.MOBILE.forEach((product)=>
      {
        html += `
                    <div class="product-01">
                        <div class="product-header-01">
                            <img  src="${product.imgsrc}" alt="" >
                
                            <button type="button" class="icons-01">
                            
                                <i class="bx bx-shopping-bag" > </i>Add to cart
                            
                            </button>
                        </div>
                        <div class="product-footer-01">
                            <a href="#"><h3 class="product-name">${product.name}</h3></a>
                            <div class="rating-01">
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class='bx bxs-star-half' ></i>
                            </div>
                            <h4 class="price">₹${product.price}</h4>
                        </div>
                    </div>
            
            
            `;
      });
      data.products.WATCH.forEach((product)=>
      {
        html += `
                    <div class="product-01">
                        <div class="product-header-01">
                            <img  src="${product.imgsrc}" alt="" >
                
                            <button type="button" class="icons-01">
                            
                                <i class="bx bx-shopping-bag" > </i>Add to cart
                            
                            </button>
                        </div>
                        <div class="product-footer-01">
                            <a href="#"><h3 class="product-name">${product.name}</h3></a>
                            <div class="rating-01">
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class="bx bxs-star"></i>
                                <i class='bx bxs-star-half' ></i>
                            </div>
                            <h4 class="price">₹${product.price}</h4>
                        </div>
                    </div>
            
            
            `;
      });
      productList2.innerHTML = html;
    });
}

// purchase products
function purchaseProduct(e) {
  if (e.target.classList.contains("icons-01")) {
    let product = e.target.parentElement.parentElement;
    getProductInfo(product);
  }
}

// get product info after add to cart button click
function getProductInfo(product) {
  let productInfo = {
    id: cartItemID,
    imgsrc: product.querySelector(".product-header-01 img").src,
    name: product.querySelector(".product-name").textContent,
    //category: product.querySelector('.product-category').textContent,
    price: product.querySelector(".price").textContent,
  };
  cartItemID++;
  console.log(productInfo);
  // addToCartList(productInfo);
  saveProductInStorage(productInfo);
}

// save the product in the local storage
function saveProductInStorage(item) {
  let products = getProductFromStorage();
  products.push(item);
  localStorage.setItem("products", JSON.stringify(products));
  
}

// get all the products info if there is any in the local storage
function getProductFromStorage() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // returns empty array if there isn't any product info
}

