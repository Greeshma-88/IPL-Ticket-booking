// Activity 4: JavaScript Basics and User Interaction

// 1. Reusable toast function: call it with any message
function showToast(message) {
  var toast = document.getElementById("toast");

  toast.textContent = message;     // put the message inside the toast box
  toast.classList.add("show");     // make the box visible

  // after 3 seconds (3000 milliseconds), hide it again
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

// 2. Smooth scrolling to the booking form
function scrollToBooking() {
  var bookingSection = document.getElementById("booking");
  bookingSection.scrollIntoView({ behavior: "smooth" });
}

// 3. Event handling: when any Book button in the table is clicked
var bookButtons = document.getElementsByClassName("book-btn");

for (var i = 0; i < bookButtons.length; i++) {
  bookButtons[i].addEventListener("click", function (event) {
    event.preventDefault();   // stop the normal instant jump of the link
    scrollToBooking();
    showToast("Match selected! Please fill in the booking form.");
  });
}

// 4. Find the ticket price for a match and stand
function getPrice(match, stand) {
  var price = 0;

  if (match === "CSK vs MI") {
    if (stand === "General") {
      price = 1500;
    } else if (stand === "Premium") {
      price = 3500;
    } else {
      price = 7500;
    }
  } else if (match === "RCB vs KKR") {
    if (stand === "General") {
      price = 1800;
    } else if (stand === "Premium") {
      price = 4000;
    } else {
      price = 8000;
    }
  } else if (match === "SRH vs CSK") {
    if (stand === "General") {
      price = 1200;
    } else if (stand === "Premium") {
      price = 3000;
    } else {
      price = 6500;
    }
  } else {
    // MI vs RCB
    if (stand === "General") {
      price = 2000;
    } else if (stand === "Premium") {
      price = 4500;
    } else {
      price = 9000;
    }
  }

  return price;
}

// 5. When the form is submitted, update the Booking Summary
var bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the page from reloading

  // read the values the user selected
  var match = document.getElementById("match").value;
  var stand = document.getElementById("stand").value;
  var tickets = Number(document.getElementById("tickets").value);

  // calculate the price
  var price = getPrice(match, stand);
  var total = price * tickets;

  // write the values into the summary card
  document.getElementById("summaryMatch").textContent = match;
  document.getElementById("summaryStand").textContent = stand;
  document.getElementById("summaryPrice").textContent = "₹" + price;
  document.getElementById("summaryQty").textContent = tickets;
  document.getElementById("summaryTotal").textContent = "₹" + total;

  showToast("Booking confirmed! Thank you.");
});