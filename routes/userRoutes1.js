const user = require("../models/user");
const express = require("express");
const router = express.Router();
const bycrypt = require("bycryptjs");
const jwt = require("jsonwebtoken");

const jwt = "secret_key";

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    const User = await user.findOne({ email });
    if( User ) {
        return res.status(400).json({ alert : "user already exists"});
    }

    const hash = await bycrypt.hash(password, 10);
    await user.create({ email, password: hash });
    return res.status(400).json({ alert : "user registered"});
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const User = await user.findOne({ email });
    if( !user ) {
        return res.status(400).json({ alert: "Invalid email"});
    }

    const isMatch = await bycrypt.compare( password, User,password );
    if ( !isMatch ) {
        return res.status(400).json({ alert: "Invalid email or password"});
    }

    res.json({ alert: "login successful"});
})

module.exports = router;