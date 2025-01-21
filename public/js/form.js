function formSubmit () {
    //Basic form validation incase server doesn't work
    let errors = [];

    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;
    let card = document.getElementById('card').value;
    let movie = document.getElementById('movie').value;
    let seat = document.getElementById('seat').value;
    seat = parseInt(seat);
    let errorDiv = document.getElementById('error');
    errorDiv.innerHTML = '';

    const emailRegex =/^[A-Za-z0-9]+\@[A-Za-z]+\.[A-za-z]+\.?[A-Za-z]{2,}?$/;
    if (!emailRegex.test(email)) {
        errors.push("Invalid email address.");
    }

    if(!movie) {
        errors.push('Please select any one movie!');
    }

    if(!seat || seat <= 0) {
        errors.push('Please select seat!');
    }

    var phoneRegex = /^\d{10}$/;

    if(!phoneRegex.test(number)) {
        errors.push('Please enter contact number in correct format 1231231234');
    }

    var cardReges = /^\d{4}-\d{4}-\d{4}-\d{4}$/;

    if(!cardReges.test(card)) {
        errors.push('Please enter Card Number in correct format 1234-1234-1234-1234');
    }

    if(errors && errors.length) {
        errors.forEach(error => { 
            errorDiv.innerHTML += error + '<br>'
        })
    } else {
        return true;
    }
    return false;
}