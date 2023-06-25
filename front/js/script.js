const url = 'http://localhost:3000/api/products';
const items = document.getElementById('items');
items.innerHTML = "";

fetch(url)
  .then((res) => res.json())
  .then(function (data) {

    for (i = 0; i < data.length; i++) {
      let id = data[i]._id;
      let image = data[i].imageUrl;
      let name = data[i].name;
      let description = data[i].description;
      let alt = data[i].altTxt;

      items.innerHTML += `<a href="./product.html?id=${id}">
      <article>
        <img src=${image} alt="${alt}">
        <h3 class="productName">${name}</h3>
          <p class="productDescription">${description}</p>
      </article>
    </a>`
    }
  })

  .catch(function (error) {
    console.log(error);
    alert('Une erreur est survenue')

  });