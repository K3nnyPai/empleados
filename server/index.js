const express = require('express')
const cors = require('cors')
const db = require('./db')
const app = express();

app.use(cors())
app.use(express.json())

// GET = Obtener
app.get('/empleados', (req, res) => {
    const sql = 'SELECT * FROM empleados';

    db.query(sql, (err, results) => {
        if (err){
            return res.status(500).json({error: "error al obtener los empleados..."});
        }

        return res.json(results);
    });
});

// POST = guardar
app.post('/empleados', (req, res) => {
    const { nombre, edad, pais, cargo, anios } = req.body;

    const sql = 'INSERT INTO empleados (nombre, edad, pais, cargo, anios) VALUES (?, ?, ?, ?, ?)';

    db.query(sql, (err, results) => {
        if (err){
            return res.status(500).json({error: "error al guardar los datos del empleado..."});
        }

        return res.json({
            message: 'empleado guardado correctamente',
            id: results.insertId,
            nombre,
            edad,
            pais,
            cargo,
            anios
        });
    });
});

// PUT - actualizar
app.put('/empleados/:id', (req, res) => {
    const { id } = req.params
    const { nombre, edad, pais, cargo, anios } = req.body;

    const sql = 'UPDATE empleados SET nombre= ?, edad= ?, pais= ?, cargo= ?, anios= ? WHERE id= ?';

    db.query(sql, [nombre, edad, pais, cargo, anios], (err) => {
        if (err){
            return res.status(500).json({error: "error al actualizar el empleado"});
        }

        return res.json({
            message: 'empleado actualizado correctamente',
            id: results.insertId,
            nombre,
            edad,
            pais,
            cargo,
            anios
        });
    });
});

// PUT - actualizar
app.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM empleados WHERE id = ?';

    db.query(sql, [id], (err) => {
        if (err){
            return res.status(500).json({error: "error al eliminar el empleado"});
        }

        return res.json({
            message: 'empleado aeliminado correctamente',
            id: results.insertId,
            nombre,
            edad,
            pais,
            cargo,
            anios
        });
    });
});

app.listen(3001, () => {
    console.log('servidor corriendo en el puerto 3001');
});
