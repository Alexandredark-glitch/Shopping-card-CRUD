
const dessertCards = document.getElementById("dessert-card-container");
const cartItemsContainer = document.getElementById("cart-items-container"); // Container for cart list
let numberOfItem = document.getElementById("total-items");
let subTotal = document.getElementById("subtotal");
let productsContainer = document.getElementById("products-container");
let taxesText = document.getElementById("taxes");
let totalText = document.getElementById("total")
const clearCartBtn = document.getElementById("clear-cart-btn");
const cartContainer = document.getElementById("cart-container")

let arr = [];

const products = [
  { id: 1, name: "Vanilla Cupcakes (6 Pack)", price: 12.99, category: "Cupcake", quantity: 1 },
  { id: 2, name: "French Macaron", price: 3.99, category: "Macaron", quantity: 1 },
  { id: 3, name: "Pumpkin Cupcake", price: 3.99, category: "Cupcake", quantity: 1},
  { id: 4, name: "Chocolate Cupcake", price: 5.99, category: "Cupcake", quantity: 1 },
  { id: 5, name: "Chocolate Pretzels (4 Pack)", price: 10.99, category: "Pretzel", quantity: 1 },
  { id: 6, name: "Strawberry Ice Cream", price: 2.99, category: "Ice Cream", quantity: 1 },
  { id: 7, name: "Chocolate Macarons (4 Pack)", price: 9.99, category: "Macaron", quantity: 1 },
  { id: 8, name: "Strawberry Pretzel", price: 4.99, category: "Pretzel", quantity: 1 },
  { id: 9, name: "Butter Pecan Ice Cream", price: 2.99, category: "Ice Cream", quantity: 1 },
  { id: 10, name: "Rocky Road Ice Cream", price: 2.99, category: "Ice Cream", quantity: 1 },
  { id: 11, name: "Vanilla Macarons (5 Pack)", price: 11.99, category: "Macaron", quantity: 1 },
  { id: 12, name: "Lemon Cupcakes (4 Pack)", price: 12.99, category: "Cupcake", quantity: 1 }
];

dessertCards.innerHTML = products.map(({name, price, category,id}) => {
    return `<div class="dessert-card">
        <h2>${name}</h2>
        <p class="dessert-price">$${price}</p>
        <p class="product-category">Category: ${category}</p>
        <button 
          id="${id}" 
          class="btn add-to-cart-btn">Add to cart
        </button>
      </div>`
}).join("")



document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const eventId = e.currentTarget.id;
    const eventParentClass = e.currentTarget.parentElement.className
    if (eventId === "show-cart-btn") {
      if (e.currentTarget.textContent.includes("Show")) {
        e.currentTarget.textContent = "Hide Cart";
        cartContainer.style.display = "block"
      }
      else {
        e.currentTarget.textContent = "Show Cart"
        cartContainer.style.display = "none"
      }
    }
  
    else if (eventParentClass.includes("dessert")) {
      storing(Number(eventId));
      incrementItem();
      calculatingSubTotal();
      UIChange();
      calculatingTaxes();
      calculatingTotal();
  }


  })
})

const storing = (id) => {
  const ItemAlreadyThere = arr.find(item => item.id === id);
  const indexToStore = products.findIndex(item => item.id === id);
  

  if (ItemAlreadyThere) {
    
    ItemAlreadyThere.quantity++
  }
  else {
    arr.push({...products[indexToStore]});
  }
  
  console.log(arr);

}

const UIChange = () => {
  let result = arr.map(({id, quantity, name, price}) => {
   
    return `<div id="dessert{${id}" class="product">
        <p>
          <span class="product-count" id="product-count-for-id${id}">${quantity}x</span>${name}
        </p>
        <p>${price}</p>
    </div>`
  }).join("")
  productsContainer.innerHTML = result;
}

const incrementItem = () => {

  let result = arr.reduce((acc, { quantity }) => {
    return quantity + acc 
  
  }, 0)
  numberOfItem.textContent = result;

}

const calculatingSubTotal = () => {
  let result = arr.reduce((acc, { price, quantity }) => {
  return (price * quantity) + acc
 }, 0)

  subTotal.textContent = `$${result.toFixed(2)}`;
}

const calculatingTaxes = () => {

  let result = arr.reduce((acc, { price, quantity }) => {
  return (price * quantity) + acc
}, 0)

  taxesText.textContent = `$${(result * 0.0830).toFixed(2)}`
}

const calculatingTotal = () => {
  let result = arr.reduce((acc, { price, quantity }) => {
    return (price * quantity) + acc
  }, 0)
  const tax = result * 0.0830
  totalText.textContent = `$${(result + tax).toFixed(2)}`
}

clearCartBtn.addEventListener("click", () => {
  totalText.textContent = `$${0}`
  taxesText.textContent = `$${0}`
  subTotal.textContent = `$${0}`
  arr.length = 0;
  numberOfItem.textContent = 0
  productsContainer.innerHTML = "";
})
