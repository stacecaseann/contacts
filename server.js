const express = require('express');
const app = express();
const mongodb = require('./database/connect');
const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
    } else {
    app.listen(port, () => (console.log(`Database is listening on port: ${port}`)));
    }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});