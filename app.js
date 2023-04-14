const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 80;

const auth_api = require('./api/auth_api.js')

app.use(cookieParser());
app.use(bodyParser.json());
app.use(authMiddleware);
app.use(express.static('public', { index: 'index.html' }));

async function authMiddleware(req, res, next) {
    if (req.path.endsWith('.html')) {
        try {
            await auth_api.checkLoggedIn(req, res);
            next();
        } catch (err) {
            res.redirect(err.message);
        }
    } else {
        next();
    }
}

//Routes
app.use("/", require("./routes/auth.js"));
app.use("/", require("./routes/data.js"));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
