const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://binudhaduk1234:1o5oXUFaXVPwMDzU@cluster0.i3cen.mongodb.net/Blog')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


