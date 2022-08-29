let params = (new URL(document.location)).searchParams;
let id = params.get('id');


const url = 'http://localhost:3000/api/products/' + id;
const description = document.getElementById('description');
const title = document.getElementById('title');
const price = document.getElementById('price');
const img = document.getElementsByClassName('item__img');
const color = document.getElementById('colors');
const addToCart = document.getElementById('addToCart')
let quantity = document.getElementById("quantity")


fetch(url)

  .then(function (response) {
    return response.json()
  })

  .then(function (item) {
    function showItem(item) {

      title.innerHTML = item.name;
      description.innerHTML = item.description;
      price.innerHTML = item.price;
      img[0].innerHTML = `<img src=${item.imageUrl} >`;

      for (i = 0; i < item.colors.length; i++) {
        color.innerHTML += `<option value="${item.colors[i]}" >${item.colors[i]}</option>`
      }
    }

    showItem(item);
  })

  .catch(function (error) {
    console.log(error);
  })


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

addToCart.addEventListener("click", function () {
  let basket = getBasket();
  let product = {
    "id": id,
    "color": color.value,
    "quantity": quantity.value
  }
  
  let foundProduct = basket.find((p => p.id == product.id) && (p => p.color == product.color));
  if (foundProduct != undefined) {
  
    let un = parseInt(product.quantity);
    let deux = parseInt(foundProduct.quantity);
    un;  // ne change rien
    console.log(un); // affiche la bonne valeur

  } else {
    product.quantity = quantity.value;

    basket.push(product);
  }
  saveBasket(basket);

});