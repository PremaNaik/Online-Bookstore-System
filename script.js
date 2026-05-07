const books = [

  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
  },

  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 399,
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794"
  },

  {
    id: 3,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 299,
    img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
  },

  {
    id: 4,
    title: "Think Like a Monk",
    author: "Jay Shetty",
    price: 450,
    img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353"
  },

  {
    id: 5,
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 650,
    img: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d"
  }

];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const bookList = document.getElementById("bookList");
const search = document.getElementById("search");
const message = document.getElementById("message");

function displayBooks(data) {

  if (!bookList) return;

  bookList.innerHTML = "";

  if (data.length === 0) {

    message.innerText = "❌ Book Not Found";
    return;

  } else {

    message.innerText = "";

  }

  data.forEach(book => {

    bookList.innerHTML += `

      <div class="book">

        <img src="${book.img}">

        <h3>${book.title}</h3>

        <p class="author">by ${book.author}</p>

        <p class="price">₹${book.price}</p>

        <button onclick="addToCart(${book.id})">
          Add to Cart
        </button>

      </div>

    `;
  });

}

if (search) {

  search.addEventListener("keyup", () => {

    const value = search.value.toLowerCase();

    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(value)
    );

    displayBooks(filtered);

  });

}

function addToCart(id) {

  const book = books.find(item => item.id === id);

  cart.push(book);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert("✅ Book added to cart");

}

const cartItems = document.getElementById("cartItems");

if (cartItems) {

  displayCart();

}

function displayCart() {

  let total = 0;

  cartItems.innerHTML = "";

  cart.forEach((item, index) => {

    total += item.price;

    cartItems.innerHTML += `

      <div class="cart-item">

        <h3>${item.title}</h3>

        <p>${item.author}</p>

        <p>₹${item.price}</p>

        <button onclick="removeItem(${index})">
          Remove
        </button>

      </div>

    `;

  });

  document.getElementById("total").innerText =
    "Total Amount : ₹" + total;

}

function removeItem(index) {

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  displayCart();

}

function checkout() {

  if (cart.length === 0) {

    alert("⚠ Your cart is empty");
    return;

  }

  window.location.href = "checkout.html";

  localStorage.removeItem("cart");

}

displayBooks(books);