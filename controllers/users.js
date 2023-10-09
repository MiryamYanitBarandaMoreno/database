const { request, response } = require('express');
const conn = require('../db');

const listUsers = (req = request, res = response) => {
    try {
        conn.query('SELECT * FROM Users', (err, result) =>{
            if(err){
                throw err
            }
            res.json(result);
        });
    } catch (error) {
        res.status(500).json(error);
    }finally{
        conn.end();
    }
        /*conn.query('SELECT * FROM Users', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error querying the database' });
            return;
        }

        const users = results.map((row) => {
            return {
                id: row.id,
                username: row.username,
            };
        });

        res.json(users);
    });*/
}

module.exports = { listUsers };