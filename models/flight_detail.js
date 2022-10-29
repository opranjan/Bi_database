const mongoose = require('mongoose');

// Schema for the DB 1 available flights
const schema = new mongoose.Schema({
    flightNo:{
        type: Number,
        required: true
    },
    trvl_btwn_cities:{
       type: String,
       required: true
    },
    flight_timing:{
       type: String,
       required: true
    },
    plane_category:{
      type: String,
      required: true
    }

});

const Flights = mongoose.model('flights', schema);

module.exports = Flights;