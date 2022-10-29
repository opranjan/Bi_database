const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('Server is running'));
const Flights = require('./models/flight_detail.js');
const Bookings = require('./models/bookings.js')

// for connection to the database
const url = "mongodb://localhost:27017/bidatabase"
mongoose.connect(url, {
  UseNewUrlParser: true,
  useUnifiedTopology: true

}).then(() => console.log("connection succesfull")).catch((err) => console.log(`An error occured ${err}`));

// route for updating the details of the flight through post call
app.post('/flights', async (req, res) => {
  const { flightNo, trvl_btwn_cities, flight_timing, plane_category } = req.body;

  // to find whether the flight is already in the database
  const exist = await Flights.findOne({ flightNo: flightNo })
  try {
    if (exist) res.json({ error: 'Flight already exist' });
    else {
      const Flight = new Flights({ flightNo, trvl_btwn_cities, flight_timing, plane_category });
      await Flight.save();
      res.json({ message: "data added succesfully" })
    }
  }
  catch (err) {
    console.log(err);
  }
})

// route to gget all the flights in DB 1.
app.get('/bookFlights', async (req, res) => {
  const flightDetail = await Flights.find();
  try {
    res.send(JSON.stringify(flightDetail));
  }
  catch (err) {
    console.log('get request error', err);
  }
})


// for booking of the flight which will be stored in DB 2
app.post('/bookFlights', async (req, res) => {
  // to get the name and mobile no of the user from req.body ...... array destructure
  const { name, no, contactNo } = req.body;

  // to find whether whether the flight with same no. is already booked
  const exist = await Bookings.findOne({ contactNo: contactNo });

  // to get the details of the flihgt fro DB 1.
  const bookingFlight = await Flights.findOne({ flightNo: no });
  const { flightNo, trvl_btwn_cities, flight_timing, plane_category } = bookingFlight;
  console.log(bookingFlight)
  try {
    if (bookingFlight) {
      if (exist) res.json({ message: 'Your flight already booked' });
      else {
        const booked = new Bookings({ name, contactNo, flightNo, trvl_btwn_cities, flight_timing, plane_category });
        await booked.save();
        res.json({ message: `your flight from ${trvl_btwn_cities} is booked seccesfully` })
      }
    }
    else {
      res.json({ error: 'Flight does not exist' })
    }
  }
  catch (err) {
    console.log(err);
  }
})

app.listen(3000,()=>{
  console.log("on port 3000");
})