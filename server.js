const express = require('express');
const mongoose = require('mongoose');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
// const appointmentRoutes = require('./routes/appointmentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');


// MongoDB connection
// mongoose.connect('mongodb://localhost:27017/hospitalDB', {
mongoose.connect(MONGOD_CONNECT_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Middleware
app.use(express.json());
app.use('/api', patientRoutes);
app.use('/api', doctorRoutes);
//app.use('/api', appointmentRoutes);
app.use('/', require('./routes/basicroutes'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
