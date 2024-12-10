const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get ('/', (req, res) => {
    let queryText = `SELECT * FROM "todos"` 

    pool.query(queryText)
    .then(( results) => {
        //return rows as result:
        res.send (results.rows)
    })
    .catch( (error) => {
        console.log('There has been an error', error)
        res.sendStatus( 400 )
    })
})
// POST
router.post ('/', (req, res) => {
    let queryText = `INSERT INTO "todos" ( "text", "isComplete") VALUES ( $1, $2 );`; 
    let values = [ req.body.text, req.body.isComplete]
    pool.query(queryText, values)
    .then(( results) => {
        //return rows as result:
        res.send (results.rows)
    })
    .catch( (error) => {
        console.log('There has been an error', error)
        res.sendStatus( 400 )
    })
})
// PUT
router.put ('/', (req, res) => {
    let queryText = `UPDATE todos SET "isComplete"=$1 WHERE "id"=$2`; 
    let values = [ req.body.isComplete, req.body.id]
    pool.query(queryText, values)
    .then(( results) => {
        //return rows as result:
        res.send (results.rows)
    })
    .catch( (error) => {
        console.log('There has been an error', error)
        res.sendStatus( 400 )
    })
})
// DELETE
router.delete ('/', (req, res) => {
    let queryText = `DELETE FROM todos WHERE id=$1;` 
    let values = [ req.body.id];
    pool.query(queryText, values)
    .then(( results ) => {
        //return rows as result:
        res.sendStatus ( 200 )
    })
    .catch( (error) => {
        console.log('There has been an error', error)
        res.sendStatus( 400 )
    })
})

module.exports = router;
