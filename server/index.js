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
    const { nombre, edad, pais, cargo, anios, genero, celular, correo } = req.body;

    const sql = 'INSERT INTO empleados (nombre, edad, pais, cargo, anios, genero, celular, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [nombre, edad, pais, cargo, anios, genero, celular, correo], (err, results) => {
        if (err){
            return res.status(500).json({error: "error al guardar los datos del empleado...", details: err});
        }

        // devolver el registro insertado completo
        const selectSql = 'SELECT * FROM empleados WHERE id = ?';
        db.query(selectSql, [results.insertId], (err2, rows) => {
            if (err2) {
                return res.status(500).json({error: 'empleado guardado pero error al obtener el registro', details: err2});
            }
            return res.json(rows[0]);
        });
    });
});

// PUT - actualizar
app.put('/empleados/:id', (req, res) => {
    const { id } = req.params
    const { nombre, edad, pais, cargo, anios, genero, celular, correo } = req.body;

    const sql = 'UPDATE empleados SET nombre= ?, edad= ?, pais= ?, cargo= ?, anios= ?, genero= ?, celular= ?, correo= ? WHERE id= ?';
    db.query(sql, [nombre, edad, pais, cargo, anios, genero, celular, correo, id], (err, results) => {
        if (err){
            return res.status(500).json({error: "error al actualizar el empleado"});
        }

        // devolver el empleado actualizado
        const selectSql = 'SELECT * FROM empleados WHERE id = ?';
        db.query(selectSql, [id], (err2, rows) => {
            if (err2) return res.status(500).json({error: 'error al obtener empleado actualizado', details: err2});
            return res.json(rows[0]);
        });
    });
});

// PUT - actualizar
app.delete('/empleados/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM empleados WHERE id = ?';

    db.query(sql, [id], (err, results) => {
        if (err){
            return res.status(500).json({error: "error al eliminar el empleado"});
        }

        return res.json({
            message: 'empleado eliminado correctamente',
            id
        });
    });
});

app.listen(3001, () => {
    console.log('servidor corriendo en el puerto 3001');
});
