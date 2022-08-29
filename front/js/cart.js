let items = JSON.parse(localStorage.getItem("items"));

const cartItems = document.getElementById('cart__items');


for (i = 0; i < items.length; i++) {
  let id = items[i].id
  let color = items[i].color
  let quantity = items[i].quantity

  
  const url = 'http://localhost:3000/api/products/' + id;
  fetch(url)

    .then(function (response) {
      return response.json()
    })

    .then(function (data) {

        console.log(id)
        cartItems.innerHTML += `<article class="cart__item" data-id="${items.id}" data-color="${color}">
    <div class="cart__item__img">
        <img src=${data.imageUrl} alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${data.name}</h2>
            <p>${color}</p>
            <p>${data.price} €</p>
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
        console.log(items)
      });

      console.log(items)


      //localStorage.removeItem({id:'415b7cacb65d43b2b5c1ff70f3393ad1'})

      function getBasket() {
        let basket = localStorage.getItem("items");
        if (basket == null) {
          return [];
        } else {
          return JSON.parse(basket);
        }
      }




      function removeFromStorage(product) {
        let basket = getBasket();
        basket = basket.filter(p=> p.id != product.id);
        saveBasket(basket); 
      }

      function saveBasket(basket) {
        localStorage.setItem("items", JSON.stringify(basket));
      }




removeFromStorage({id:"107fb5b75607497b96722bda5b504926"})


      /*function removeItems("415b7cacb65d43b2b5c1ff70f3393ad1") {
        const removeFromCart = document.querySelector('.deleteItem')
        localStorage.removeItem("415b7cacb65d43b2b5c1ff70f3393ad1")
      }
removeItems
      console.log({id:"415b7cacb65d43b2b5c1ff70f3393ad1"})
*/

/*
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


  let basket = getBasket();
  let product = {
    "id": id,
    "color": color.value,
    "quantity": quantity.value
  }

  let foundProduct = basket.find((p => p.id == product.id) && (p => p.color == product.color));
  if (foundProduct != undefined) {

  } else {
    product.quantity = quantity.value;

    basket.push(product);
  }

*/





  //const removeFromCart = document.getElementsByClassName('deleteItem');



  //removeFromStorage.addEventListener("click", removeFromCart([{id:"415b7cacb65d43b2b5c1ff70f3393ad1"}]));









}


let totalPrice = 0
for (i = 0; i < items.length; i++) {
  totalPrice += Number(items[i].quantity) * parseInt(items.price);




}


let totalQuantity = 0
for (i = 0; i < items.length; i++) {
  totalQuantity += Number(items[i].quantity);

  document.getElementById('totalQuantity').innerHTML = totalQuantity



}
