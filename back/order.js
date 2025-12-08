const express = require('express');
const pool = require('./db');
const router = express.Router();


router.post('/', async(req, res) => {
    console.log('주문 요청 받음:', req.body);
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const {
            userId,
            zipCode,
            address,
            detailAddress,
            deliveryName,
            recipient,
            phone,
            deliveryMessage,
            paymentMethod,
            items,
            totalAmount
        } = req.body;

        const orderResult = await connection.query(
            `INSERT INTO orders (
                id, 
                zipCode, 
                address, 
                detailAddress,
                deliveryName,
                recipient,
                phone,
                deliveryMessage,
                paymentMethod,
                totalAmount,
                orderDate
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
            [userId, zipCode, address, detailAddress, deliveryName, 
             recipient, phone, deliveryMessage, paymentMethod, totalAmount]
        );

        const orderId = Number(orderResult.insertId);
        console.log('주문 ID:', orderId);

        for (const item of items) {
            await connection.query(
                `INSERT INTO order_items (
                    order_Id,
                    pId, 
                    pName, 
                    pPrice, 
                    amount
                ) VALUES (?, ?, ?, ?, ?)`,
                [orderId, item.id, item.name, item.price, item.amount]
            );
        }

        for (const item of items) {
            await connection.query(
                `DELETE FROM cart WHERE id = ? AND pId = ?`,
                [userId, item.id]
            );
        }

        await connection.commit();
        res.status(200).json({ 
            success: true, 
            orderId: orderId,
            message: '주문이 완료되었습니다.' 
        });

    } catch(error) {
        await connection.rollback();
        console.error('주문 처리 에러:', error);
        res.status(500).json({
            error: '주문 처리 실패', 
            details: error.message
        });
    } finally {
        connection.release();
    }
});

module.exports = router;