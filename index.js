const express = require('express');
const path = require('path');

const app = express();
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 2337;
const etag = 'some-etag';
const links = [
    '<ref>; param1=value1',
    '<ref2>; param2=value2',
    '<ref3>; param1=value1'
];

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Expose-Headers', 'ETag,Link');
    next();
});

app.use('/', express.static('public'));

app.options('/test', (req, res) => {
    res.setHeader('Access-Control-Request-Method', 'HEAD');
    return res.status(200).send();
});

app.head('/test', (req, res) => {
    if(req.headers['if-match'] === etag) {
        return res.status(304).send();
    }

    res.setHeader('etag', etag);
    res.setHeader('link', links);
    return res.status(200).send();
});

app.listen(port, host, () => {
    console.info(`Started server at http://${host}:${port}`);
});
