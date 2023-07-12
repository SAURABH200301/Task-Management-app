/* eslint-disable no-undef */
const connectToMongo = require('./db'); //This is how we connect mongo with db.js
const express = require('express'); //express connection
var cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();

connectToMongo();

const app = express() //created an object of express
const port = process.env.PORT || 80 //setup port num


app.use(cors())

//to use re.body in applied in auth.js
app.use(express.json());

const AuthPath = require('./routes/auth');
const TaskPath = require('./routes/task');
app.use('/api/auth', AuthPath); // app is object of express which is running apis, first parameter is url path and other is the path of that file
app.use('/api/task', TaskPath);

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})