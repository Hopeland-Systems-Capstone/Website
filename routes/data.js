const express = require("express");
const router = express.Router();

//This code is executed on the backend
router.post('/data', async (req, res) => {

    const { token, query } = req.body;

    console.log(`Requested ${query} using token ${token}`)

    //Gets the user's user_id given their token
    const user_id_response = await fetch(`http://localhost:3000/users/token/${token}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
    const user_id = await user_id_response.text();

    console.log(`Found user_id ${user_id}`)

    //Executes the GET query requested from the frontend
    const response = await fetch(`http://localhost:3000${query.replace(":user_id", user_id)}${query.includes("?") ? "&" : "?"}key=9178ea6e1bfb55f9a26edbb1f292e82d`);

    const jsonResponse = await response.json();

    console.log(`Response of ${jsonResponse}`)

    //Returns the response of the requested query
    res.status(200).json(jsonResponse);
});

router.post('/data/put', async (req, res) => {

    const { token, query } = req.body;

    console.log(`Requested ${query} using token ${token}`)

    //Gets the user's user_id given their token
    const user_id_response = await fetch(`http://localhost:3000/users/token/${token}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
    const user_id = await user_id_response.text();

    console.log(`Found user_id ${user_id}`)

    //Executes the PUT query requested from the frontend
    const response = await fetch(`http://localhost:3000${query.replace(":user_id", user_id)}${query.includes("?") ? "&" : "?"}key=9178ea6e1bfb55f9a26edbb1f292e82d`, { method: 'PUT' });

    const jsonResponse = await response.json();

    console.log(`Response of ${jsonResponse}`)

    //Returns the response of the requested query
    res.status(200).json(jsonResponse);
});

router.post('/data/post', async (req, res) => {

    const { token, query } = req.body;

    console.log(`Requested ${query} using token ${token}`)

    //Gets the user's user_id given their token
    const user_id_response = await fetch(`http://localhost:3000/users/token/${token}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
    const user_id = await user_id_response.text();

    console.log(`Found user_id ${user_id}`)

    //Executes the PUT query requested from the frontend
    const response = await fetch(`http://localhost:3000${query.replace(":user_id", user_id)}${query.includes("?") ? "&" : "?"}key=9178ea6e1bfb55f9a26edbb1f292e82d`, { method: 'POST' });

    const jsonResponse = await response.json();

    console.log(`Response of ${jsonResponse}`)

    //Returns the response of the requested query
    res.status(200).json(jsonResponse);
});

router.post('/data/delete', async (req, res) => {

    const { token, query } = req.body;

    console.log(`Requested ${query} using token ${token}`)

    //Gets the user's user_id given their token
    const user_id_response = await fetch(`http://localhost:3000/users/token/${token}?key=9178ea6e1bfb55f9a26edbb1f292e82d`);
    const user_id = await user_id_response.text();

    console.log(`Found user_id ${user_id}`)

    //Executes the PUT query requested from the frontend
    const response = await fetch(`http://localhost:3000${query.replace(":user_id", user_id)}${query.includes("?") ? "&" : "?"}key=9178ea6e1bfb55f9a26edbb1f292e82d`, { method: 'DELETE' });

    const jsonResponse = await response.json();

    console.log(`Response of ${jsonResponse}`)

    //Returns the response of the requested query
    res.status(200).json(jsonResponse);
});

module.exports = router;