const productList = document.querySelector('.product-center');
const cartContainerindex= document.querySelector('.container-md');
 const cartListindex= document.querySelector('.cart-list');
 const cartTotalValueindex = document.querySelector('.cart-total-value')
let cartItemIDindex =1;

eventListeners();

function eventListeners() {
    window.addEventListener(' DOMContentLoaded ', () => {
        loadJSON();
    });

   //add to cart
   productList.addEventListener('click',purchaseProductt);

}

//feature product fetch function
// load the product items content from json file
function loadJSON() {
    fetch('data/index.json')
    .then(response => response.json())
    .then(data => {
        let html ='';
        data.forEach(product => {
            html += `
            <div class="product">
            <div class="product-header">
                <img src="${product.imgsrc}  " alt="">
    
                <button type="button" class="icons">
                            
                    <i class="bx bx-shopping-bag-" > </i>Add to cart
            
                </button>
            </div>
            <div class="product-footer">
                <a href="product.html"><h3 class="product-name">${product.name}</h3></a>
                <div class="rating">
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
        productList.innerHTML = html;
    })
}

/// purchase products
function purchaseProductt(e) {
    if(e.target.classList.contains('icons'))
    {
        let product = e.target.parentElement.parentElement;
        console.log(product);
        getProductInfo(product);
    }
}

// get product info after add to cart button click
function getProductInfo(product){
    let productInfo = {
        id: cartItemID,
        imgsrc: product.querySelector('.product-header   img').src,
        name: product.querySelector('.product-name').textContent,
        //category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.price').textContent
    }
    cartItemID++;
    console.log(productInfo)
   // addToCartList(productInfo);
    saveProductInStorage(productInfo);
}

// save the product in the local storage
function saveProductInStorage(item){
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    
}

// get all the products info if there is any in the local storage
function getProductFromStorage(){
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    // returns empty array if there isn't any product info
}


// calculate total price of the cart and other info
function findCartInfo(){
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1)); // removing rupee sign
        return acc += price;
    }, 0); // adding all the prices

    return{
        total: total.toFixed(2),
        productCount: products.length
    }
}

// delete product from cart list and local storage
function deleteProduct(e){
    let cartItemID;
    if(e.target.tagName === "BUTTON"){
        cartItemID = e.target.parentElement;
        cartItemID.remove(); // this removes from the DOM only
    } else if(e.target.tagName === "I"){
        cartItemID = e.target.parentElement.parentElement;
        cartItemID.remove(); // this removes from the DOM only
    }

    let products = getProductFromStorage();
    let updatedProducts = products.filter(product => {
        return product.id !== parseInt(cartItemID.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts)); // updating the product list after the deletion
    updateCartInfo();
}
