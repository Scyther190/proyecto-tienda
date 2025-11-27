// routes/ventas.routes.js (versión final, limpia y sin errores)
const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.post('/', async (req, res) => {
    const { cliente_id, usuario_id, productos } = req.body;

    try {
        // 1. Crear venta
        const [ventaResult] = await db.query(
            'INSERT INTO ventas (cliente_id, usuario_id, total) VALUES (?, ?, 0)',
            [cliente_id, usuario_id]
        );
        const venta_id = ventaResult.insertId;
        let total = 0;

        // 2. Procesar cada producto
        for (const item of productos) {
            const [rows] = await db.query('SELECT precio, stock FROM producto WHERE id = ?', [item.producto_id]);
            if (rows.length === 0) return res.status(404).json({ error: `Producto ${item.producto_id} no encontrado` });
            if (rows[0].stock < item.cantidad) return res.status(400).json({ error: `Stock insuficiente para producto ${item.producto_id}` });

            const precio = rows[0].precio;
            const subtotal = precio * item.cantidad;
            total += subtotal;

            await db.query(
                'INSERT INTO detalle_ventas (venta_id, producto_id, cantidad, precio_unitario, subtotal) VALUES (?, ?, ?, ?, ?)',
                [venta_id, item.producto_id, item.cantidad, precio, subtotal]
            );

            // Restar stock
            await db.query('UPDATE producto SET stock = stock - ? WHERE id = ?', [item.cantidad, item.producto_id]);
        }

        // 3. Actualizar total
        await db.query('UPDATE ventas SET total = ? WHERE id = ?', [total, venta_id]);

        res.json({ mensaje: 'Venta creada con éxito', venta_id, total });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;