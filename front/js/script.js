function createNode(element) {
  return document.createElement(element);
}

function append(parent, el) {
  return parent.appendChild(el);
}

const section = document.getElementById('items');
const url = 'http://localhost:3000/api/products';

fetch(url)
  .then((resp) => resp.json())
  .then(function (data) {
    let items = data;
    return items.map(function (item) {
      let a = createNode('a');
      let article = createNode('article');
      let img = createNode('img');
      let h3 = createNode('h3');
      let p = createNode('p');
      let h4 = createNode('h4');

      a.href = "./product.html?id=" + item._id;
      img.src = item.imageUrl;
      img.alt = item.altTxt;
      h3.innerHTML = item.name;
      h4.innerHTML = item.price + " €";
      p.innerHTML = item.description;

      append(article, img);
      append(article, h3);
      append(section, a);
      append(article, p);
      append(article, h4);
      append(a, article);
    })
  })

  .catch(function (error) {
    console.log(error);

  });