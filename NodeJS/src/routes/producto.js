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

router.post('/create', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { name, description, price, quantity, idCategoria } = req.body;

    const status = 1;

    const arreglo = {
        name,
        description,
        price,
        status,
        quantity,
        idCategoria
    };

    await pool.query('INSERT INTO arreglo set ?', [arreglo]);
    res.json({
        status: 200,
        message: "Se ha registrado correctamente",
        arreglo: arreglo
    });
});

router.post('/update/:id', async(req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { idArreglo } = req.params;
    const { name, description, price, quantity, idCategoria } = req.body;

    const arreglo = {
        name,
        description,
        price,
        quantity,
        idCategoria
    };

    await pool.query('UPDATE arreglo set ? where idArreglo = ?', [arreglo, idArreglo]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        arreglo: arreglo
    });
});


module.exports = router;