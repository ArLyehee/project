const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(express.json())
app.use(cors())

app.get('/order/:userId', async(req, res)=>{
    try{
        const {userId} = req.params;

        const rows = await pool.query(
            `SELECT pID as id, 
                pName as name, 
                pPrice as price,
                amount as amount 
                FROM cart WHERE id = ?`, [userId]);

        res.status(200).json(rows);
    }catch(error){
        res.status(500).json({error: '장바구니 조회 실패'});
    }
})


// app.listen(8080,()=>{
//     console.log("potato server")
// })

app.get('/', (req, res) => {
  res.send('order 서버 응답');
});

module.exports = app;