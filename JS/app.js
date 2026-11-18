// Activity 4, 5, 7 and 8: JavaScript Basics, Selectors, Live Interaction, Responsive Layout
// (guards like "if (x)" let this same file work on both index.html and booking.html)

// ---------- 1. TOAST ----------
var toastTimer;   // remembers the running timer so toasts don't hide each other early

function showToast(message) {
  var toast = document.getElementById("toast");
  if (!toast) { return; }

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
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}

// ---------- 3. HAMBURGER MENU (Activity 8) ----------
var hamburger = document.getElementById("hamburger");
var navMenu = document.getElementById("navMenu");

if (hamburger && navMenu) {
  // click the hamburger -> toggle the "open" class
  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("open");
  });

  // close the menu after a link is clicked
  var navLinks = navMenu.querySelectorAll("a");
  for (var n = 0; n < navLinks.length; n++) {
    navLinks[n].addEventListener("click", function () {
      navMenu.classList.remove("open");
    });
  }
}

// ---------- 4. FILTER MATCH CARDS BY TEAM (Activity 8) ----------
var teamSelect = document.getElementById("team");
var matchCards = document.querySelectorAll(".match-card");
var noMatch = document.getElementById("noMatch");

function filterMatches() {
  var team = teamSelect.value;
  var visible = 0;

  for (var i = 0; i < matchCards.length; i++) {
    var teams = matchCards[i].getAttribute("data-teams");   // e.g. "CSK MI"

    if (team === "All Teams" || teams.split(" ").indexOf(team) !== -1) {
      matchCards[i].style.display = "";
      visible++;
    } else {
      matchCards[i].style.display = "none";
    }
  }

  noMatch.style.display = (visible === 0) ? "block" : "none";
}

if (teamSelect) {
  teamSelect.addEventListener("change", filterMatches);
}

// ---------- 5. GRID / LIST VIEW TOGGLE (Activity 8) ----------
var matchGrid = document.getElementById("matchGrid");
var gridBtn = document.getElementById("gridBtn");
var listBtn = document.getElementById("listBtn");

if (matchGrid && gridBtn && listBtn) {
  gridBtn.addEventListener("click", function () {
    matchGrid.classList.remove("list-view");
    gridBtn.classList.add("active");
    listBtn.classList.remove("active");
  });

  listBtn.addEventListener("click", function () {
    matchGrid.classList.add("list-view");
    listBtn.classList.add("active");
    gridBtn.classList.remove("active");
  });
}

// ---------- 6. BOOKING FORM + LIVE SUMMARY (index.html only) ----------
var matchSelect = document.getElementById("match");
var standSelect = document.querySelector("#stand");
var ticketsInput = document.getElementById("tickets");
var bookingForm = document.getElementById("bookingForm");

var summaryCard = document.getElementById("summaryCard");
var summaryMatch = document.getElementById("summaryMatch");
var summaryStand = document.getElementById("summaryStand");
var summaryPrice = document.getElementById("summaryPrice");
var summaryQty = document.getElementById("summaryQty");
var summaryTotal = document.getElementById("summaryTotal");

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

function updateSummary(showMessage) {
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

  var price = getPrice(match, stand);
  var total = price * tickets;

  summaryMatch.textContent = match;
  summaryStand.textContent = stand;
  summaryPrice.textContent = formatRupees(price);
  summaryQty.textContent = tickets;
  summaryTotal.textContent = formatRupees(total);

  summaryCard.classList.add("updated");
  setTimeout(function () {
    summaryCard.classList.remove("updated");
  }, 400);

  if (showMessage) {
    showToast("Summary updated: " + tickets + " x " + stand + " | " + match + " | Total " + formatRupees(total));
  }
}

// only run the summary code on the page that has the summary card
if (summaryCard && bookingForm) {

  matchSelect.addEventListener("change", function () {
    updateSummary(true);
  });

  standSelect.addEventListener("change", function () {
    updateSummary(true);
  });

  ticketsInput.addEventListener("change", function () {
    updateSummary(true);
  });

  // Book buttons on the match cards
  var bookButtons = document.querySelectorAll(".book-btn");

  for (var b = 0; b < bookButtons.length; b++) {
    bookButtons[b].addEventListener("click", function (event) {
      event.preventDefault();

      matchSelect.value = this.getAttribute("data-match");
      updateSummary(false);

      scrollToBooking();
      showToast("Match selected! Please fill in the booking form.");
    });
  }

  // Confirm booking
  bookingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    updateSummary(false);
    showToast("Booking confirmed! Thank you.");
  });

  // show correct summary when page first loads
  updateSummary(false);
}