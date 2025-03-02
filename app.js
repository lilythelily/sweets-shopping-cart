"use strict";
const addCartBtns = document.querySelectorAll(".btn");
const emptyCart = document.querySelector(".empty");
const addedCart = document.querySelector(".added-cart");
const qtySpan = addedCart.querySelector("#quantity");
const itemDescDiv = addedCart.querySelector(".item-desc");

function changeBtnState(event) {
  const clickedButton = event.target;
  const card = clickedButton.closest(".card");
  const img = card.querySelector(".photo");

  emptyCart.classList.add("hidden");
  addedCart.classList.remove("hidden");
  img.style.border = "2px solid hsla(14, 86%, 42%, .5)";

  if (card) {
    clickedButton.classList.add("hidden");

    const quantityControl = card.querySelector(".clicked");
    if (quantityControl) {
      quantityControl.classList.remove("hidden");
    }
  }
}

// Event: button state change

addCartBtns.forEach((button) => {
  button.addEventListener("click", changeBtnState);
});

// Event: cart update with initial click

let cartItems = [];

addCartBtns.forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    const itemName = card.querySelector(".product").textContent;
    const unitPrice = parseFloat(card.querySelector(".price").textContent);

    addedCart.querySelector(".item-desc").innerHTML += `
<div class="item-desc" data-name="${itemName}">
<p class="item-name">${itemName}</p>
<div class="price-remove">
<div class="item"><span class="qty">1x</span> @<span class="unit-price">${unitPrice.toFixed(
      2
    )}</span> <span class="sub-total">${unitPrice.toFixed(2)}</span></div>
<div class="remove-icon"></div></div></div>`;

    cartItems.push({
      name: itemName,
      unitPrice: unitPrice,
      quantity: 1,
    });

    const cartSum = cartItems.reduce((accumulator, item) => {
      return accumulator + item.unitPrice;
    }, 0);

    const cartQty = cartItems.reduce((accumulator, item) => {
      return accumulator + item.quantity;
    }, 0);

    addedCart.querySelector("h2").innerHTML = `
      <h2>Your Cart (<span id="quantity">${cartQty}</span>)</h2>`;

    addedCart.querySelector(
      ".total-price"
    ).innerHTML = `<div class="total-price">
    <p class="order-total">Order Total</p><p class="grand-total">${cartSum.toFixed(
      2
    )}</p></div>`;
  });
});

// increment and decrement

const qty = document.querySelectorAll(".clicked");

qty.forEach((control) => {
  const plus = control.querySelector(".cart-plus");
  const minus = control.querySelector(".cart-minus");
  const numberSpan = control.querySelector(".number");

  if (plus) {
    plus.addEventListener("click", () => {
      let currentQty = parseInt(numberSpan.textContent);
      numberSpan.textContent = currentQty + 1;

      const card = control.closest(".card");
      const itemName = card.querySelector(".product").textContent;

      const unitPrice = parseFloat(card.querySelector(".price").textContent);

      cartItems.push({
        name: itemName,
        unitPrice: unitPrice,
        quantity: 1,
      });

      const cartSum = cartItems.reduce((accumulator, item) => {
        return accumulator + item.unitPrice;
      }, 0);

      const cartQty = cartItems.reduce((accumulator, item) => {
        return accumulator + item.quantity;
      }, 0);

      addedCart.querySelector("h2").innerHTML = `
      <h2>Your Cart (<span id="quantity">${cartQty}</span>)</h2>`;

      addedCart.querySelector(
        ".total-price"
      ).innerHTML = `<div class="total-price">
    <p class="order-total">Order Total</p><p class="grand-total">${cartSum.toFixed(
      2
    )}</p></div>`;

      const itemDesc = itemDescDiv.querySelector(`[data-name="${itemName}"]`);
      if (itemDesc) {
        const qtyElement = itemDesc.querySelector(".qty");
        if (qtyElement) {
          qtyElement.textContent = `${currentQty + 1}x`;
        }
      }
    });
  }

  if (minus) {
    minus.addEventListener("click", () => {
      let currentQty = parseInt(numberSpan.textContent);
      if (currentQty > 1) {
        numberSpan.textContent = currentQty - 1;

        const card = control.closest(".card");
        const itemName = card.querySelector(".product").textContent;

        const unitPrice = parseFloat(card.querySelector(".price").textContent);

        cartItems.splice(0, 1);

        const cartSum = cartItems.reduce((accumulator, item) => {
          return accumulator + item.unitPrice;
        }, 0);

        const cartQty = cartItems.reduce((accumulator, item) => {
          return accumulator + item.quantity;
        }, 0);

        addedCart.querySelector("h2").innerHTML = `
      <h2>Your Cart (<span id="quantity">${cartQty}</span>)</h2>`;

        addedCart.querySelector(
          ".total-price"
        ).innerHTML = `<div class="total-price">
    <p class="order-total">Order Total</p><p class="grand-total">${cartSum.toFixed(
      2
    )}</p></div>`;

        const itemDesc = itemDescDiv.querySelector(`[data-name="${itemName}"]`);
        if (itemDesc) {
          const qtyElement = itemDesc.querySelector(".qty");
          if (qtyElement) {
            qtyElement.textContent = `${currentQty - 1}x`;
          }
        }
      }
    });
  }
});

// order confirmation popup

const confirmBtn = document.querySelector(".confirm");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");

confirmBtn.addEventListener("click", (e) => {
  popup.classList.toggle("hidden");
  overlay.classList.remove("hidden");
});

document.body.addEventListener("click", (e) => {
  if (!popup.classList.contains("hidden") && e.target != confirmBtn) {
    popup.classList.toggle("hidden");
    overlay.classList.add("hidden");
  }
});

//reset

const startNew = document.querySelector(".confirm-btn");
startNew.addEventListener("click", (e) => {
  location.reload();
});
