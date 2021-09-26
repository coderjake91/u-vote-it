const { moduleExpression } = require('@babel/types');
const express = require('express');
const router = express.Router();
const db = require('../../db/connection');

//start 'parties' routes ====================================================================================================================

// select all parties
router.get('/parties', (req, res) => {
    const sql = `select * from parties`;
    
    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

//select a single party
router.get('/party/:id', (req, res) => {
    const sql = `select * from parties where id = ?`;
    const params = [req.params.id];

    db.query(sql, params, (err, row) => {
        if(err) {
            res.status(400).json({ error: err.message});
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

//delete a party
router.delete('/party/:id', (req, res) => {
    const sql = `delete from parties where id = ?`;
    const params = [req.params.id];
    
    db.query(sql, params, (err, result) => {
        if(err) {
            res.status(400).json({ error: err.message });
            return;
        } else if (!result.affectedRows) {
            res.json({
                message: 'Party not found'
            });
        } else {
            res.json({
                message: 'party deleted',
                changes: result.affectedRows,
                id: req.params.id
            });
        }
    });
});

module.exports = router;