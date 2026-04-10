const express = require("express");
const {controllerCreate} = require("../controllers/webhook.controller");

const router = express.Router();

router.post("/msg-create", controllerCreate);

module.exports = {
    router,
}