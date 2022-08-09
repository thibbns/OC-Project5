let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);


const url = 'http://localhost:3000/api/products';




let product_sheet = fetch('http://localhost:3000/api/products')
.then(function(response){
    return response.json()
})
.then(function(data){

    function afficheDatas(data) {
        data.map(function(produit) {
       
            if (produit._id==id)
            
       
          {  console.log(produit.name)}
        });
      }

afficheDatas(data);
});

