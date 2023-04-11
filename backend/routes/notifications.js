const express = require("express");
const router = express.Router();

let gmidCounter = 1;
const SSE = require('express-sse');
const connections = new Map();

router.get("/", (req, res) => {
    let gmid = req.cookies?.gmid ?? req.query?.gmid;
    if (!gmid) {
        gmid =  gmidCounter.toString();
        gmidCounter++;
    }

    if (connections.has(gmid)) {
        connections.get(gmid).close();
    }

    const connection = { sse: new SSE(), close() { console.log(`closing connection for: `, gmid); res?.end(); connections.delete(gmid)}};
    connection.sse.init(req, res);
    req.on('close', () => connection.close());
    connections.set(gmid, connection);
    console.log(`session set: `, gmid);
    console.log(`${connections.size} registered connections`);
});

router.get('/queue', (req, res) => {
    const {gmid, event, data} = req.query;
    if (!gmid || !data) {
        return res.json({error: 'empty', gmid, data});
    }
    else if (!connections.has(gmid)) {
        return res.json({error: 'no gmid', gmid});
    }
    else {
        connections.get(gmid).sse.send(data, event, undefined);
        console.log(`queued: `, gmid, data, event);
        return res.json({ error: null, gmid, data });
    }
});

module.exports = {router, connections};
