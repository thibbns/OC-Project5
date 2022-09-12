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

        // AJOUT DE L'ARTICLE DANS LE HTML
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


        // RECUPERATION DU LOCAL STORAGE
        function getCart() {
          let cart = localStorage.getItem("items");
          if (cart == null) {
            return [];
          } else {
            return JSON.parse(cart);
          }
        }

        // MISE A JOUR DU LOCAL STORAGE
        function saveCart(cart) {
          localStorage.setItem("items", JSON.stringify(cart));
        }

        // CHANGER LA QUANTITE D'UN ARTICLE ET SUPPRESSION SI QUANTITE NULLE
        function changeQuantity(product, quantity) {
          let cart = getCart();
          let foundProduct = cart.find((p => p.id == product.id) && (p => p.color == product.color));
          if (foundProduct != undefined) {
            let foundProductQuantityNumber = Number(foundProduct.quantity)
            foundProductQuantityNumber = quantity;
            foundProduct.quantity = foundProductQuantityNumber
            if (foundProduct.quantity <= 0) {
              removeFromStorage(foundProduct)
            } else {
              saveCart(cart)
            }
          }
        }


        const selectElement = document.querySelectorAll('article');
        for (let i = 0; i < selectElement.length; i++) {
          selectElement[i].addEventListener('change', (event) => {

            let newQuantity = Number(event.target.value)
            const closest = selectElement[i].closest('article')
            let changeId = closest.dataset.id
            let changeColor = closest.dataset.color
            if (newQuantity < 100) {
              changeQuantity({
                id: changeId,
                color: changeColor
              }, newQuantity)

            } else {
              alert('La quantité maximale est 100, Veuillez sélectionner une quantité entre 0 et 100')
            }

          })
        }

        //SUPPRIMER UN ARTICLE
        function removeFromStorage(product) {
          let cart = getCart();
          cart = cart.filter((p => p.id != product.id) && (p => p.color != product.color));
          saveCart(cart);
          displayCart();

        }

        const removeFromCart = document.getElementsByClassName('deleteItem');
        for (let i = 0; i < removeFromCart.length; i++) {
          removeFromCart[i].addEventListener("click", function () {
            removeFromStorage(items[i]);

          })
        }

        // CALCUL QUANTITE TOTALE
        let totalQuantity = 0;
        for (i = 0; i < items.length; i++) {
          totalQuantity += Number(items[i].quantity);
          document.getElementById('totalQuantity').innerHTML = totalQuantity
        }

        // CALCUL DU PRIX TOTAL

        totalPrice += quantity * data.price;
        document.getElementById('totalPrice').innerHTML = totalPrice

        //






        function validateInput(input, regex) {
          if (input.match(regex)) {
            return true
          } else {
            return false
          }
        }


        const firstName = document.getElementById('firstName')
        let regexFirstName = /^[a-zA-Z- éè]{2,25}$/;
        const FirstNameError = document.getElementById('firstNameErrorMsg')

        const lastName = document.getElementById('lastName')
        let regexLastName = /^[a-zA-Z- éè]{2,25}$/;
        const lastNameError = document.getElementById('lastNameErrorMsg')

        const address = document.getElementById('address')

        const city = document.getElementById('city')
        let regexCity = /^[^0-9]{2,100}$/;
        const cityError = document.getElementById('cityErrorMsg')


        const email = document.getElementById('email')
        let regexEmail = /^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+.[a-z]{2,4}$/;
        const emailError = document.getElementById('emailErrorMsg')


        firstName.addEventListener("change", (event) => {
          let input = event.target.value
          if (validateInput((input), regexFirstName) == false) {
            FirstNameError.innerHTML = `format invalide`
          } else {
            FirstNameError.innerHTML = ``
          }

        })


        lastName.addEventListener("change", (event) => {
          let input = event.target.value
          if (validateInput((input), regexLastName) == false) {
            lastNameError.innerHTML = `format invalide`
          } else {
            lastNameError.innerHTML = ``
          }
        })

        city.addEventListener("change", (event) => {
          let input = event.target.value
          if (validateInput((input), regexCity) == false) {
            cityError.innerHTML = `format invalide`
          } else {
            cityError.innerHTML = ``;
          }
        })


        email.addEventListener("change", (event) => {
          let input = event.target.value
          if (validateInput((input), regexEmail) == false) {
            emailError.innerHTML = `format invalide`
          } else {
            emailError.innerHTML = ``
          }
        })
    




        let products = [];

        function getTotalityCart() {
          return getCart().map(p => p.id);
        }
        products = getTotalityCart();





/*
        const order = document.getElementById("order")

        order.addEventListener("submit", function () {
*/


          const contact = {
            firstName: "firstName.value",
            lastName: "lastName.value",
            address: "address.value",
            city: "city.value",
            email: "email.value"
          };

          fetch("http://localhost:3000/api/products/order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contact,
                products
              })
            })

            .then((res) => {
              res.json()
            })
            .catch((err) => {
              console.log(err)
            })

        //})







      });

  }


}