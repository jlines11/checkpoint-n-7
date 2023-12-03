// Array to store item information
let items = [
  { id: 1, name: "MASCARA", quantity: 1, price: 10, liked: false },
  { id: 2, name: "LIP&CHEEK TINT", quantity: 1, price: 15, liked: false },
  { id: 3, name: "FOUNDATION", quantity: 1, price: 20, liked: false },
  { id: 4, name: "EYEPADS", quantity: 1, price: 12, liked: false },
  { id: 5, name: "LIPGLOSS", quantity: 1, price: 18, liked: false },
  { id: 6, name: "MAGIC LIPSTICK", quantity: 1, price: 25, liked: false },
  { id: 7, name: "LIP OIL", quantity: 1, price: 30, liked: false },
];

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to dynamically created buttons in the cart container
  document
    .getElementById("cart-container")
    .addEventListener("click", function (event) {
      const target = event.target;
      // Check which button was clicked and perform corresponding action
      if (target.classList.contains("quantity-btn")) {
        const itemId = parseInt(target.parentNode.dataset.id);
        updateQuantity(itemId, target.textContent === "-" ? -1 : 1);
      } else if (target.classList.contains("delete-btn")) {
        const itemId = parseInt(target.parentNode.dataset.id);
        deleteItem(itemId);
      } else if (target.classList.contains("like-btn")) {
        const itemId = parseInt(target.parentNode.dataset.id);
        toggleLike(itemId);
      }
    });

  // Initial update of the cart
  updateCart();
});

// Function to update quantity of an item in the cart
function updateQuantity(itemId, change) {
  const item = items.find((i) => i.id === itemId);
  if (item) {
    item.quantity = Math.max(1, item.quantity + change);
    updateCart();
  }
}

// Function to delete an item from the cart
function deleteItem(itemId) {
  items = items.filter((i) => i.id !== itemId);
  updateCart();
}

// Function to toggle the "liked" status of an item in the cart
function toggleLike(itemId) {
  const item = items.find((i) => i.id === itemId);
  if (item) {
    item.liked = !item.liked;
    updateCart();
  }
}

// Function to update the cart display
function updateCart() {
  // Calculate the total price of all items in the cart
  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  // Update the total price in the HTML
  document.getElementById("total-price").innerText = total.toFixed(2);

  // Update the cart display in the HTML
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  items.forEach((item) => {
    // Create a new cart item element for each item in the array
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.dataset.id = item.id;
    // Set the inner HTML of the cart item element
    cartItem.innerHTML = `
              <img src="product${item.id}.jpg" alt="Product ${
      item.id
    }" class="product-image">
              <div class="item-details">
                  <span class="item-name">${item.name}</span>
                  <button class="quantity-btn" onclick="updateQuantity(${
                    item.id
                  }, -1)">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="quantity-btn" onclick="updateQuantity(${
                    item.id
                  }, 1)">+</button>
                  <button class="delete-btn" onclick="deleteItem(${
                    item.id
                  })">Delete</button>
                  <button class="like-btn ${
                    item.liked ? "liked" : ""
                  }" onclick="toggleLike(${item.id})">Like</button>
                  <span class="price">$${(item.quantity * item.price).toFixed(
                    2
                  )}</span>
              </div>
          `;
    // Append the cart item element to the cart container
    cartContainer.appendChild(cartItem);
  });
}
