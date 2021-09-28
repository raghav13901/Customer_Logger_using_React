const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path');

require('dotenv').config();

const app = express();

//Server static assets if in production
if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')
    )
  );
}
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const uri = process.env.ATLAS_URI1;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MondoDB database connection established successfully!");
})

const exercisesRouter = require('./routes/exercises');

app.use('/exercises', exercisesRouter);

app.listen(port, () =>{
    console.log(`Server is running on port: ${port}`);
})