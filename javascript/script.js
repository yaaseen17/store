let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        name: "henties",
        catergory: "Juices",
        price: "10",
        img: "https://www.game.co.za/medias/583388-EA-1200x1200.jpg?context=bWFzdGVyfGltYWdlc19vbmVjb218MTQxNzE4fGltYWdlL2pwZWd8aDFhL2gyOC84OTU0NTU1NzYwNjcwLmpwZ3w2OGRmNTgyMDBhNjNjNzM1YWIxZmIzMTVkMDgyNjI3Y2NkMjk4NWE4YWM2Y2ZmNTI1NTJhMDljZDk3OTVlOTdh",
      },
      {
        name: "lindt",
        catergory: "fruits",
        price: "5",
        img: "https://www.melskitchencafe.com/wp-content/uploads/french-bread-roll1.jpg",
      },
      {
        name: "chocolate",
        catergory: "Sweets",
        price: "8",
        img: "https://www.checkers.co.za/medias/10398824EA-20190726-Media-checkers515Wx515H?context=bWFzdGVyfGltYWdlc3wxMTY1NzV8aW1hZ2UvcG5nfGltYWdlcy9oNzMvaGYwLzg4NTg5NjM5MzUyNjIucG5nfDU3OTYxZDcxN2I5OTY5ZjNlYjMwOTM1NzRmNDMxMDU3MzI0YWIzMzA0ZmNjNmExZGMzZDAxOTFlNzk4NGU2Y2Q",
      },
      {
        name: "loaf",
        catergory: "fruits",
        price: "10 000",
        img: "https://www.thespruceeats.com/thmb/aKWwztjCoTsiPzayXvDYx6QLyOs=/4288x2412/smart/filters:no_upscale()/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg",
      },
    ];

let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

function readData(products) {
  document.querySelector("#products").innerHTML = "";

  products.forEach((products, i) => {
    document.querySelector("#products").innerHTML += `
   
    <div class="card col-4 " style="width: 18rem;">
    <img src="${products.img}" >
    <div class="card-body">
      <h5 class="card-title">${products.name}</h5>
      <p class="card-text">R${products.price}</p>
      <input type="number" min =1 id="addQty${i}" value=1 style="width:50px;"><br>
      <button
      type="button"
      class="btn btn-dark"
      onclick="deleteProducts(${i})"
    >
      Delete
    </button>
    
    <button
          type="button"
          class="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#edit${i}"
        >
          Edit
        </button>
        
        <button
        type="button"
        class="btn btn-primary"
        onclick="addToCart(${i})"
      >
        Add to cart
      </button>
    </div>
  </div>
  <div
  class="modal fade"
  id="edit${i}"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="">Edit Product</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <input type="text" placeholder="Enter name" id="title-${i}" value="${products.name}"/>
        <input type="text" placeholder="Enter price" id="price-${i}" value="${products.price}" />
        <input type="text" placeholder="Enter img url" id="image-${i}" value="${products.img}"/>
        <select name="catergory" id="catergory-${i}" value="${products.catergory}">
          <option value="fruits">fruits</option>
          <option value="Sweets">Sweets</option>
          <option value="Juices">Juices</option>
        </select>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
        data-bs-toggle="modal"
        data-bs-target="#edit${i}"
          type="button"
          class="btn btn-primary"
          onclick="editProducts(${i})"
        >
          Save changes
        </button>
      </div>
    </div>
  </div>
</div>
        `;

    let totalQty = 0;

    cart.forEach((item) => {
      totalQty += parseInt(item.qty);
    });
    if (totalQty != 0) {
      document.querySelector("#badge").innerHTML = totalQty;
    }
  });
}
readData(products);

function createProducts() {
  let name = document.querySelector("#title").value;
  let price = document.querySelector("#price").value;
  let img = document.querySelector("#image").value;
  let catergory = document.querySelector("#catergory").value;
  try {
    if (name == "") throw "versin";

    products.push({
      name,
      price,
      img,
      catergory,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readData(products);
  } catch (error) {
    alert(error);
  }
}

function deleteProducts(i) {
  products.splice(i, 1);
  localStorage.setItem("products", JSON.stringify(products));
  readData(products);
}

function editProducts(i) {
  let name = document.querySelector(`#title-${i}`).value;
  let price = document.querySelector(`#price-${i}`).value;
  let img = document.querySelector(`#image-${i}`).value;
  let catergory = document.querySelector(`#catergory-${i}`).value;
  products[i] = {
    name,
    price,
    img,
    catergory,
  };
  localStorage.setItem("products", JSON.stringify(products));
  readData(products);
}

function addToCart(i) {
  let qty = document.querySelector(`#addQty${i}`).value;
  let added = false;
  cart.forEach((p) => {
    if (p.name == products[i].name) {
      p.qty = parseInt(p.qty) + parseInt(qty);
      added = true;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  });

  if (!added) {
    cart.push({ ...products[i], qty });
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  readData(products);
}

function catergorySort() {
  let catergory = document.querySelector("#catergorySort").value;

  console.log(catergorySort);

  if (catergory == "all") {
    readData(products);
    return;
  }

  let filteredProducts = products.filter((products) => {
    return products.catergory == catergory;
  });

  readData(filteredProducts);
}

function priceSort() {
  let direction = document.querySelector("#priceSort").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readData(sortedProducts);
}

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortedProducts = products.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortedProducts);
  readData(products);
}
