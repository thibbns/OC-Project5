let params = (new URL(document.location)).searchParams;
let id = params.get('id');


const url = 'http://localhost:3000/api/products';
const description = document.getElementById('description');
const title = document.getElementById('title');
const price = document.getElementById('price');
const img = document.getElementsByClassName('item__img');
const color = document.getElementById('colors');
const addToCart = document.getElementById('addToCart')
const quantity = document.getElementById("quantity")


fetch(url)

  .then(function (response) {
    return response.json()
  })

  .then(function (item) {
    function showItems(items) {
      items.map(function (item) {

        if (item._id === id) {

          title.innerHTML = item.name;
          description.innerHTML = item.description;
          price.innerHTML = item.price;
          img[0].innerHTML = `<img src=${item.imageUrl} >`;

          for (i = 0; i < item.colors.length; i++) {
            color.innerHTML += `<option value="${item.colors[i]}" >${item.colors[i]}</option>`
          }

          function addToLocalStorage() {
            localStorage.id = id;
            localStorage.quantity = quantity.value;
            localStorage.colors = color.value;

          }

          addToCart.addEventListener('click', addToLocalStorage)

        }
      });
    }
    showItems(item);
  })

  .catch(function (error) {
    console.log(error);
  })
