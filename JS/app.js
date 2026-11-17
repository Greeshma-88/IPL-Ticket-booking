// Activity 4 + Activity 7: JavaScript, Selectors and Live Interaction

// ---------- 1. TOAST ----------
var toastTimer;   // remembers the running timer so toasts don't hide each other early

function showToast(message) {
  var toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

// ---------- 2. SMOOTH SCROLL ----------
function scrollToBooking() {
  var bookingSection = document.getElementById("booking");
  bookingSection.scrollIntoView({ behavior: "smooth" });
}

// ---------- 3. SELECT THE FORM CONTROLS (DOM selectors) ----------
var matchSelect = document.getElementById("match");
var standSelect = document.querySelector("#stand");
var ticketsInput = document.getElementById("tickets");
var bookingForm = document.getElementById("bookingForm");

// ---------- 4. SELECT THE SUMMARY CARD ELEMENTS ----------
var summaryCard = document.getElementById("summaryCard");
var summaryMatch = document.getElementById("summaryMatch");
var summaryStand = document.getElementById("summaryStand");
var summaryPrice = document.getElementById("summaryPrice");
var summaryQty = document.getElementById("summaryQty");
var summaryTotal = document.getElementById("summaryTotal");

// ---------- 5. PRICE LIST ----------
var prices = {
  "CSK vs MI":  { General: 1500, Premium: 3500, VIP: 7500 },
  "RCB vs KKR": { General: 1800, Premium: 4000, VIP: 8000 },
  "SRH vs CSK": { General: 1200, Premium: 3000, VIP: 6500 },
  "MI vs RCB":  { General: 2000, Premium: 4500, VIP: 9000 }
};

function getPrice(match, stand) {
  return prices[match][stand];
}

// shows 1500 as ₹1,500
function formatRupees(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

// ---------- 6. READ CHOICES, CALCULATE, UPDATE SUMMARY ----------
function updateSummary(showMessage) {
  // read what the user selected
  var match = matchSelect.value;
  var stand = standSelect.value;
  var tickets = Number(ticketsInput.value);

  // keep quantity between 1 and 10
  if (!tickets || tickets < 1) {
    tickets = 1;
  }
  if (tickets > 10) {
    tickets = 10;
  }
  ticketsInput.value = tickets;

  // calculate
  var price = getPrice(match, stand);
  var total = price * tickets;

  // display in the Booking Summary Card
  summaryMatch.textContent = match;
  summaryStand.textContent = stand;
  summaryPrice.textContent = formatRupees(price);
  summaryQty.textContent = tickets;
  summaryTotal.textContent = formatRupees(total);

  // small highlight effect on the card
  summaryCard.classList.add("updated");
  setTimeout(function () {
    summaryCard.classList.remove("updated");
  }, 400);

  if (showMessage) {
    showToast("Summary updated: " + tickets + " x " + stand + " | " + match + " | Total " + formatRupees(total));
  }
}

// ---------- 7. CHANGE EVENT LISTENERS (live update, no reload) ----------
matchSelect.addEventListener("change", function () {
  updateSummary(true);
});

standSelect.addEventListener("change", function () {
  updateSummary(true);
});

ticketsInput.addEventListener("change", function () {
  updateSummary(true);
});

// ---------- 8. BOOK BUTTONS IN THE SCHEDULE TABLE ----------
var bookButtons = document.querySelectorAll(".book-btn");

for (var i = 0; i < bookButtons.length; i++) {
  bookButtons[i].addEventListener("click", function (event) {
    event.preventDefault();

    // preselect the match from the row that was clicked
    matchSelect.value = this.getAttribute("data-match");
    updateSummary(false);

    scrollToBooking();
    showToast("Match selected! Please fill in the booking form.");
  });
}

// ---------- 9. CONFIRM BOOKING (form submit) ----------
bookingForm.addEventListener("submit", function (event) {
  event.preventDefault();   // stop the page from reloading

  updateSummary(false);
  showToast("Booking confirmed! Thank you.");
});

// ---------- 10. SHOW CORRECT SUMMARY WHEN PAGE FIRST LOADS ----------
updateSummary(false);