const validarCampos = (req, res, next) => {
    const { nombre, precio, stock } = req.body;
    
    if (!nombre || !precio || !stock) {
        return res.status(400).json({ 
            mensaje: 'Faltan campos obligatorios: nombre, precio, stock' 
        });
    }
    
    if (isNaN(precio) || isNaN(stock)) {
        return res.status(400).json({ 
            mensaje: 'Precio y stock deben ser números' 
        });
    }
    
    next();
};

module.exports = validarCampos;