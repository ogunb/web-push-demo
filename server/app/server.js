const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const DataStore = require('nedb');
const dotenv = require('dotenv-flow');
const webpush = require('web-push');

dotenv.config();
const db = new DataStore();
const app = express();
const { PUBLIC_KEY, PRIVATE_KEY } = process.env;

webpush.setVapidDetails(
    'mailto:babacanogun@gmail.com',
    PUBLIC_KEY,
    PRIVATE_KEY,
);

app.use(bodyParser.json());
app.use(cors());
app.listen(3003, () => console.log('Example app listening on port 3003!'));

app.post('/save-subscription', (req, res) => {
    db.insert(req.body);
    res.send({});
});

app.post('/push', (req, res) => {
    const pushData = {
        title: 'Push Demo Title',
        body: 'Push Demo Body',
        icon: 'https://www.fillmurray.com/512/512'
    };

    db.find({}, (err, data) => {
        data.forEach(sub => {
            webpush.sendNotification(sub, JSON.stringify(pushData));
        });

        res.send({})
    });
});