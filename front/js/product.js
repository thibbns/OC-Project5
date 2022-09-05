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


addToCart.addEventListener("click", function () {
  let cart = getCart();
  let product = {
    "id": id,
    "color": color.value,
    "quantity": quantity.value
  }
  
  let foundProduct = cart.find((p => p.id == product.id) && (p => p.color == product.color));
  if ((color.value == "") || (quantity.value == 0)) {
alert('Veuillez sélectionner une couleur et indiquer une quantité entre 0 et 100')
  } else if (foundProduct != undefined){
    
  } else {
    product.quantity = quantity.value;

    cart.push(product);
   
  }
saveCart(cart);
});