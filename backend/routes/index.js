const express = require("express");
const router = express.Router();

const authRoute = require("./auth");
const usersRoute = require("./users");
const productsRoute = require("./products");
const ordersRoute = require("./orders");
const notifRoute = require("./notifications");
const {connections} = notifRoute;

router.use("/api/v1/auth", authRoute);
router.use("/api/v1/users", usersRoute);
router.use("/api/v1/products", productsRoute);
router.use("/api/v1/orders", ordersRoute);
router.use("/api/v1/notifications", notifRoute.router)
router.post('/noti-queue', (req, res) => {
    const {gmid, event, data} = req.body;
    if (!gmid || !data) {
        console.log(`empty `, gmid, data);
        return res.status(422).json({error: 'empty', gmid, data});
    }
    else if (!connections.has(gmid)) {
        return res.status(404).json({error: 'no gmid', gmid});
    }
    else {
        connections.get(gmid).sse.send(data, event, undefined);
        console.log(`queued: `, gmid, data, event);
        return res.status(200).json({ error: null, gmid, data });
    }
});

module.exports = router;
