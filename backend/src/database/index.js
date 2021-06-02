const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mytasks', {
  useNewUrlParser: true, useUnifiedTopology: true
});

module.exports = mongoose;