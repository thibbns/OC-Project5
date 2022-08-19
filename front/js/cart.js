
let item = JSON.parse(localStorage.getItem("item"));


const cartItems = document.getElementById('cart__items');
let id = item[0].id
let color = item[0].color
let quantity = item[0].quantity

const url = 'http://localhost:3000/api/products/' + id;

fetch(url)

  .then(function (response) {
    return response.json()
  })

  .then(function (item) {
 
cartItems.innerHTML = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
        <img src=${item.imageUrl} alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${item.name}</h2>
            <p>${color}</p>
            <p>${item.price*quantity} €</p>
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


})



console.log(item[1].id)
console.log(item[1].color)
console.log(item[1].quantity)
console.log(item.price)

