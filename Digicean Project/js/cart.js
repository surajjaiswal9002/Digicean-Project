const cartContainer = document.querySelector(".container-md");
const cartList = document.querySelector(".cart-list");
const cartTotalValue = document.getElementById("cart-total-value");
const cartCountInfo = document.getElementsByClassName('.cart');

product = getProductFromStorage();

eventListeners();

function eventListeners() {
  window.addEventListener("DOMContentLoaded", () => {
    loadproductincart();
  });

  //delete from cart
  cartList.addEventListener("click", deleteProduct);
}

function updateCartInfo() {
  let cartInfo = findCartInfo();
  // console.log(cartInfo);
  cartCountInfo.textContent=cartInfo.productCount;
  cartTotalValue.textContent = cartInfo.total;
}

console.log(updateCartInfo());


//latest  product fetch function
function loadproductincart() {
  let html = "";
  product.forEach((product) => {
    html += `

             <table>
                           
                             <tr>
                                 <td>
                                 
                                 <div class="cart-item" data-id="${product.id}"><br>
                                
                                     <img src="${product.imgsrc}" alt="" >
                                     <div class="cart-item-info"  >
                                     <h3 class="cart-item-name">${product.name}</h3>
                                     <span class="cart-item-price">Price: ${product.price}</span><br>
                                    
                                     <button type="button" class="cart-info-btn">remove</button><br>
                                     
                                     </div>
                                 </div>
                                 <td> </td>
                                 </td>
                                 
                                
                             </tr>
                             
             
                         </table> 
                   
            
            
            `;
  });
  
     cartList.innerHTML = html;
    console.log(html);
}

// get all the products info if there is any in the local storage
function getProductFromStorage() {
  return localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : [];
  // returns empty array if there isn't any product info
}

// load carts product
function loadCart() {
  let products = getProductFromStorage();
  if (products.length < 1) {
    cartItemID = 1; // if there is no any product in the local storage
  } else {
    cartItemID = products[products.length - 1].id;
    cartItemID++;
    // else get the id of the last product and increase it by 1
  }
  products.forEach((product) => addToCartList(product));
  // calculate and update UI of cart info
  updateCartInfo();
}

// calculate total price of the cart and other info
function findCartInfo() {
  let products = getProductFromStorage();
  let total = products.reduce((acc, product) => {
    let price = parseFloat(product.price.substr(1)); // removing ₹ sign
    return (acc += price);
  }, 0); //adding all the price
  //console.log(total);

  return {
    total: total.toFixed(2),
    productCount: products.length,
  };
}

findCartInfo();

// delete product from cart list and local storage
function deleteProduct(e) {
  let cartItem;
  if (e.target.tagName === "BUTTON") {
    cartItem = e.target.parentElement.parentElement;
    cartItem.remove(); // this removes from the DOM only

  } else if (e.target.tagName === "I") {
    cartItem = e.target.parentElement.parentElement;
    cartItem.remove(); // this removes from the DOM only

  }


  let products = getProductFromStorage();
  let updatedProducts = products.filter((product) => {
    return product.id !== parseInt(cartItem.dataset.id);
  });
  
  localStorage.setItem("products", JSON.stringify(updatedProducts)); // updating the product list after the deletion
  updateCartInfo();
}
