displayCart();

function displayCart() {
  let items = JSON.parse(localStorage.getItem("items"));
  const cartItems = document.getElementById('cart__items');
  cartItems.innerHTML = "";
  totalPrice = 0;

  for (i = 0; i < items.length; i++) {
    let id = items[i].id
    let color = items[i].color
    let quantity = Number(items[i].quantity);

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



        function getCart() {
          let cart = localStorage.getItem("items");
          if (cart == null) {
            return [];
          } else {
            return JSON.parse(cart);
          }
        }

        function saveCart(cart) {
          localStorage.setItem("items", JSON.stringify(cart));
        }


        function changeQuantity(product, quantity) {
          let cart = getCart();
          let foundProduct = cart.find((p => p.id == product.id)&&(p => p.color == product.color));
          if (foundProduct != undefined) {
            let foundProductQuantityNumber = Number(foundProduct.quantity)
            foundProductQuantityNumber = quantity;
            foundProduct.quantity = foundProductQuantityNumber
          }
          saveCart(cart);
        }



        const selectElement = document.querySelectorAll('article');

        for (let i = 0; i < selectElement.length; i++) {

          selectElement[i].addEventListener('change', (event) => {

            let newQuantity = Number(event.target.value)
            const closest = selectElement[i].closest('article')
            let changeId = closest.dataset.id
            let changeColor = closest.dataset.color
            changeQuantity({id: changeId, color: changeColor}, newQuantity)

          })
        }






        function removeFromStorage(product) {
          let cart = getCart();
          cart = cart.filter((p => p.id != product.id)&&(p => p.color != product.color));
          saveCart(cart);
          displayCart();
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