const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('./routes'));




require('./config/connection')
.once('open', () => {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
})
