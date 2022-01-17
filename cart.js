const cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];


  
  function readCart(cart) {
    document.querySelector("#cart").innerHTML = "";
     let total = cart
      .reduce((total, product) => {
        return total + product.price * product.qty;
    }, 0)
    .toFixed(2);

    cart.forEach((product, position) => {
      document.querySelector("#cart").innerHTML += `
      <div class="card mb-3 w-90 " >
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${product.img}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex flex-column container">
              <h5 class="card-title mb-3">${product.title}</h5>
              <div class="d-flex mb-3 justify-content-between">
                <p class="card-text">Individual price: </p>
                <span>R${product.price}<span>
              </div>
              <div class="d-flex mb-3 justify-content-between">
                <label class="form-label">Quantity:</label>
                <input type="number" min=1 id="remove${position}" value=${
      product.qty
    } onchange="updateCart(${position})" />
              </div>
              <div class="card-footer bg-white d-flex justify-content-between  p-0 pt-3">
                <p>Total Cost: </p>
                <span>R${(
                  parseFloat(product.price) * parseInt(product.qty)
                ).toFixed(2)}</span>
                <button class="btn btn-primary btn-lg" onclick="checkout()">
                  Checkout
                </button>
              </div>
            </div>  
          </div>
        </div>
      </div>`;
    });

    
}
console.log(cart)

readCart(cart);


// UPDATE
function updateCart(position) {
let qty = document.querySelector(`#remove${position}`).value;
cart[position] = { ...cart[position], qty };
localStorage.setItem("cart", JSON.stringify(cart));
readCart(cart);
}

// DELETE
function deleteFromCart(position) {
let confirmation = confirm(
"Are you sure you want to remove this product from the cart?"
);

if (confirmation) {
cart.splice(position, 1);
localStorage.setItem("cart", JSON.stringify(cart));
readCart(cart);  }
}



// CHECKOUT
function checkout() {
let total = cart
.reduce((total, product) => {
  return total + product.price * product.qty;
}, 0)
.toFixed(2);
try {
if (parseInt(total) == 0) throw new Error("Nothing in cart");
let confirmation = confirm(`Total payment needed: R${total}`);

if (confirmation) {
  cart.length = 0;
  localStorage.removeItem("cart");
  readCart(cart);    }
} catch (err) {
alert(err);
}
}
// delete
// function deleteCart(position) {
//   let confirmation = confirm(
//     "Are you sure you want to delete the selected product?"
//   );

//   if (confirmation) {
//     cart.splice(position, 1);
//     localStorage.setItem("cart", JSON.stringify(cart));
//     readCart(cart);
//   }
// }

// update

// function updateCart(position) {
//   let title = document.querySelector(`#editTitle${position}`).value;
//   let category = document.querySelector(`#editCategory${position}`).value;
//   let price = document.querySelector(`#editPrice${position}`).value;
//   let img = document.querySelector(`#editImg${position}`).value;

//   try {
//     if (!title || !price || !img) throw new Error("Please fill in all fields");
//     cart[position] = {
//       title,
//       category,
//       price,
//       img,
//     };

//     $(document).ready(function(){
//       $(".checkout").on("keyup", ".quantity", function(){
//         var price = +$(".price").data("price");
//         var quantity = +$(this).val();
//         $("#total").text("R" + price * quantity);
//       })
//     })

//     localStorage.setItem("cart", JSON.stringify(cart));
//     readCart(cart);
//   } catch (err) {
//     alert(err);
//   }
// }




