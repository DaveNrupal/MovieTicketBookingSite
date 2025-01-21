function addToCart(itemId) {
    const flexItem = document.querySelectorAll('.flexItem')[itemId - 1];
    
    const quantityElement = flexItem.querySelector('p:last-of-type');
    
    let quantity = parseInt(quantityElement.textContent.replace('Quantity : ', ''));
    quantity += 1;
    
    quantityElement.textContent = `Quantity : ${quantity}`;
  }