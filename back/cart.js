const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(express.json())
app.use(cors())

app.get('/cart/:userId', async(req, res)=>{
    try{
        const {userId} = req.params;

        const rows = await pool.query(
            `SELECT pID as id, 
                pname as name, 
                pprice as price,
                amount as amount 
                FROM cart WHERE id = ?`, [userId]);

        res.status(200).json(rows);
    }catch(error){
        res.status(500).json({error: '장바구니 조회 실패'});
    }
})

app.delete('/cart/delete', async(req,res)=>{
    const pId = req.body.pId
    await pool.query('DELETE FROM cart WHERE pId =?',
        [pId]
    )
    res.send({"result":true})
})

app.listen(8080,()=>{
    console.log("potato sever")
})