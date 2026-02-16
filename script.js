// Simple JS page navigation
function navigateTo(page) {
  window.location.href = page;
}

// Opens Google Maps location
function openLocation() {
  window.open("https://www.google.com/maps/place/Candy+Land+Ltd./@-1.2813681,36.8232722,17z/data=!3m1!4b1!4m6!3m5!1s0x182f112a8e549f7f:0xcd6256c765705484!8m2!3d-1.2813735!4d36.8258471!16s%2Fg%2F11gkwkcclh?entry=ttu&g_ep=EgoyMDI1MTEwOS.4wIKXMDSoASAFQAw%3D%3D", "_blank");
}

// M-Pesa payment function
async function checkout(amount, itemName) {
  const phoneNumber = prompt(`Enter your M-Pesa phone number (254XXXXXXXXX) for ${itemName}:`);
  
  if (!phoneNumber) {
    return;
  }

  // Validate phone number
  if (!phoneNumber.startsWith('254') || phoneNumber.length !== 12) {
    alert('Please enter a valid Kenyan phone number starting with 254');
    return;
  }

  try {
    const response = await fetch('http://localhost:5500/pay', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        phone: phoneNumber, 
        amount: amount,
        item: itemName
      })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    alert(data.message || 'Payment initiated successfully! Check your phone for STK Push.');
    
  } catch (error) {
    console.error('Payment error:', error);
    alert('Failed to process payment. Please try again or contact support.');
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('Candylicious Shop loaded successfully!');
});