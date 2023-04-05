displayCart();

function displayCart() {
  let items = JSON.parse(localStorage.getItem("items"));
  const cartItems = document.getElementById('cart__items');
  const totalQuantity = document.getElementById('totalQuantity');
  const totalPrice = document.getElementById('totalPrice');

  // INITIALISATION DES VARIABLES
  totalPrice.innerHTML = 0;
  totalQuantity.innerHTML = 0;
  cartItems.innerHTML = "";
  totalPriceMultipliedByQuantity = 0;


  for (i = 0; i < items.length; i++) {
    let id = items[i].id
    let color = items[i].color
    let quantity = Number(items[i].quantity);

    const url = 'http://localhost:3000/api/products/' + id;
    fetch(url)

      .then(function (res) {
        return res.json()
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

        totalPriceCart(quantity, data.price);
        totalQuantityCart(items);

        // CHANGEMENT DE LA QUANTITE D'UN PRODUIT
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


        // SUPPRESSION D'UN ARTICLE DU PANIER
        const removeFromCart = document.getElementsByClassName('deleteItem');
        for (let i = 0; i < removeFromCart.length; i++) {
          removeFromCart[i].addEventListener("click", function () {
            removeFromStorage(items[i]);
          })
        }


        // VERIFICATION DU FORMAT DES CHAMPS COMPLETES
        const firstName = document.getElementById('firstName');
        let regexFirstName = /^[a-zA-Z- éè]{2,25}$/;
        const firstNameError = document.getElementById('firstNameErrorMsg');
        verifyFirstName(firstName, regexFirstName, firstNameError);

        const lastName = document.getElementById('lastName');
        let regexLastName = /^[a-zA-Z- éè]{2,25}$/;
        const lastNameError = document.getElementById('lastNameErrorMsg');
        verifyLastName(lastName, regexLastName, lastNameError);

        const city = document.getElementById('city');
        let regexCity = /^[^0-9]{2,100}$/;
        const cityError = document.getElementById('cityErrorMsg');
        verifyCity(city, regexCity, cityError);

        const email = document.getElementById('email');
        let regexEmail = /^[a-zA-Z0-9-_]+@[a-zA-Z0-9-_]+.[a-z]{2,4}$/;
        const emailError = document.getElementById('emailErrorMsg');
        verifyEmail(email, regexEmail, emailError);


        // VALIDATION DE LA COMMANDE AVEC VERIFICATION DES CHAMPS DU FORMULAIRE
        const order = document.getElementById("order");
        order.addEventListener('click', (e) => {
          const firstName = document.getElementById('firstName');
          const lastName = document.getElementById('lastName');
          const address = document.getElementById('address');
          const city = document.getElementById('city');
          const email = document.getElementById('email');
          const contact = {
            firstName: firstName.value,
            lastName: lastName.value,
            address: address.value,
            city: city.value,
            email: email.value
          };
          e.preventDefault();
          if ((validateInput((firstName.value), regexFirstName) == true) &&
            (validateInput((lastName.value), regexLastName) == true) &&
            (validateInput((city.value), regexCity) == true) &&
            (validateInput((email.value), regexEmail) == true)) {
            postOrder(products, contact)
          } else {
            alert('Le format d\'un ou des champs saisis est incorrect')
          }
        });
      });
  }
}


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
  displayCart();
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

//SUPPRIMER UN ARTICLE
function removeFromStorage(product) {
  let cart = getCart();
  cart = cart.filter((p => p.id != product.id) && (p => p.color != product.color));
  saveCart(cart);
}

// CALCUL QUANTITE TOTALE
function totalQuantityCart(items) {
  let totalQuantityNumber = 0;
  for (i = 0; i < items.length; i++) {
    totalQuantityNumber += Number(items[i].quantity);
    totalQuantity.innerHTML = totalQuantityNumber;
  }
}

// CALCUL DU PRIX TOTAL
function totalPriceCart(quantity, price) {
  totalPriceMultipliedByQuantity += quantity * price;
  totalPrice.innerHTML = totalPriceMultipliedByQuantity;
}

// VERIFICATION DU FORMAT DES INPUTS
function validateInput(input, regex) {
  if (input.match(regex)) {
    return true
  } else {
    return false
  }
}


// FONCTIONS DE VERIFICATION DES CHAMPS ET AFFICHAGE SI FORMAT INVALIDE
function verifyFirstName(firstName, regexFirstName, firstNameError) {
  firstName.addEventListener("change", (event) => {
    let input = event.target.value;
    if (validateInput((input), regexFirstName) == false) {
      firstNameError.innerHTML = `format invalide`
    } else {
      firstNameError.innerHTML = ``
    }
  })
}

function verifyLastName(lastName, regexLastName, lastNameError) {
  lastName.addEventListener("change", (event) => {
    let inputLastName = event.target.value;
    if (validateInput((inputLastName), regexLastName) == false) {
      lastNameError.innerHTML = `format invalide`
    } else {
      lastNameError.innerHTML = ``
    }
  })
}

function verifyCity(city, regexCity, cityError) {
  city.addEventListener("change", (event) => {
    let input = event.target.value;
    if (validateInput((input), regexCity) == false) {
      cityError.innerHTML = `format invalide`
    } else {
      cityError.innerHTML = ``;
    }
  })
}

function verifyEmail(email, regexEmail, emailError) {
  email.addEventListener("change", (event) => {
    let input = event.target.value;
    if (validateInput((input), regexEmail) == false) {
      emailError.innerHTML = `format invalide`
    } else {
      emailError.innerHTML = ``
    }
  })
}


// CREATION ARRAY DES PRODUITS PAR ID
let products = [];

function getTotalityCart() {
  return getCart().map(p => p.id);
}
products = getTotalityCart();


// FONCTION POST POUR ENVOI DES DONNEES ET RECUPERATION DE L'ORDER_ID
async function postOrder(products, contact) {

  fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        contact,
        products
      })


    })

    .then(function (res) {
      if (res.ok) {
        return res.json()
      } else {
        console.log(res)
      }
    })

    .then(function (data) {
      document.location.href = `./confirmation.html?id=${data.orderId}`;
      localStorage.clear()

    })

    .catch((err) => {
      console.log(err)
    })


}