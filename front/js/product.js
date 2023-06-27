// RECUPERATION DE L'ID DU PRODUIT SELECTIONNE
let params = (new URL(document.location)).searchParams;
let id = params.get('id');

// CREATION DES VARIABLES POUR AFFICHAGE DES DONNEES DANS LE HTML
const url = 'http://localhost:3000/api/products/' + id;
const description = document.getElementById('description');
const title = document.getElementById('title');
const price = document.getElementById('price');
const img = document.getElementsByClassName('item__img');
const color = document.getElementById('colors');
const addToCart = document.getElementById('addToCart')
let quantity = document.getElementById("quantity")


// APPEL DE L'API
fetch(url)
  .then(function (res) {
    return res.json()
  })

  // AFFICHAGE DU PRODUIT SELECTIONNE VIA L'API DANS LE HTML
  .then(function (item) {
    function showItem(item) {
      title.innerHTML = item.name;
      description.innerHTML = item.description;
      price.innerHTML = item.price;
      img[0].innerHTML = `<img src=${item.imageUrl} alt="${item.altTxt}">`;
      for (i = 0; i < item.colors.length; i++) {
        color.innerHTML += `<option value="${item.colors[i]}" >${item.colors[i]}</option>`
      }
    }
    showItem(item);
  })

  .catch(function (error) {
    console.log(error);
    alert('Une erreur est survenue')
  })

// RECUPERATION DU LOCAL STORAGE
function getCart() {
  let cart = localStorage.getItem("items");
  if (cart == null) {
    return [];
  } else {
    return JSON.parse(cart);
  }
}

// SAUVEGARDE D'UN PRODUIT DANS LE LOCAL STORAGE
function saveCart(cart) {
  localStorage.setItem("items", JSON.stringify(cart));
}

// AJOUT D'UN PRODUIT DANS LE LOCAL STORAGE

function addProductInCart() {
  addToCart.addEventListener("click", function () {
    let cart = getCart();
    let product = {
      "id": id,
      "color": color.value,
      "quantity": quantity.value
    }

    // RAJOUT QUANTITE EN FONCTION DE L'ID ET DE LA COULEUR
    let foundProduct = cart.find((p => p.id == product.id) && (p => p.color == product.color));
    let totalQuantity = cart.reduce((total, p) => total + p.quantity, 0);
    if (color.value === "" || quantity.value <= 0 || quantity.value > 100) {
      alert('Veuillez sélectionner une couleur et indiquer une quantité entre 0 et 100')
    } else if (totalQuantity + parseInt(quantity.value) > 100) {
      alert('La quantité totale dans le panier ne peut pas dépasser 100');
    } else if (foundProduct != undefined) {
      foundProduct.quantity += parseInt(quantity.value);
      alert('La quantité a été mise à jour dans le panier');
    } else {
      product.quantity = parseInt(quantity.value);
      cart.push(product);
      alert('Votre canapé à bien été ajouté au panier')

    }
    saveCart(cart);
  });
}

addProductInCart();