const express = require('express');
const app = require('express')();
const path = require('path');
const logger = require('./middleware/logger');
const PORT = 5000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(logger);

app.listen(PORT)
app.use('/api/members', require('./routes/api/members'));

app.get('/hello', (req, res) => {
    var queryString = req.query;
    if (queryString.color == 'blue') {
        res.status(200).send({
            tshirt: 'blue',
            size: 'large'
        })
    }
    else {
        res.status(404).send({
            message: 'NO blue shirts'
        })
    }
})

app.post('/bye', async (req, res) => {
    var obj = req;
    res.status(200).send({
        message: "You ordered " + req.body.quantity + " shirts"
    })
})

app.post('/shirts/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({ message: "We need a logo" })
    }

    res.send({
        tshirt: `👕 with your ${logo}`
    })
})

