let products = JSON.parse(localStorage.getItem("products"))
  ? JSON.parse(localStorage.getItem("products"))
  : [
      {
        title: "Mens Summer Sandels",
        category: "Sandels",
        price: 1200.00,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD5RMxtC3My3ZL6nuLwiXSjSpl2DWxxa-1DQ&usqp=CAU",
      },
      {
        title: "Ladies Summer Sandels",
        category: "Sandels",
        price: 1100.00,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlP9Td5TIDtcduF_cBcVbdXm-LbHBgBjgCbg&usqp=CAU",
      },
      {
        title: "Boys Summer Sandels",
        category: "Sandels",
        price: 850.00,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_9k7VT4OrEUlJuGFvR0TCa7KaF9KFwTK4FA&usqp=CAU",
    },
      {
        title: "Ladies Winter Boots",
        category: "Boots",
        price: 1600.00,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdq3_uLUw5DKQrVMNxdtJxo49-RLD7sqox8Q&usqp=CAU",
      },
      {
        title: "Mens Training Takkies",
        category: "Takkies",
        price: 1800.00,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlj5I-p49cfL_jCs4gtUgVpbIoHnQUjj66ng&usqp=CAU",
      },
      {
        title: "Boys Training Takkies",
        category: "Takkies",
        price: 1000.00,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD_pAUV3taV5Jq6gJDUtgw8MhSVG20vUT8HA&usqp=CAU",
      },
    ];
    let cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

// READ
function readProducts(products) {
  document.querySelector("#products").innerHTML = "";
  products.forEach((product, position) => {
    document.querySelector("#products").innerHTML += `
      <div class="card">
        <img src="${product.img}" class="card-img-top" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">R${product.price}</p>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editProduct${position}" >
            Edit
          </button>
          <button type="button" class="btn btn-danger" onclick="deleteProduct(${position})" >
            Delete
          </button>
          
          <button type="button" class="btn btn-warning" onclick="addToCart(${position})" >
          Add to Cart
        </button>
        

           
              <div
                class="modal fade"
                id="editProduct${position}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Edit ${product.title}
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for="editTitle${position}" class="form-label">Title</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editTitle${position}"
                          id="editTitle${position}"
                          value="${product.title}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editCategory${position}" class="form-label">Category</label>
                        <select
                          class="form-select"
                          name="editCategory${position}"
                          id="editCategory${position}"
                        >
                          <option value="Boots">Boots</option>
                          <option value="Sandels">Sandelss</option>
                          <option value="Takkies">Takkies</option>
                        </select>
                      </div>
                      <div class="mb-3">
                        <label for="editPrice${position}" class="form-label">Price</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editPrice${position}"
                          id="editPrice${position}"
                          value="${product.price}"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="editImg${position}" class="form-label">Image URL</label>
                        <input
                          class="form-control"
                          type="text"
                          name="editImg${position}"
                          id="editImg${position}"
                          value="${product.img}"
                        />
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        onclick="updateProduct(${position})"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    `;
  });
}

  readProducts(products);
 

  // CREATE
  function createProduct() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products.push({
      title,
      category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// UPDATE
function updateProduct(position) {
  let title = document.querySelector(`#editTitle${position}`).value;
  let category = document.querySelector(`#editCategory${position}`).value;
  let price = document.querySelector(`#editPrice${position}`).value;
  let img = document.querySelector(`#editImg${position}`).value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
    products[position] = {
      title,
      category,
      price,
      img,
    };
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}

// DELETE
function deleteProduct(position) {
  let confirmation = confirm(
    "Are you sure you want to delete the selected item?"
  );

  if (confirmation) {
    products.splice(position, 1);
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  }
}

//creating cart

function createProducts() {
  let title = document.querySelector("#addTitle").value;
  let category = document.querySelector("#addCategory").value;
  let price = document.querySelector("#addPrice").value;
  let img = document.querySelector("#addImg").value;

  try {
    if (!title || !price || !img) throw new Error("Please fill in all fields");
     products.push({
       title,
       category,
      price,
      img,
    });
    localStorage.setItem("products", JSON.stringify(products));
    readProducts(products);
  } catch (err) {
    alert(err);
  }
}
// add to cart
function addToCart(position) {
  let qty = document.querySelector(`#addToCart${position}`)
  let added = false;
  cart.forEach((product) => {
    if (product.title == products[position].title) {
      alert(
        `You have successfully added ${qty} ${products[position].title} to the cart.`
      );
      product.qty = parseInt(product.qty) + parseInt(qty);
      added = true;
    }
  });
  if (!added) {
    cart.push({ ...products[position]});
    alert(
      `You have successfully added ${qty} ${products[position]} to the cart.`
    );
  }

localStorage.setItem("cart", JSON.stringify(cart));
readCart(cart);
}


// sort by category
function sortCategory() {
  let category = document.querySelector("#sortCategory").value;

  if (category == "ALL") {
    return readProducts(products);
  }

  let foundProducts = products.filter((product) => {
    return product.category == category;
  });

  readProducts(foundProducts);
  console.log(foundProducts);
  }

// sort by name

function sortName() {
  let direction = document.querySelector("#sortName").value;

  let sortProducts = products.sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1
    }
    return 0;
  });
  if (direction == "descending") sortedProducts.reverse();
  console.log(sortProducts);
  readProducts(products);
}

// sort by price

function sortPrice() {
  let direction = document.querySelector("#sortPrice").value;

  let sortedProducts = products.sort((a, b) => a.price - b.price);

  console.log(sortedProducts);

  if (direction == "descending") sortedProducts.reverse();
  readProducts(sortedProducts);
}
