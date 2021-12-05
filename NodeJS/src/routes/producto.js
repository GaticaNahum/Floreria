const express = require('express');
const router = express.Router();
const pool = require('../database.js');

// //GET ALL Products
router.get('/', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let listProducto = await pool.query('SELECT * FROM arreglo');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listProducto: listProducto
    });
});

router.get('/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { id } = req.params;
    let arreglo = await pool.query('Select * from arreglo where idArreglo = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha obtenido correctamente",
        arreglo: arreglo
    });
});


module.exports = router;