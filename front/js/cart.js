displayBasket();

function displayBasket() {
  let items = JSON.parse(localStorage.getItem("items"));
  const cartItems = document.getElementById('cart__items');
  cartItems.innerHTML = "";
  let totalPrice = 0;

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


        cartItems.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
      <div class="cart__item__img">
          <img src=${data.imageUrl} alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
          <div class="cart__item__content__description">
              <h2>${data.name}</h2>
              <p>${color}</p>
              <p>${data.price*quantity} €</p>
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
          let basket = localStorage.getItem("items");
          if (basket == null) {
            return [];
          } else {
            return JSON.parse(basket);
          }
        }

        function saveBasket(basket) {
          localStorage.setItem("items", JSON.stringify(basket));
        }

        function removeFromStorage(product) {
          let basket = getBasket();
          basket = basket.filter(p => p.id != product.id);
          saveBasket(basket);
          displayBasket();
        }

        const removeFromCart = document.getElementsByClassName('deleteItem');

        for (let i = 0; i < removeFromCart.length; i++) {

          removeFromCart[i].addEventListener("click", function () {
            removeFromStorage(items[i]);

          })
        }


        let totalQuantity = 0;
        for (i = 0; i < items.length; i++) {
          totalQuantity += Number(items[i].quantity);

          document.getElementById('totalQuantity').innerHTML = totalQuantity
        }


        totalPrice += quantity * data.price;
        document.getElementById('totalPrice').innerHTML = totalPrice
     

      });

  }
}