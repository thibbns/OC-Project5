
// RECUPERATION DE L'ID

let params = (new URL(document.location)).searchParams;
let id = params.get('id');

// AFFICHAGE DE L'ID

const orderId = document.getElementById("orderId")
orderId.innerHTML = id;
