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
                <h6>Items</h6>
                <input type="text" min=1 value=${
                  products.qty
                } style="width:50px;">
                <p>R${parseInt(products.qty) * parseInt(products.price)}</p>
               <button class="btn btn-danger" onclick="deleteCart(${i})">Remove item</button>
            </div>
            </div>
        </div>
        </div>
        `;
  });
  try {
    if (cart.length == 0) throw "Go buy soemthing";
    document.querySelector("#cart").innerHTML += `
  <h3 style="margin-top: 60px;"> Your total is R${calculateTotal()}</h3>
  `;
  } catch (err) {
    document.querySelector("#cart").innerHTML = `
    <h3> ${err}</h3>`;

    document.querySelector("#empty").hidden = true;
  }
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
  return total.toFixed(2);
}

function checkOut() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  readCart(cart);
}
