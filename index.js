const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

var myApp = express();

myApp.use(express.urlencoded({extended:true}));

myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

//connect with mongoDB
mongoose.connect('mongodb://localhost:27017/Assignment4', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('MongoDB connection error:', error);
});

//define module for customer details
const Customers = mongoose.model('customer', {
    name: String,
    email: String,
    number: Number,
    card: Number,
    movie: String,
    seat: Number,
    totalCost: Number,
    serviceCharge: Number
});


//render form.ejs
myApp.get('/', function(req,res) {
    res.render('form', { errors: [], customer: {} });
});

myApp.post('/', async function(req,res) {
    let {name, email, number, card, movie, seat} = req.body;
    let errors = [];

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

    if(errors && errors.length > 0) {
        res.render('form',{ errors, customer: null })
    } else {
        let totalCost = seat * 20;
    let serviceCharge = Math.max(5, totalCost * 0.05);

    totalCost += serviceCharge;

    const last4CreditCard = card.slice(-4);
    const last4Phone = number.slice(-4);
    number = parseInt(last4Phone);
    card = parseInt(last4CreditCard);
    seat = parseInt(seat);

    const customer = new Customers({name, email, number, card, movie, seat, totalCost, serviceCharge });

        try {
            await customer.save();
            res.render('form',{ errors: [], customer})
        } catch (error) {
            res.render('form',{ errors: error, customer: null})
        }
    }
})

myApp.listen(8000);
