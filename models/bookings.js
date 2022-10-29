const mongoose = require('mongoose');

// schema for the flight booking DB 2
const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    contactNo:{
       type: Number,
    //    required: true
    },
    flightNo:{
        type: String,
        // required: true
    },
    trvl_btwn_cities:{
       type: String,
    //    required: true
    },
    flight_timing:{
       type: String,
    //    required: true
    },
    plane_category:{
      type: String,
    //   required: true
    }

});

const Bookings = new mongoose.model('Bookings', schema);

module.exports = Bookings;