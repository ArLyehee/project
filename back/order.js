const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(express.json())
app.use(cors())




// app.listen(8080,()=>{
//     console.log("potato server")
// })

app.get('/', (req, res) => {
  res.send('order 서버 응답');
});

module.exports = app;