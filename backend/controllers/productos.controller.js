const db = require('../db/connection');

const obtenerTodos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM producto');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const obtenerPorId = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM producto WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crear = async (req, res) => {
    const { nombre, precio, stock } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO producto (nombre, precio, stock) VALUES (?, ?, ?)',
            [nombre, precio, stock]
        );
        res.status(201).json({ id: result.insertId, nombre, precio, stock });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizar = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE producto SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
            [nombre, precio, stock, id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminar = async (req, res) => {
    try {
        const [result] = await db.query('DELETE FROM producto WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    obtenerTodos,
    obtenerPorId,
    crear,
    actualizar,
    eliminar
};