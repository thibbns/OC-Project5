
let item = JSON.parse(localStorage.getItem("item"));

const cartItems = document.getElementById('cart__items');


for (i=0; i<item.length ; i++){
let id = item[i].id
let color = item[i].color
let quantity = item[i].quantity
console.log(item[i])
const url = 'http://localhost:3000/api/products/' + id;

fetch(url)

  .then(function (response) {
    return response.json()
  })

  .then(function (item) {
 
cartItems.innerHTML += `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
        <img src=${item.imageUrl} alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${color}</p>
            <p>${item.price} €</p>
            </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
            </div>
        </div>
    </div>
</article>`


function getBasket() {
    let basket = localStorage.getItem("item");
    if (basket == null) {
      return [];
    } else {
      return JSON.parse(basket);
    }
  }
  
  function saveBasket(basket) {
    localStorage.setItem("item", JSON.stringify(basket));
  }





function removeFromCart(product){
    let basket = getBasket();
    basket = basket.filter(p=>p.id != product.id);
    saveBasket(basket);
}
//removeFromCart(item[i])


//const removeFromCart = document.getElementsByClassName('deleteItem');
const removeFromStorage = document.querySelector(".deleteItem");
removeFromStorage.addEventListener("click", removeFromCart([{id:"415b7cacb65d43b2b5c1ff70f3393ad1"}]));








console.log(item.length)
let totalPrice=0
for (i=0; i<item.length; i++){
    totalPrice+= Number(item[i].quantity);
console.log(item.length)
}



})
}



let totalQuantity=0
for (i=0; i<item.length; i++){
    totalQuantity+= Number(item[i].quantity);

    document.getElementById('totalQuantity').innerHTML = totalQuantity
}








