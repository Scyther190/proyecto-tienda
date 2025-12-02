const db = require('../db/connection');

const obtenerTodos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crear = async (req, res) => {
    const { nombre, documento_identidad, direccion, telefono } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO clientes (nombre, documento_identidad, direccion, telefono) VALUES (?, ?, ?, ?)',
            [nombre, documento_identidad, direccion, telefono]
        );
        res.status(201).json({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { obtenerTodos, crear };