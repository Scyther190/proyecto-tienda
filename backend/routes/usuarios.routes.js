const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET todos los usuarios (solo datos básicos, sin password)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, nombre, email FROM usuarios');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST crear usuario
router.post('/', async (req, res) => {
    const { nombre, email, password } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
            [nombre, email, password]
        );
        res.status(201).json({ id: result.insertId, nombre, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;