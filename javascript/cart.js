let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

console.log(cart);

function readCart(cart) {
  document.querySelector("#cart").innerHTML = "";
  cart.forEach((products, i) => {
    document.querySelector("#cart").innerHTML += `
                <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${
              products.img
            }" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${products.name}</h5>
                <p class="card-text">Price: R${products.price}</p>
                <input type="number" min=1 value=${products.qty}>
                <p>${parseInt(products.qty) * parseInt(products.price)}</p>
               <button class="btn btn-danger" onclick="deleteCart(${i})">Delete</button>
            </div>
            </div>
        </div>
        </div>
        `;
  });
}
readCart(cart);

function deleteCart(position) {
  cart.splice(position, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
}

function calculateTotal() {
  let total = 0;
  cart.forEach((products) => {
    total = total + products.price * products.qty;
  });
  return total;
}
