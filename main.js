const seatPrice = 550;
let selectedSeats = [];

// Function to handle seat click
function seatClickHandler(event) {
    const seat = event.target;
    const seatNumber = seat.textContent;
    
    if (!seat.classList.contains('booked')) {
        toggleSeatSelection(seat, seatNumber);
        updateTotalPrice();
        console.log('Selected seats:', selectedSeats);
    } else {
        alert(`Seat ${seatNumber} is already booked.`);
    }
}

// Function to toggle seat selection
function toggleSeatSelection(seat, seatNumber) {
    const bookList = document.getElementById('selected-seats');
    if (seat.classList.contains('active')) {
        seat.classList.remove('active');
        removeSeatFromSelection(seatNumber, bookList);
    } else {
        seat.classList.add('active');
        addSeatToSelection(seatNumber, bookList);
    }
}

// Function to add seat to selection
function addSeatToSelection(seatNumber, bookList) {
    selectedSeats.push(seatNumber);
    const seatInfoDiv = createSeatInfoDiv(seatNumber);
    bookList.appendChild(seatInfoDiv);
}

// Function to remove seat from selection
function removeSeatFromSelection(seatNumber, bookList) {
    selectedSeats = selectedSeats.filter(seat => seat !== seatNumber);
    const seatInfo = document.getElementById(`seat-info-${seatNumber}`);
    if (seatInfo) {
        bookList.removeChild(seatInfo);
    }
}

// Function to create seat info div
function createSeatInfoDiv(seatNumber) {
    const seatInfoDiv = document.createElement('div');
    seatInfoDiv.className = 'flex justify-between';
    seatInfoDiv.id = `seat-info-${seatNumber}`;
    seatInfoDiv.innerHTML = `
        <div class="text-lg font-normal">${seatNumber}</div>
        <div class="text-lg font-normal">Economic</div>
        <div class="text-lg font-normal seat-price">${seatPrice}</div>
    `;
    return seatInfoDiv;
}

// Function to update the total price
function updateTotalPrice() {
    const totalPriceElement = document.getElementById('total-price');
    const grandTotalElement = document.getElementById('grand-total');
    const totalPrice = selectedSeats.length * seatPrice;
    totalPriceElement.textContent = totalPrice;
    grandTotalElement.textContent = totalPrice;
}

// Function to apply coupon and update the grand total
function applyCoupon() {
    const couponCode = document.getElementById('coupon-code').value.trim();
    const totalPrice = parseInt(document.getElementById('total-price').textContent);
    const discount = getDiscount(couponCode, totalPrice);

    const grandTotal = totalPrice - discount;
    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}

// Function to get discount based on coupon code
function getDiscount(couponCode, totalPrice) {
    let discount = 0;
    if (couponCode === "NEW15") {
        discount = totalPrice * 0.15;
    } else if (couponCode === "Couple 20") {
        discount = totalPrice * 0.20;
    }
    return discount;
}

// Function to update the grand total without applying the coupon
function updateGrandTotal() {
    const totalPrice = parseInt(document.getElementById('total-price').textContent);
    document.getElementById('grand-total').textContent = totalPrice.toFixed(2);
}

// Function to open the success modal
function openModal() {
    document.getElementById('successModal').classList.remove('hidden');
}

// Function to close the success modal
function closeModal() {
    resetInputs();
    resetSelection();
    document.getElementById('successModal').classList.add('hidden');
}

// Function to reset input fields
function resetInputs() {
    document.querySelectorAll('input').forEach(field => field.value = '');
}

// Function to reset seat selection
function resetSelection() {
    document.getElementById('selected-seats').innerHTML = '';
    document.getElementById('total-price').textContent = '0';
    document.getElementById('grand-total').textContent = '0';
    document.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active');
        element.classList.add('booked');
    });
    selectedSeats = [];
}

// Attach event listeners to seats and buttons
function attachEventListeners() {
    document.querySelectorAll('.seat').forEach(seat => {
        seat.addEventListener('click', seatClickHandler);
    });
    document.getElementById('coupon-submit-button').addEventListener('click', applyCoupon);
    document.getElementById('bookingForm').addEventListener('submit', function(event) {
        event.preventDefault();
        validateBookingForm();
    });
}

// Function to validate booking form
function validateBookingForm() {
    const name = document.getElementById('passenger-name').value.trim();
    const phone = document.getElementById('passenger-phone').value.trim();
    const email = document.getElementById('passenger-email').value.trim();
    
    if (name === '' || phone === '') {
        alert('Please fill in all required fields.');
    } else {
        openModal();
    }
}

// Initialize event listeners on page load
document.addEventListener('DOMContentLoaded', attachEventListeners);
